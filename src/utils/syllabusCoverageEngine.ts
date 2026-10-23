import { Question, ExamType } from '../types/quiz';
import { OFFICIAL_SYLLABUS_DATABASE } from '../data/syllabusDatabase';
import { ExamCoverageAuditReport, SyllabusCoverageItem } from '../types/syllabus';
import { detectDuplicates } from './duplicateDetector';

export interface PreFlightCheckResult {
  canStart: boolean;
  totalRequired: number;
  totalAvailable: number;
  unrepresentedSections: string[];
  missingUnits: string[];
  duplicateDetected: boolean;
  duplicateCount: number;
  invalidQuestionsCount: number;
  blueprintValid: boolean;
  errorMessage?: string;
  auditReport: ExamCoverageAuditReport;
}

export function generateSyllabusCoverageAudit(
  examType: ExamType,
  questions: Question[]
): ExamCoverageAuditReport {
  const normalizedExam: 'upsc-principal' | 'up-aided-principal' =
    examType === 'upsc-principal' ? 'upsc-principal' : 'up-aided-principal';

  const syllabus = OFFICIAL_SYLLABUS_DATABASE[normalizedExam];

  const examQuestions = questions.filter(q => {
    if (normalizedExam === 'up-aided-principal') {
      return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
    }
    return q.examType === normalizedExam;
  });

  const unitBreakdown: SyllabusCoverageItem[] = [];
  const uncoveredAreas: string[] = [];

  syllabus.sections.forEach(section => {
    section.units.forEach(unit => {
      // Find all questions mapped to this unit or matching by topic/unitId
      const unitQs = examQuestions.filter(q => {
        if (q.unitId && q.unitId === unit.id) return true;
        if (q.topic && q.topic.toLowerCase().includes(unit.nameEn.toLowerCase())) return true;
        return false;
      });

      const qIds = unitQs.map(q => q.id);
      const coveredSubtopics = new Set<string>();

      unit.subtopics.forEach(sub => {
        const hasSub = unitQs.some(q =>
          (q.subtopic && q.subtopic.toLowerCase() === sub.nameEn.toLowerCase()) ||
          q.tags.some(t => sub.nameEn.toLowerCase().includes(t.toLowerCase())) ||
          (q.questionTextEn && q.questionTextEn.toLowerCase().includes(sub.nameEn.toLowerCase().slice(0, 10)))
        );
        if (hasSub) {
          coveredSubtopics.add(sub.id);
        }
      });

      const status: 'Complete' | 'Partial' | 'Missing' =
        unitQs.length >= unit.expectedQuestionCount
          ? 'Complete'
          : unitQs.length > 0
          ? 'Partial'
          : 'Missing';

      if (status !== 'Complete') {
        uncoveredAreas.push(`${unit.nameEn} (${unitQs.length}/${unit.expectedQuestionCount} questions available)`);
      }

      unitBreakdown.push({
        examinationId: normalizedExam,
        sectionId: section.id,
        unitId: unit.id,
        unitNameEn: unit.nameEn,
        unitNameHi: unit.nameHi,
        expectedQuestions: unit.expectedQuestionCount,
        availableQuestions: unitQs.length,
        generatedQuestionIds: qIds,
        subtopicsCovered: Array.from(coveredSubtopics),
        totalSubtopics: unit.subtopics.length,
        coverageStatus: status,
        validationStatus: 'Verified'
      });
    });
  });

  const sectionBreakdown = syllabus.sections.map(section => {
    const secQs = examQuestions.filter(q => {
      if (q.sectionId && q.sectionId === section.id) return true;
      // If unit belongs to section
      const unitIds = section.units.map(u => u.id);
      if (q.unitId && unitIds.includes(q.unitId)) return true;
      return false;
    });

    return {
      sectionId: section.id,
      sectionTitle: section.titleEn,
      required: section.prescribedQuestionCount,
      available: secQs.length,
      isPrescribed: syllabus.hasOfficialSectionWiseCount
    };
  });

  // Duplicate checks
  const dupResult = detectDuplicates(examQuestions);

  const isFullyCovered =
    examQuestions.length >= syllabus.totalPrescribedQuestions &&
    uncoveredAreas.length === 0;

  return {
    examinationId: normalizedExam,
    examTitle: syllabus.officialTitleEn,
    totalRequired: syllabus.totalPrescribedQuestions,
    totalAvailable: examQuestions.length,
    isFullyCovered,
    sectionBreakdown,
    unitBreakdown,
    uncoveredAreas,
    duplicateCount: dupResult.matches.length,
    markingScheme: {
      marksPerQuestion: syllabus.marksPerQuestion,
      negativeDeduction: Number((syllabus.marksPerQuestion * syllabus.negativeMarkingFraction).toFixed(3)),
      maximumMarks: syllabus.maximumMarks,
      description: `+${syllabus.marksPerQuestion} per correct, -${(syllabus.marksPerQuestion * syllabus.negativeMarkingFraction).toFixed(3)} per incorrect (1/3 deduction), 0 for unattempted.`
    }
  };
}

export function performPreFlightValidation(
  examType: ExamType,
  questions: Question[],
  requestedCount: number = 120
): PreFlightCheckResult {
  const auditReport = generateSyllabusCoverageAudit(examType, questions);

  const unrepresentedSections: string[] = [];
  auditReport.sectionBreakdown.forEach(sec => {
    if (sec.available === 0) {
      unrepresentedSections.push(sec.sectionTitle);
    }
  });

  const missingUnits: string[] = [];
  auditReport.unitBreakdown.forEach(u => {
    if (u.availableQuestions === 0) {
      missingUnits.push(u.unitNameEn);
    }
  });

  const examQuestions = questions.filter(q => {
    if (examType === 'up-aided-principal' || examType === 'uppcs-principal') {
      return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
    }
    return q.examType === examType;
  });

  // Verify answer keys and options validity
  let invalidQuestionsCount = 0;
  examQuestions.forEach(q => {
    if (
      !q.optionsEn ||
      q.optionsEn.length !== 4 ||
      !q.optionsHi ||
      q.optionsHi.length !== 4 ||
      typeof q.correctOptionIndex !== 'number' ||
      q.correctOptionIndex < 0 ||
      q.correctOptionIndex > 3
    ) {
      invalidQuestionsCount++;
    }
  });

  const canStart =
    auditReport.totalAvailable >= requestedCount &&
    unrepresentedSections.length === 0 &&
    invalidQuestionsCount === 0;

  let errorMessage: string | undefined;
  if (!canStart) {
    if (auditReport.totalAvailable < requestedCount) {
      errorMessage = `Insufficient bank size: ${auditReport.totalAvailable} / ${requestedCount} questions available. Expand the question bank before starting a full-length mock test.`;
    } else if (unrepresentedSections.length > 0) {
      errorMessage = `Unrepresented syllabus sections detected: ${unrepresentedSections.join(', ')}.`;
    } else if (invalidQuestionsCount > 0) {
      errorMessage = `${invalidQuestionsCount} questions have invalid options or answer keys.`;
    }
  }

  return {
    canStart,
    totalRequired: requestedCount,
    totalAvailable: auditReport.totalAvailable,
    unrepresentedSections,
    missingUnits,
    duplicateDetected: auditReport.duplicateCount > 0,
    duplicateCount: auditReport.duplicateCount,
    invalidQuestionsCount,
    blueprintValid: unrepresentedSections.length === 0 && invalidQuestionsCount === 0,
    errorMessage,
    auditReport
  };
}
