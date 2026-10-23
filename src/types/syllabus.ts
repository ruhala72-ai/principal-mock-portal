import { ExamType } from './quiz';

export interface SyllabusSubtopic {
  id: string;
  nameEn: string;
  nameHi: string;
  officialRef?: string;
  allocatedQuestions?: number;
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  nameEn: string;
  nameHi: string;
  descriptionEn?: string;
  descriptionHi?: string;
  officialRef: string;
  subtopics: SyllabusSubtopic[];
  expectedQuestionCount: number;
}

export interface SyllabusSection {
  id: string;
  sectionNumber: string; // 'I', 'II', 'III'
  titleEn: string;
  titleHi: string;
  prescribedQuestionCount: number; // 30, 30, 60 for UP
  units: SyllabusUnit[];
}

export interface ExamSyllabusDatabase {
  examinationId: ExamType;
  officialTitleEn: string;
  officialTitleHi: string;
  recruitingAuthority: string;
  officialNotificationRef: string;
  totalPrescribedQuestions: number;
  durationMinutes: number;
  maximumMarks: number;
  marksPerQuestion: number;
  negativeMarkingFraction: number; // 1/3 = 0.3333333333333333
  hasOfficialSectionWiseCount: boolean;
  sections: SyllabusSection[];
}

export interface QuestionSyllabusMapping {
  examinationId: ExamType;
  sectionId: string;
  unitId: string;
  topic: string;
  subtopic: string;
  officialReference: string;
}

export interface SyllabusCoverageItem {
  examinationId: ExamType;
  sectionId: string;
  unitId: string;
  unitNameEn: string;
  unitNameHi: string;
  expectedQuestions: number;
  availableQuestions: number;
  generatedQuestionIds: string[];
  subtopicsCovered: string[];
  totalSubtopics: number;
  coverageStatus: 'Complete' | 'Partial' | 'Missing';
  validationStatus: 'Verified' | 'Pending';
}

export interface ExamCoverageAuditReport {
  examinationId: ExamType;
  examTitle: string;
  totalRequired: number;
  totalAvailable: number;
  isFullyCovered: boolean;
  sectionBreakdown: {
    sectionId: string;
    sectionTitle: string;
    required: number;
    available: number;
    isPrescribed: boolean;
  }[];
  unitBreakdown: SyllabusCoverageItem[];
  uncoveredAreas: string[];
  duplicateCount: number;
  markingScheme: {
    marksPerQuestion: number;
    negativeDeduction: number;
    maximumMarks: number;
    description: string;
  };
}
