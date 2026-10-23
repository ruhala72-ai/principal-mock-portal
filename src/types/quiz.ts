export type ExamType = 
  | 'upsc-principal' 
  | 'up-aided-principal' 
  | 'up-technical-principal' 
  | 'uppcs-principal'; // Backward-compatible alias for up-aided-principal

export type LanguageMode = 'en' | 'hi' | 'both';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type QuestionState = 
  | 'not_visited'
  | 'not_answered'
  | 'answered'
  | 'marked_for_review'
  | 'answered_and_marked';

export type VerificationStatus = 'Verified' | 'Pending official verification';

export interface OfficialSyllabusDoc {
  recruitingAuthority: string;
  exactPostName: string;
  advertisementNumber: string;
  advertisementDate: string;
  officialSourceUrl: string;
  verificationStatus: VerificationStatus;
  lastCheckedDate: string;
  officialPdfName?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  notes?: string;
}

export interface TopicConfig {
  id: string;
  nameEn: string;
  nameHi: string;
  weightagePractice?: number; // Practice distribution percentage (e.g. 20)
  isVerified: boolean;
}

export type SourcePriorityTier = 1 | 2 | 3 | 4 | 5;

export interface SourceVerificationInfo {
  priorityTier: SourcePriorityTier; // 1: Gazette/Act/UPSC/UP Commission, 2: Rules/Manuals, 3: Official Portals, 4: Standard Reputable Texts, 5: Other
  sourceName: string;
  sourceUrl?: string;
  citation: string;
  verificationStatus: 'Verified' | 'Pending Verification' | 'Requires Review';
  verifiedDate?: string;
  verifiedBy?: string;
  factualNotes?: string;
}

