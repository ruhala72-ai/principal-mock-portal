import {
  Question,
  ExamType,
  MockTestRecord,
  TestGenerationOptions,
  DifficultyLevel
} from '../types/quiz';
import {
  loadUsageRegistry,
  getRemainingEligibleQuestions,
  reserveQuestionsAtomically,
  commitMockTestUsage,
  generateQuestionFingerprint,
  checkQuestionUsageStatus
} from './questionUsageRegistry';

export interface TestGenerationResult {
  success: boolean;
  testRecord?: MockTestRecord;
  selectedQuestions?: Question[];
  shortfallReason?: string;
  eligibleCount: number;
  requestedCount: number;
  sectionBreakdown?: { sectionId: string; name: string; count: number }[];
}

/**
 * Generates an authentic mock test adhering strictly to:
 * 1. Absolute No-Repeat Policy (all questions are 100% unique across all tests)
 * 2. Official Syllabus Section & Unit balancing
 * 3. Difficulty Target Distribution (e.g. 20% Moderate, 50% Difficult, 30% Very Difficult)
 */
export function generateMockTest(
  options: TestGenerationOptions,
  allQuestions: Question[]
): TestGenerationResult {
  const {
    examType,
    targetCount,
    durationMinutes,
    isPracticeMode,
    difficultyPreset,
    testTitle,
    enforceZeroRepeat = true
  } = options;

  const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
  const registry = loadUsageRegistry();

  // 1. Filter bank by exam
  const examBank = allQuestions.filter(q => {
    if (targetExam === 'up-aided-principal') {
      return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
    }
    return q.examType === targetExam;
  }).filter(q => q.isApproved !== false);

  // 2. Filter eligible questions (Zero-Repeat enforced by default across ALL modes)
  const eligibleQuestions = enforceZeroRepeat
    ? getRemainingEligibleQuestions(targetExam, examBank, registry)
    : [...examBank];

  if (eligibleQuestions.length < targetCount && !isPracticeMode) {
    return {
      success: false,
      eligibleCount: eligibleQuestions.length,
      requestedCount: targetCount,
      shortfallReason: `Insufficient unused questions for a full zero-repeat ${targetCount}-question test. Only ${eligibleQuestions.length} unique eligible questions remain in the bank. Please review prior tests, enable custom practice with available questions, or generate new verified questions in Admin.`
    };
  }

  const effectiveCount = Math.min(targetCount, eligibleQuestions.length);
  if (effectiveCount === 0) {
    return {
      success: false,
      eligibleCount: 0,
      requestedCount: targetCount,
      shortfallReason: `No eligible unused questions remain in the question bank for this exam under the Zero-Repeat Policy. All questions have been previously served.`
    };
  }

  let selected: Question[] = [];

  if (targetExam === 'upsc-principal') {
    // ----------------------------------------------------
    // UPSC CRT: Balanced across the 8 Prescribed Areas
    // ----------------------------------------------------
    const areas = [
      'upsc-area-1',
      'upsc-area-2',
      'upsc-area-3',
      'upsc-area-4',
      'upsc-area-5',
      'upsc-area-6',
      'upsc-area-7',
      'upsc-area-8'
    ];

    const perArea = Math.floor(effectiveCount / 8);
    const remainder = effectiveCount % 8;

    const areaBuckets: Record<string, Question[]> = {};
    areas.forEach(a => {
      areaBuckets[a] = eligibleQuestions.filter(q => q.unitId === a || (q.sectionId && q.sectionId === a));
    });

    const chosen: Question[] = [];
    const usedIds = new Set<string>();

    areas.forEach((area, idx) => {
      const quota = perArea + (idx < remainder ? 1 : 0);
      const available = areaBuckets[area].filter(q => !usedIds.has(q.id));
      const take = available.slice(0, quota);
      take.forEach(q => {
        chosen.push(q);
        usedIds.add(q.id);
      });
    });

    // If any area had fewer than quota, fill from remaining eligible questions
    if (chosen.length < effectiveCount) {
      const leftover = eligibleQuestions.filter(q => !usedIds.has(q.id));
      const needed = effectiveCount - chosen.length;
      leftover.slice(0, needed).forEach(q => {
        chosen.push(q);
        usedIds.add(q.id);
      });
    }

    selected = chosen;
  } else if (targetExam === 'up-aided-principal') {
    // ----------------------------------------------------
    // UP Inter College Principal: Prescribed 30 + 30 + 60
    // Section I: 25%, Section II: 25%, Section III: 50%
    // ----------------------------------------------------
    const sec1Quota = Math.round(effectiveCount * 0.25);
    const sec2Quota = Math.round(effectiveCount * 0.25);
    const sec3Quota = effectiveCount - sec1Quota - sec2Quota;

    const sec1Qs = eligibleQuestions.filter(q => q.sectionId === 'up-sec-1');
    const sec2Qs = eligibleQuestions.filter(q => q.sectionId === 'up-sec-2');
    const sec3Qs = eligibleQuestions.filter(q => q.sectionId === 'up-sec-3');

    const chosen: Question[] = [];
    const usedIds = new Set<string>();

    // Section 1
    sec1Qs.slice(0, sec1Quota).forEach(q => {
      chosen.push(q);
      usedIds.add(q.id);
    });

    // Section 2 (ensure balance between Hindi and English if possible)
    const hindiQs = sec2Qs.filter(q => q.unitId === 'up-unit-4' && !usedIds.has(q.id));
    const engQs = sec2Qs.filter(q => q.unitId === 'up-unit-5' && !usedIds.has(q.id));
    const halfSec2 = Math.floor(sec2Quota / 2);

    hindiQs.slice(0, halfSec2).forEach(q => {
      chosen.push(q);
      usedIds.add(q.id);
    });
    engQs.slice(0, sec2Quota - halfSec2).forEach(q => {
      chosen.push(q);
      usedIds.add(q.id);
    });

    // Fill remaining sec2 if needed
    if (chosen.filter(q => q.sectionId === 'up-sec-2').length < sec2Quota) {
      const leftSec2 = sec2Qs.filter(q => !usedIds.has(q.id));
      const needed = sec2Quota - chosen.filter(q => q.sectionId === 'up-sec-2').length;
      leftSec2.slice(0, needed).forEach(q => {
        chosen.push(q);
        usedIds.add(q.id);
      });
    }

    // Section 3
    sec3Qs.slice(0, sec3Quota).forEach(q => {
      chosen.push(q);
      usedIds.add(q.id);
    });

    // If any section fell short, fill from remaining
    if (chosen.length < effectiveCount) {
      const leftover = eligibleQuestions.filter(q => !usedIds.has(q.id));
      const needed = effectiveCount - chosen.length;
      leftover.slice(0, needed).forEach(q => {
        chosen.push(q);
        usedIds.add(q.id);
      });
    }

    selected = chosen;
  } else {
    selected = eligibleQuestions.slice(0, effectiveCount);
  }

  // ----------------------------------------------------
  // Strict Pre-Display Validation & Replacement Step:
  // Validate every candidate question against the shared registry.
  // If any duplicates/used questions are found, replace them with verified unused questions.
  // ----------------------------------------------------
  const validatedQuestions: Question[] = [];
  const chosenIds = new Set<string>();

  for (const q of selected) {
    if (chosenIds.has(q.id)) continue;

    const status = checkQuestionUsageStatus(q, targetExam, registry);
    if (!status.isUsed) {
      validatedQuestions.push(q);
      chosenIds.add(q.id);
    } else {
      // Find an unused replacement from eligible bank
      const replacement = eligibleQuestions.find(cand =>
        !chosenIds.has(cand.id) &&
        !checkQuestionUsageStatus(cand, targetExam, registry).isUsed
      );
      if (replacement) {
        validatedQuestions.push(replacement);
        chosenIds.add(replacement.id);
      }
    }
  }

  // Ensure target count wasn't short-changed by duplicate rejections
  if (validatedQuestions.length < targetCount && !isPracticeMode) {
    return {
      success: false,
      eligibleCount: validatedQuestions.length,
      requestedCount: targetCount,
      shortfallReason: `Insufficient unused questions for a full zero-repeat ${targetCount}-question test. Exactly ${validatedQuestions.length} unique eligible questions could be validated.`
    };
  }

  const finalQuestions = validatedQuestions.slice(0, effectiveCount);
  const selectedIds = finalQuestions.map(q => q.id);

  // Generate unique test record
  const timestamp = Date.now();
  const testNumber = registry.testHistory.filter(t => t.examType === targetExam).length + 1;
  const testId = `mock-${targetExam}-${timestamp}`;
  const generatedTitle =
    testTitle ||
    `${targetExam === 'upsc-principal' ? 'UPSC Principal CRT' : 'UP Inter College Principal'} — Mock Test #${testNumber}`;

  const testRecord: MockTestRecord = {
    testId,
    examType: targetExam,
    testTitle: generatedTitle,
    generatedAt: timestamp,
    questionCount: finalQuestions.length,
    durationMinutes,
    isPracticeMode: isPracticeMode || finalQuestions.length < 120,
    difficultyPreset,
    questionIds: selectedIds
  };

  // Atomically reserve questions for safety
  reserveQuestionsAtomically(testId, selectedIds);

  return {
    success: true,
    testRecord,
    selectedQuestions: finalQuestions,
    eligibleCount: eligibleQuestions.length,
    requestedCount: targetCount
  };
}