export interface Question {
  id: string;
  examType: ExamType;
  sectionId?: string; // 'sec-1', 'sec-2', 'sec-3'
  unitId?: string; // 'unit-1' ... 'unit-12' or 'upsc-area-1' ... 'upsc-area-8'
  topic: string;
  topicHi?: string;
  subtopic?: string;
  officialReference?: string;
  sourceInfo?: SourceVerificationInfo;
  conceptId?: string; // Unique learning concept/rule anchor (e.g. 'UP-1921-SEC-16G-DISMISSAL')
  learningObjective?: string; // Concise test intent
  statuteOrScheme?: string; // Applicable law, rule, or government scheme
  effectiveRuleDate?: string; // Amendment/effective date
  fingerprint?: string; // Normalized text fingerprint for instant duplicate identification
  questionTextEn: string;
  questionTextHi: string;
  optionsEn: [string, string, string, string];
  optionsHi: [string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanationEn: string;
  explanationHi: string;
  difficulty: DifficultyLevel;
  tags: string[];
  isPracticeQuestion: boolean; // Explicitly marked as practice
  isApproved?: boolean;
  createdAt?: string;
  usageCount?: number;
  lastUsedAt?: number;
}

export interface ExamConfig {
  examType: ExamType;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  durationMinutes: number;
  totalMarksPerQuestion: number; // 2.5
  negativeMarksPerQuestion: number; // 2.5 / 3 = 0.8333333333333334
  configuredQuestionCount: number; // 120, 130, 140, 150
  allowedTestLengths: number[]; // [120, 130, 140, 150]
  officialDoc: OfficialSyllabusDoc;
  topics: TopicConfig[];
}

export interface UserExamSession {
  examType: ExamType;
  testId?: string;
  testTitle?: string;
  startedAt: number;
  timeRemainingSeconds: number;
  durationMinutes: number;
  targetQuestionCount: number;
  questionIds: string[]; // Exact unique questions loaded for this session
  isPracticeMode?: boolean;
  difficultyPreset?: 'standard' | 'difficult_focus' | 'balanced';
  enforceZeroRepeat?: boolean;
  answers: Record<string, number>; // questionId -> selectedOptionIndex (0-3)
  states: Record<string, QuestionState>; // questionId -> QuestionState
  visited: Record<string, boolean>; // questionId -> boolean
  currentQuestionIndex: number;
  isSubmitted: boolean;
  submittedAt?: number;
}

export interface EvaluatedQuestionResult {
  questionId: string;
  questionNumber: number; // 1-indexed
  topic: string;
  topicHi?: string;
  userChoice: number | undefined;
  correctOptionIndex: number;
  status: 'correct' | 'incorrect' | 'unanswered';
  isCorrect: boolean;
  isIncorrect: boolean;
  isUnanswered: boolean;
  marksAwarded: number; // Exact float internally: +2.5, -0.8333333333333334, or 0
  displayMarksAwarded: string; // Formatted for display: "+2.5", "-0.83", "0"
}

export interface TopicResult {
  topic: string;
  topicHi?: string;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number; // Rounded to 2 decimals for display, guaranteed to sum to overall totalScore
  maxScore: number;
  percentage: number;
}

export interface ExamResultSummary {
  examType: ExamType;
  totalQuestions: number;
  attempted: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  markedForReviewCount: number;
  earnedMarks: number; // Correct * 2.5
  negativeMarks: number; // Incorrect * (2.5 / 3) rounded to 2 decimals
  totalScore: number; // Exact: (earned - rawNegative) rounded to 2 decimals
  maxScore: number; // totalQuestions * 2.5
  percentage: number; // (totalScore / maxScore) * 100 rounded to 2 decimals
  accuracy: number; // (correctCount / attempted) * 100 rounded to 2 decimals
  timeTakenSeconds: number;
  topics: TopicResult[];
  topicPerformance: Record<string, {
    total: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    score: number;
    maxScore: number;
  }>;
  evaluatedQuestions: EvaluatedQuestionResult[];
}

export interface DuplicateCheckMatch {
  matchedQuestion: Question;
  matchType: 'exact' | 'concept_high' | 'concept_moderate';
  similarityScore: number; // 0 to 100
  matchedLanguage: 'en' | 'hi' | 'both';
  reason: string;
}

export interface DuplicateDetectionResult {
  hasPotentialDuplicate: boolean;
  matches: DuplicateCheckMatch[];
  warningMessage?: string;
}

export interface MockTestRecord {
  testId: string;
  examType: ExamType;
  testTitle: string;
  generatedAt: number;
  questionCount: number;
  durationMinutes: number;
  isPracticeMode: boolean;
  difficultyPreset?: 'standard' | 'difficult_focus' | 'balanced';
  questionIds: string[];
  submittedAt?: number;
  totalScore?: number;
  percentage?: number;
}

export interface QuestionUsageRecord {
  questionId: string;
  examType: ExamType;
  testId: string;
  testTitle: string;
  usedAt: number;
  normalizedTextEn: string;
  normalizedTextHi: string;
  tokensEn: string[];
  tokensHi: string[];
  conceptId?: string;
  learningObjective?: string;
  statuteOrScheme?: string;
  sourceReference?: string;
  fingerprint?: string;
  optionsEnNormalized?: string[];
  optionsHiNormalized?: string[];
  sourceProvenance?: string;
}

export interface QuestionReservation {
  questionId: string;
  testId: string;
  reservedAt: number;
  expiresAt: number;
}

export interface PersistentUsageRegistry {
  version: number;
  usedQuestions: Record<string, QuestionUsageRecord>; // questionId -> usage details
  usedNormalizedEnTexts: Record<string, string>; // normalizedTextEn -> questionId
  usedNormalizedHiTexts: Record<string, string>; // normalizedTextHi -> questionId
  usedConceptIds: Record<string, string>; // conceptId -> questionId
  usedFingerprints: Record<string, string>; // fingerprint -> questionId
  activeReservations: Record<string, QuestionReservation>; // questionId -> reservation
  rejectedQuestionIds: Record<string, { reason: string; rejectedAt: number }>;
  testHistory: MockTestRecord[];
}

export interface TestGenerationOptions {
  examType: ExamType;
  targetCount: number;
  durationMinutes: number;
  isPracticeMode: boolean;
  difficultyPreset: 'standard' | 'difficult_focus' | 'balanced'; // standard: 20% Med, 50% Hard, 30% V.Hard
  testTitle?: string;
  enforceZeroRepeat?: boolean;
}

export interface StorageSourceAudit {
  key: string;
  status: 'found' | 'empty' | 'corrupted';
  description: string;
  recordsCount: number;
}

export interface HistoryAuditReport {
  success: boolean;
  auditedAt: number;
  sourcesScanned: StorageSourceAudit[];
  recordsFound: number;
  questionsImported: number;
  duplicatesDetected: number;
  duplicateDetails: string[];
  unavailableLegacyHistory: string[];
  recoveredDetails: string[];
  errors: string[];
  summaryMessage: string;
  migratedTestsCount?: number;
  migratedQuestionsCount?: number;
  unrecoverableNotes?: string;
}

export interface TopicRegistryStat {
  topicId: string;
  topicNameEn: string;
  topicNameHi: string;
  unitNumber?: number;
  expectedQuestionCount?: number;
  totalBankCount: number;
  approvedCount: number;
  pendingCount: number;
  usedCount: number;
  eligibleRemaining: number;
  duplicateOrExcludedCount: number;
  deficitOrGapCount: number;
  isNotCovered?: boolean;
  isSelectableInGenerator?: boolean;
  subtopics: {
    id: string;
    nameEn: string;
    nameHi: string;
    approvedCount: number;
    unusedCount: number;
  }[];
}


