import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Question,
  ExamType,
  LanguageMode,
  UserExamSession,
  ExamResultSummary,
  QuestionState,
  ExamConfig,
  MockTestRecord,
  TestGenerationOptions,
  HistoryAuditReport
} from '../types/quiz';
import { INITIAL_QUESTIONS, EXAM_CONFIGS } from '../data/seedQuestions';
import { checkForDuplicates } from '../utils/duplicateDetector';
import { evaluateExamSession, sanitizeQuestion } from '../utils/scoring';
import { safeStorage } from '../utils/safeStorage';
import { generateMockTest } from '../utils/testGeneratorEngine';
import {
  commitMockTestUsage,
  releaseReservationForTest,
  resetUsageRegistry,
  getRegistryStats,
  migrateAndImportPreviousHistory,
  checkQuestionUsageStatus,
  loadUsageRegistry,
  generateQuestionFingerprint,
  HistoryMigrationResult
} from '../utils/questionUsageRegistry';
import { executeAuto120Generation, generateChunkQuestions, AutoGenerationProgress } from '../utils/autoMockPoolGenerator';

export interface BankAvailabilityCheck {
  examType: ExamType;
  availableCount: number;
  approvedCount: number;
  configuredTarget: number;
  isSufficient: boolean;
  isVerified: boolean;
  recruitingAuthority: string;
  exactPostName: string;
  verificationStatus: string;
}

interface QuizContextType {
  questions: Question[];
  activeExam: ExamType;
  setActiveExam: (exam: ExamType) => void;
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  session: UserExamSession | null;
  currentQuestions: Question[];
  currentQuestion: Question | null;
  currentQuestionState: QuestionState;
  examConfigs: Record<ExamType, ExamConfig>;
  updateExamConfig: (examType: ExamType, partial: Partial<ExamConfig>) => void;
  resetExamConfigsToDefault: () => void;
  checkBankAvailability: (examType?: ExamType) => BankAvailabilityCheck;
  
  // Test Navigation and Action
  startTest: (
    examType?: ExamType,
    customDuration?: number,
    targetCount?: number,
    forcePracticeMode?: boolean,
    generationOptions?: Partial<TestGenerationOptions>
  ) => { started: boolean; warning?: string; testRecord?: MockTestRecord };
  
  // Automated Pool & 120-Mock Generation
  autoGenerate120Pool: (
    examType?: ExamType,
    onProgress?: (progress: AutoGenerationProgress) => void
  ) => Promise<{ success: boolean; countAdded: number; totalEligible: number }>;

  autoGenerateAndLaunch120Test: (
    examType?: ExamType,
    durationMinutes?: number,
    onProgress?: (progress: AutoGenerationProgress) => void
  ) => Promise<{ started: boolean; warning?: string; testRecord?: MockTestRecord }>;

  selectOption: (optionIndex: number) => void;
  clearOption: () => void;
  toggleMarkForReview: () => void;
  saveAndNext: () => void;
  markAndNext: () => void;
  previousQuestion: () => void;
  nextQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  submitTest: () => void;
  cancelTest: () => void;
  clearActiveSession: () => void;

  // Zero-Repeat & Usage Management
  resetExamUsage: (examType?: ExamType) => void;
  getUsageStats: (examType: ExamType | 'all') => ReturnType<typeof getRegistryStats>;
  importUsageHistory: () => HistoryAuditReport;

  // Question Management (Admin)
  addQuestion: (question: Omit<Question, 'id'>) => { success: boolean; duplicateMatches?: any[]; id?: string };
  updateQuestion: (id: string, question: Partial<Question>) => boolean;
  deleteQuestion: (id: string) => void;
  approveQuestion: (id: string) => boolean;
  bulkApproveQuestions: (ids: string[]) => { approved: number };
  resetQuestionsToDefault: () => void;
  importQuestions: (
    newQuestions: Question[],
    skipDuplicates?: boolean,
    asPending?: boolean
  ) => { added: number; skipped: number; pendingCount: number };
  exportQuestionsJSON: () => void;

  // Results
  resultSummary: ExamResultSummary | null;

  // Pinned / Revision Questions
  pinnedQuestionIds: string[];
  pinnedQuestions: Question[];
  togglePinQuestion: (questionId: string) => void;
  isQuestionPinned: (questionId: string) => boolean;
  clearAllPinned: () => void;
}

const STORAGE_KEY_QUESTIONS = 'principal_portal_questions_v2';
const STORAGE_KEY_CONFIGS = 'principal_portal_configs_v2';
const STORAGE_KEY_SESSION = 'principal_active_exam_session_v3';
const STORAGE_KEY_PINNED = 'principal_pinned_questions_v1';

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Exam Configurations from storage or seed defaults
  const [examConfigs, setExamConfigs] = useState<Record<ExamType, ExamConfig>>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY_CONFIGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...EXAM_CONFIGS,
            ...parsed
          };
        }
      }
    } catch (e) {
      console.error('Failed to load saved configs', e);
    }
    return EXAM_CONFIGS;
  });

  // Load questions from storage or fallback to seed
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY_QUESTIONS) || safeStorage.getItem('principal_portal_questions_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_QUESTIONS.length) {
          return parsed.map((item: any) => sanitizeQuestion(item));
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom questions with INITIAL_QUESTIONS so user never loses their data and always gets full bank
          const seedIds = new Set(INITIAL_QUESTIONS.map(q => q.id));
          const customOnly = parsed.filter((q: any) => !seedIds.has(q.id));
          const merged = [
            ...INITIAL_QUESTIONS.map(q => sanitizeQuestion(q)),
            ...customOnly.map((item: any) => sanitizeQuestion(item))
          ];
          safeStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(merged));
          return merged;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved questions, fallback to initial', e);
    }
    return INITIAL_QUESTIONS.map(q => sanitizeQuestion(q));
  });

  const [activeExam, setActiveExamState] = useState<ExamType>('upsc-principal');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('both');
  // Safe persistent session restoration across refreshes and browser restarts
  const [session, setSession] = useState<UserExamSession | null>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY_SESSION);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.questionIds) && parsed.questionIds.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to restore active exam session from storage', e);
    }
    return null;
  });

  const setActiveExam = useCallback((exam: ExamType) => {
    // Standardize alias
    const normalized: ExamType = exam === 'uppcs-principal' ? 'up-aided-principal' : exam;
    setActiveExamState(normalized);
  }, []);

  // Sync session to safeStorage
  useEffect(() => {
    try {
      if (session) {
        safeStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
      } else {
        safeStorage.removeItem(STORAGE_KEY_SESSION);
      }
    } catch (e) {
      console.error('Failed to sync session to storage', e);
    }
  }, [session]);

  // Safe automatic migration of previous test records on startup
  useEffect(() => {
    try {
      migrateAndImportPreviousHistory(questions);
    } catch (e) {
      console.error('Failed to run initial history migration', e);
    }
  }, []);

  // Sync questions to safeStorage
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to persist questions to storage', e);
    }
  }, [questions]);

  // Sync exam configs to safeStorage
  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY_CONFIGS, JSON.stringify(examConfigs));
    } catch (e) {
      console.error('Failed to persist configs to storage', e);
    }
  }, [examConfigs]);

  // Persistent Pinned / Revision Questions (⭐)
  const [pinnedQuestionIds, setPinnedQuestionIds] = useState<string[]>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEY_PINNED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load pinned questions', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY_PINNED, JSON.stringify(pinnedQuestionIds));
    } catch (e) {
      console.error('Failed to persist pinned questions', e);
    }
  }, [pinnedQuestionIds]);

  const togglePinQuestion = useCallback((questionId: string) => {
    setPinnedQuestionIds(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  }, []);

  const isQuestionPinned = useCallback((questionId: string) => {
    return pinnedQuestionIds.includes(questionId);
  }, [pinnedQuestionIds]);

  const clearAllPinned = useCallback(() => {
    setPinnedQuestionIds([]);
  }, []);

  const pinnedQuestions = useMemo(() => {
    const qMap = new Map(questions.map(q => [q.id, q]));
    return pinnedQuestionIds.map(id => qMap.get(id)).filter(Boolean) as Question[];
  }, [questions, pinnedQuestionIds]);

  // Filtered questions for the active test
  const currentQuestions = useMemo(() => {
    // If an active session exists with explicit questionIds, resolve them in exact order
    if (session && session.questionIds && session.questionIds.length > 0) {
      const qMap = new Map(questions.map(q => [q.id, q]));
      const list = session.questionIds.map(id => qMap.get(id)).filter(Boolean) as Question[];
      if (list.length > 0) {
        return list;
      }
    }

    const rawExam = session ? session.examType : activeExam;
    const exam = rawExam === 'uppcs-principal' ? 'up-aided-principal' : rawExam;

    return questions.filter(q => {
      if (exam === 'up-aided-principal') {
        return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
      }
      return q.examType === exam;
    });
  }, [questions, session, activeExam]);

  const currentQuestion = useMemo(() => {
    if (!session || currentQuestions.length === 0) return null;
    const idx = Math.min(Math.max(0, session.currentQuestionIndex), currentQuestions.length - 1);
    return currentQuestions[idx] || null;
  }, [session, currentQuestions]);

  // Current question status in the palette
  const currentQuestionState = useMemo<QuestionState>(() => {
    if (!session || !currentQuestion) return 'not_visited';
    return session.states[currentQuestion.id] || 'not_visited';
  }, [session, currentQuestion]);

  // Update Exam Configuration (Admin)
  const updateExamConfig = useCallback((examType: ExamType, partial: Partial<ExamConfig>) => {
    const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
    setExamConfigs(prev => {
      const current = prev[targetExam] || EXAM_CONFIGS[targetExam];
      const updated: ExamConfig = {
        ...current,
        ...partial,
        officialDoc: {
          ...current.officialDoc,
          ...(partial.officialDoc || {})
        }
      };
      return {
        ...prev,
        [targetExam]: updated
      };
    });
  }, []);

  const resetExamConfigsToDefault = useCallback(() => {
    setExamConfigs(EXAM_CONFIGS);
    try {
      safeStorage.removeItem(STORAGE_KEY_CONFIGS);
    } catch (e) {
      console.error('Failed to reset configs storage', e);
    }
  }, []);

  // Pre-flight bank availability check
  const checkBankAvailability = useCallback((examType?: ExamType): BankAvailabilityCheck => {
    const targetExam = (examType || activeExam) === 'uppcs-principal' ? 'up-aided-principal' : (examType || activeExam);
    const config = examConfigs[targetExam] || EXAM_CONFIGS[targetExam];
    const examQuestions = questions.filter(q => {
      if (targetExam === 'up-aided-principal') {
        return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
      }
      return q.examType === targetExam;
    });

    const approvedCount = examQuestions.filter(q => q.isApproved !== false).length;
    const isSufficient = approvedCount >= config.configuredQuestionCount;

    return {
      examType: targetExam,
      availableCount: examQuestions.length,
      approvedCount,
      configuredTarget: config.configuredQuestionCount,
      isSufficient,
      isVerified: config.officialDoc.verificationStatus === 'Verified',
      recruitingAuthority: config.officialDoc.recruitingAuthority,
      exactPostName: config.officialDoc.exactPostName,
      verificationStatus: config.officialDoc.verificationStatus
    };
  }, [activeExam, examConfigs, questions]);

  // Timer effect
  useEffect(() => {
    if (!session || session.isSubmitted) return;

    const timer = setInterval(() => {
      setSession(prev => {
        if (!prev || prev.isSubmitted) return prev;
        if (prev.timeRemainingSeconds <= 1) {
          // Auto submit when time runs out
          return {
            ...prev,
            timeRemainingSeconds: 0,
            isSubmitted: true,
            submittedAt: Date.now()
          };
        }
        return {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  // Start exam session with Unlimited Generator & Absolute Zero-Repeat Policy
  const startTest = useCallback((
    examType?: ExamType,
    customDuration?: number,
    targetCount?: number,
    forcePracticeMode: boolean = false,
    generationOptions?: Partial<TestGenerationOptions>
  ) => {
    const rawTarget = examType || activeExam;
    const targetExam: ExamType = rawTarget === 'uppcs-principal' ? 'up-aided-principal' : rawTarget;
    const config = examConfigs[targetExam] || EXAM_CONFIGS[targetExam];

    const isFullMock = !forcePracticeMode && (targetCount === undefined || targetCount >= 120);
    const requestedCount = isFullMock ? 120 : (targetCount || config.configuredQuestionCount || 120);
    const durationMinutes = isFullMock ? (customDuration || 120) : (customDuration || config.durationMinutes);

    let workingQuestions = [...questions];

    // Check eligible remaining questions
    let stats = getRegistryStats(targetExam, workingQuestions);

    // If this is a full-length mock test and remaining unused questions are below 120,
    // automatically invoke the 4-chunk auto-generator to add fresh questions into the pool
    // before launching the test so that the session counter always displays 0 / 120.
    if (isFullMock && stats.eligibleRemaining < 120) {
      const existingIds = new Set(workingQuestions.map(q => q.id));
      const timestamp = Date.now();
      const newPool: Question[] = [];

      // Generate 4 consecutive chunks of 30 bilingual questions (120 fresh questions)
      for (let c = 0; c < 4; c++) {
        const chunk = generateChunkQuestions(targetExam, c, existingIds, timestamp);
        newPool.push(...chunk);
      }

      // Safeguard: Ensure total available unused questions reach at least 120
      let extraChunk = 4;
      while ((stats.eligibleRemaining + newPool.length) < 120 && extraChunk < 10) {
        const chunk = generateChunkQuestions(targetExam, extraChunk % 4, existingIds, timestamp + extraChunk);
        newPool.push(...chunk);
        extraChunk++;
      }

      workingQuestions = [...workingQuestions, ...newPool];
      setQuestions(workingQuestions);
      try {
        safeStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(workingQuestions));
      } catch (e) {
        console.error('Failed to persist auto-generated questions to safeStorage', e);
      }
      stats = getRegistryStats(targetExam, workingQuestions);
    }

    const examQuestions = workingQuestions.filter(q => {
      if (targetExam === 'up-aided-principal') {
        return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
      }
      return q.examType === targetExam;
    });

    if (examQuestions.length === 0) {
      return {
        started: false,
        warning: `No practice questions currently exist for ${config.titleEn}. Please add questions or verify the official syllabus first.`
      };
    }

    // Use testGeneratorEngine to enforce Zero-Repeat, Syllabus Section Distribution, and balancing
    const genResult = generateMockTest(
      {
        examType: targetExam,
        targetCount: isFullMock ? 120 : requestedCount,
        durationMinutes,
        isPracticeMode: isFullMock ? false : forcePracticeMode,
        difficultyPreset: generationOptions?.difficultyPreset || 'standard',
        testTitle: generationOptions?.testTitle || (isFullMock ? `${config.titleEn} — Full Mock Simulation #${(stats.testsCreated || 0) + 1}` : undefined),
        enforceZeroRepeat: isFullMock ? true : (generationOptions?.enforceZeroRepeat ?? true)
      },
      workingQuestions
    );

    let selectedQuestions = genResult.selectedQuestions || [];

    // Strictly ensure exactly 120 questions for full-length mock test
    if (isFullMock && selectedQuestions.length < 120) {
      const chosenIds = new Set(selectedQuestions.map(q => q.id));
      const fillCandidates = workingQuestions.filter(q => {
        if (targetExam === 'up-aided-principal') {
          return (q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal') && !chosenIds.has(q.id);
        }
        return q.examType === targetExam && !chosenIds.has(q.id);
      });
      for (const filler of fillCandidates) {
        selectedQuestions.push(filler);
        chosenIds.add(filler.id);
        if (selectedQuestions.length === 120) break;
      }
    }

    if (!isFullMock && (!genResult.success || selectedQuestions.length === 0)) {
      return {
        started: false,
        warning: genResult.shortfallReason || `Insufficient questions available to generate this practice test. (${genResult.eligibleCount} eligible unused questions remain).`
      };
    }

    if (isFullMock && selectedQuestions.length < 120) {
      return {
        started: false,
        warning: 'Failed to allocate exactly 120 questions for full-length mock test.'
      };
    }

    const selectedIds = selectedQuestions.map(q => q.id);

    // CRITICAL: Permanently commit question usage immediately when test is generated & finalized
    // This ensures questions from practice tests, full simulations, and custom practice are never repeated
    if (genResult.testRecord) {
      genResult.testRecord.questionCount = selectedQuestions.length;
      genResult.testRecord.questionIds = selectedIds;
      commitMockTestUsage(genResult.testRecord, selectedQuestions);
    }

    const initialStates: Record<string, QuestionState> = {};
    const initialVisited: Record<string, boolean> = {};

    selectedQuestions.forEach((q, idx) => {
      initialStates[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
      initialVisited[q.id] = idx === 0;
    });

    const newSession: UserExamSession = {
      examType: targetExam,
      testId: genResult.testRecord?.testId || `mock-${targetExam}-${Date.now()}`,
      testTitle: genResult.testRecord?.testTitle || `${config.titleEn} — Full Mock Simulation #${(stats.testsCreated || 0) + 1}`,
      startedAt: Date.now(),
      timeRemainingSeconds: durationMinutes * 60,
      durationMinutes,
      targetQuestionCount: isFullMock ? 120 : selectedQuestions.length,
      questionIds: selectedIds,
      isPracticeMode: isFullMock ? false : (forcePracticeMode || selectedQuestions.length < 120),
      difficultyPreset: generationOptions?.difficultyPreset || 'standard',
      enforceZeroRepeat: isFullMock ? true : (generationOptions?.enforceZeroRepeat ?? true),
      answers: {},
      states: initialStates,
      visited: initialVisited,
      currentQuestionIndex: 0,
      isSubmitted: false
    };

    setSession(newSession);

    try {
      safeStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newSession));
    } catch (e) {
      console.error('Failed to persist session to safeStorage', e);
    }

    return { started: true, testRecord: genResult.testRecord };
  }, [activeExam, examConfigs, questions]);

  // 1-Click Automated 120-Question Pool Generator
  const autoGenerate120Pool = useCallback(async (
    examType?: ExamType,
    onProgress?: (progress: AutoGenerationProgress) => void
  ): Promise<{ success: boolean; countAdded: number; totalEligible: number }> => {
    const rawTarget = examType || activeExam;
    const targetExam: ExamType = rawTarget === 'uppcs-principal' ? 'up-aided-principal' : rawTarget;
    
    // Generate 4 chunks of 30 bilingual questions
    const generated = await executeAuto120Generation(targetExam, questions, onProgress);
    
    // Add to questions list with duplicate protection & verification
    const currentIds = new Set(questions.map(q => q.id));
    const newItems = generated.filter(q => !currentIds.has(q.id));
    
    const updated = [...questions, ...newItems];
    setQuestions(updated);
    try {
      safeStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist questions to safeStorage', e);
    }

    const stats = getRegistryStats(targetExam, updated);

    return {
      success: true,
      countAdded: newItems.length,
      totalEligible: stats.eligibleRemaining
    };
  }, [activeExam, questions]);

  // 1-Click Automatic 120-Question Full Mock Generator & Launcher
  const autoGenerateAndLaunch120Test = useCallback(async (
    examType?: ExamType,
    durationMinutes: number = 120,
    onProgress?: (progress: AutoGenerationProgress) => void
  ): Promise<{ started: boolean; warning?: string; testRecord?: MockTestRecord }> => {
    const rawTarget = examType || activeExam;
    const targetExam: ExamType = rawTarget === 'uppcs-principal' ? 'up-aided-principal' : rawTarget;
    const config = examConfigs[targetExam] || EXAM_CONFIGS[targetExam];

    // Check if eligible remaining questions are already sufficient
    let stats = getRegistryStats(targetExam, questions);
    let workingQuestions = [...questions];

    if (stats.eligibleRemaining < 120) {
      // Execute automated generation loop of 4 consecutive chunks of 30 bilingual questions
      const generated = await executeAuto120Generation(targetExam, workingQuestions, onProgress);
      const currentIds = new Set(workingQuestions.map(q => q.id));
      const newItems = generated.filter(q => !currentIds.has(q.id));
      workingQuestions = [...workingQuestions, ...newItems];

      // If still under 120, generate additional chunks synchronously
      let extraChunk = 4;
      const existingIds = new Set(workingQuestions.map(q => q.id));
      const timestamp = Date.now();
      while (getRegistryStats(targetExam, workingQuestions).eligibleRemaining < 120 && extraChunk < 10) {
        const chunk = generateChunkQuestions(targetExam, extraChunk % 4, existingIds, timestamp + extraChunk);
        workingQuestions.push(...chunk);
        extraChunk++;
      }

      setQuestions(workingQuestions);
      try {
        safeStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(workingQuestions));
      } catch (e) {
        console.error('Failed to persist questions to safeStorage', e);
      }
    }

    // Now generate the strictly 120-question test from workingQuestions
    const reg = loadUsageRegistry();
    const genResult = generateMockTest(
      {
        examType: targetExam,
        targetCount: 120,
        durationMinutes: 120,
        isPracticeMode: false,
        difficultyPreset: 'standard',
        testTitle: `${config.titleEn} — Full Mock Simulation #${(reg.testHistory?.length || 0) + 1}`,
        enforceZeroRepeat: true
      },
      workingQuestions
    );

    let selectedQuestions = genResult.selectedQuestions || [];

    // Strictly ensure exactly 120 questions
    if (selectedQuestions.length < 120) {
      const chosenIds = new Set(selectedQuestions.map(q => q.id));
      const fillCandidates = workingQuestions.filter(q => {
        if (targetExam === 'up-aided-principal') {
          return (q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal') && !chosenIds.has(q.id);
        }
        return q.examType === targetExam && !chosenIds.has(q.id);
      });
      for (const filler of fillCandidates) {
        selectedQuestions.push(filler);
        chosenIds.add(filler.id);
        if (selectedQuestions.length === 120) break;
      }
    }

    if (selectedQuestions.length < 120) {
      return {
        started: false,
        warning: 'Failed to allocate exactly 120 questions for mock test.'
      };
    }

    const selectedIds = selectedQuestions.map(q => q.id);

    // Commit question usage permanently to registry
    if (genResult.testRecord) {
      genResult.testRecord.questionCount = 120;
      genResult.testRecord.questionIds = selectedIds;
      commitMockTestUsage(genResult.testRecord, selectedQuestions);
    }

    const initialStates: Record<string, QuestionState> = {};
    const initialVisited: Record<string, boolean> = {};

    selectedQuestions.forEach((q, idx) => {
      initialStates[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
      initialVisited[q.id] = idx === 0;
    });

    const newSession: UserExamSession = {
      examType: targetExam,
      testId: genResult.testRecord?.testId || `mock-${targetExam}-${Date.now()}`,
      testTitle: genResult.testRecord?.testTitle || `${config.titleEn} — Full Mock Simulation #${(reg.testHistory?.length || 0) + 1}`,
      startedAt: Date.now(),
      timeRemainingSeconds: 120 * 60,
      durationMinutes: 120,
      targetQuestionCount: 120,
      questionIds: selectedIds,
      isPracticeMode: false,
      difficultyPreset: 'standard',
      enforceZeroRepeat: true,
      answers: {},
      states: initialStates,
      visited: initialVisited,
      currentQuestionIndex: 0,
      isSubmitted: false
    };

    setSession(newSession);

    try {
      safeStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newSession));
    } catch (e) {
      console.error('Failed to persist session to safeStorage', e);
    }

    return { started: true, testRecord: genResult.testRecord };
  }, [activeExam, examConfigs, questions]);

  // Select an option
  const selectOption = useCallback((optionIndex: number) => {
    if (!session || session.isSubmitted || !currentQuestion) return;

    setSession(prev => {
      if (!prev) return null;
      const qId = currentQuestion.id;
      const newAnswers = { ...prev.answers, [qId]: optionIndex };
      const currentState = prev.states[qId];

      let newState: QuestionState = 'answered';
      if (currentState === 'marked_for_review' || currentState === 'answered_and_marked') {
        newState = 'answered_and_marked';
      }

      return {
        ...prev,
        answers: newAnswers,
        states: { ...prev.states, [qId]: newState }
      };
    });
  }, [session, currentQuestion]);

  // Clear chosen option
  const clearOption = useCallback(() => {
    if (!session || session.isSubmitted || !currentQuestion) return;

    setSession(prev => {
      if (!prev) return null;
      const qId = currentQuestion.id;
      const newAnswers = { ...prev.answers };
      delete newAnswers[qId];

      const currentState = prev.states[qId];
      let newState: QuestionState = 'not_answered';
      if (currentState === 'marked_for_review' || currentState === 'answered_and_marked') {
        newState = 'marked_for_review';
      }

      return {
        ...prev,
        answers: newAnswers,
        states: { ...prev.states, [qId]: newState }
      };
    });
  }, [session, currentQuestion]);

  // Toggle Mark for Review
  const toggleMarkForReview = useCallback(() => {
    if (!session || session.isSubmitted || !currentQuestion) return;

    setSession(prev => {
      if (!prev) return null;
      const qId = currentQuestion.id;
      const currentState = prev.states[qId];
      const hasAnswer = prev.answers[qId] !== undefined;

      let newState: QuestionState;
      if (currentState === 'marked_for_review' || currentState === 'answered_and_marked') {
        newState = hasAnswer ? 'answered' : 'not_answered';
      } else {
        newState = hasAnswer ? 'answered_and_marked' : 'marked_for_review';
      }

      return {
        ...prev,
        states: { ...prev.states, [qId]: newState }
      };
    });
  }, [session, currentQuestion]);

  // Save and Next
  const saveAndNext = useCallback(() => {
    if (!session || session.isSubmitted) return;
    const nextIdx = session.currentQuestionIndex + 1;
    if (nextIdx < currentQuestions.length) {
      const nextQId = currentQuestions[nextIdx].id;
      setSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: nextIdx,
          visited: { ...prev.visited, [nextQId]: true },
          states: {
            ...prev.states,
            [nextQId]: prev.states[nextQId] === 'not_visited' ? 'not_answered' : prev.states[nextQId]
          }
        };
      });
    }
  }, [session, currentQuestions]);

  // Mark for Review & Next
  const markAndNext = useCallback(() => {
    toggleMarkForReview();
    saveAndNext();
  }, [toggleMarkForReview, saveAndNext]);

  // Previous Question
  const previousQuestion = useCallback(() => {
    if (!session || session.isSubmitted) return;
    if (session.currentQuestionIndex > 0) {
      const prevIdx = session.currentQuestionIndex - 1;
      const prevQId = currentQuestions[prevIdx].id;
      setSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: prevIdx,
          visited: { ...prev.visited, [prevQId]: true }
        };
      });
    }
  }, [session, currentQuestions]);

  // Next Question
  const nextQuestion = useCallback(() => {
    if (!session || session.isSubmitted) return;
    if (session.currentQuestionIndex < currentQuestions.length - 1) {
      const nextIdx = session.currentQuestionIndex + 1;
      const nextQId = currentQuestions[nextIdx].id;
      setSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: nextIdx,
          visited: { ...prev.visited, [nextQId]: true },
          states: {
            ...prev.states,
            [nextQId]: prev.states[nextQId] === 'not_visited' ? 'not_answered' : prev.states[nextQId]
          }
        };
      });
    }
  }, [session, currentQuestions]);

  // Direct Jump from Question Palette
  const jumpToQuestion = useCallback((index: number) => {
    if (!session || session.isSubmitted) return;
    if (index >= 0 && index < currentQuestions.length) {
      const targetQId = currentQuestions[index].id;
      setSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: index,
          visited: { ...prev.visited, [targetQId]: true },
          states: {
            ...prev.states,
            [targetQId]: prev.states[targetQId] === 'not_visited' ? 'not_answered' : prev.states[targetQId]
          }
        };
      });
    }
  }, [session, currentQuestions]);

  // Final Submit - Commits question usage to permanent Zero-Repeat registry
  const submitTest = useCallback(() => {
    if (!session) return;

    // Permanently record mock test usage so questions are never repeated in future tests
    if (session.testId) {
      const sessionQuestions = questions.filter(q => session.questionIds.includes(q.id));
      const testRecord: MockTestRecord = {
        testId: session.testId,
        examType: session.examType,
        testTitle: session.testTitle || `Mock Test (${session.examType})`,
        generatedAt: session.startedAt,
        questionCount: session.questionIds.length,
        durationMinutes: session.durationMinutes,
        isPracticeMode: !!session.isPracticeMode,
        difficultyPreset: session.difficultyPreset,
        questionIds: session.questionIds
      };
      commitMockTestUsage(testRecord, sessionQuestions);
    }

    setSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isSubmitted: true,
        submittedAt: Date.now()
      };
    });
  }, [session, questions]);

  // Cancel test - releases any atomic question reservation
  const cancelTest = useCallback(() => {
    if (session?.testId && !session.isSubmitted) {
      releaseReservationForTest(session.testId);
    }
    setSession(null);
  }, [session]);

  // Explicitly clears active test session & removes storage
  const clearActiveSession = useCallback(() => {
    if (session?.testId && !session.isSubmitted) {
      releaseReservationForTest(session.testId);
    }
    setSession(null);
    try {
      safeStorage.removeItem(STORAGE_KEY_SESSION);
    } catch (e) {
      console.error('Failed to remove session from safeStorage', e);
    }
  }, [session]);

  // Zero-Repeat Usage Management Helpers
  const resetExamUsage = useCallback((examType?: ExamType) => {
    resetUsageRegistry(examType);
  }, []);

  const getUsageStats = useCallback((examType: ExamType | 'all') => {
    return getRegistryStats(examType, questions);
  }, [questions]);

  const importUsageHistory = useCallback(() => {
    return migrateAndImportPreviousHistory(questions);
  }, [questions]);

  // Compute test results using deterministic scoring engine with exact fractions
  const resultSummary = useMemo<ExamResultSummary | null>(() => {
    if (!session || !session.isSubmitted) return null;

    const targetExam = session.examType === 'uppcs-principal' ? 'up-aided-principal' : session.examType;
    const config = examConfigs[targetExam] || EXAM_CONFIGS[targetExam];
    const markedIds = new Set<string>();

    Object.entries(session.states).forEach(([qId, st]) => {
      if (st === 'marked_for_review' || st === 'answered_and_marked') {
        markedIds.add(qId);
      }
    });

    return evaluateExamSession(
      currentQuestions,
      session.answers,
      config,
      session.timeRemainingSeconds,
      markedIds
    );
  }, [session, currentQuestions, examConfigs]);

  // Admin: Add Question with Duplicate Check
  const addQuestion = useCallback((qData: Omit<Question, 'id'>) => {
    const dupCheck = checkForDuplicates(
      {
        questionTextEn: qData.questionTextEn,
        questionTextHi: qData.questionTextHi,
        topic: qData.topic,
        optionsEn: qData.optionsEn
      },
      questions
    );

    const newId = `custom-q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newQuestion: Question = sanitizeQuestion(
      {
        ...qData,
        id: newId,
        isPracticeQuestion: true,
        isApproved: qData.isApproved !== undefined ? qData.isApproved : true,
        createdAt: new Date().toISOString()
      },
      qData.examType
    );

    setQuestions(prev => [newQuestion, ...prev]);

    return {
      success: true,
      id: newId,
      duplicateMatches: dupCheck.matches
    };
  }, [questions]);

  // Admin: Update Question
  const updateQuestion = useCallback((id: string, updated: Partial<Question>) => {
    let exists = false;
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        exists = true;
        return sanitizeQuestion({ ...q, ...updated }, q.examType);
      }
      return q;
    }));
    return exists;
  }, []);

  // Admin: Delete Question
  const deleteQuestion = useCallback((id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  // Admin: Approve a Single Question
  const approveQuestion = useCallback((id: string) => {
    let exists = false;
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        exists = true;
        return {
          ...q,
          isApproved: true,
          sourceInfo: q.sourceInfo ? {
            ...q.sourceInfo,
            verificationStatus: 'Verified' as const,
            verifiedDate: new Date().toISOString().slice(0, 10),
            verifiedBy: 'Administrator Verified'
          } : undefined
        };
      }
      return q;
    }));
    return exists;
  }, []);

  // Admin: Bulk Approve Questions
  const bulkApproveQuestions = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    let approved = 0;
    setQuestions(prev => prev.map(q => {
      if (idSet.has(q.id) && q.isApproved === false) {
        approved++;
        return {
          ...q,
          isApproved: true,
          sourceInfo: q.sourceInfo ? {
            ...q.sourceInfo,
            verificationStatus: 'Verified' as const,
            verifiedDate: new Date().toISOString().slice(0, 10),
            verifiedBy: 'Administrator Verified'
          } : undefined
        };
      }
      return q;
    }));
    return { approved };
  }, []);

  // Admin: Reset to Default
  const resetQuestionsToDefault = useCallback(() => {
    setQuestions(INITIAL_QUESTIONS.map(q => sanitizeQuestion(q)));
    try {
      safeStorage.removeItem(STORAGE_KEY_QUESTIONS);
    } catch (e) {
      console.error('Failed to remove item from storage', e);
    }
  }, []);

  // Admin: Bulk Import with Multi-Tier Duplicate & Zero-Repeat Registry Protection
  const importQuestions = useCallback((
    newQuestions: Question[],
    skipDuplicates: boolean = true,
    asPending: boolean = false
  ) => {
    let added = 0;
    let skipped = 0;
    let pendingCount = 0;
    const toAdd: Question[] = [];
    const reg = loadUsageRegistry();

    newQuestions.forEach(rawQ => {
      const q = sanitizeQuestion(rawQ);
      if (skipDuplicates) {
        // 1. Bank Duplicate Check
        const bankCheck = checkForDuplicates(
          {
            questionTextEn: q.questionTextEn,
            questionTextHi: q.questionTextHi,
            topic: q.topic,
            optionsEn: q.optionsEn
          },
          [...questions, ...toAdd]
        );

        if (bankCheck.hasPotentialDuplicate) {
          skipped += 1;
          return;
        }

        // 2. Zero-Repeat Persistent Registry Check
        const usageCheck = checkQuestionUsageStatus(q, q.examType, reg);
        if (usageCheck.isUsed) {
          skipped += 1;
          return;
        }
      }

      // 3. Normalized Fingerprint & Verification Metadata
      const fingerprint = q.fingerprint || generateQuestionFingerprint(q);
      const isApproved = asPending ? false : (q.isApproved !== false);
      if (!isApproved) {
        pendingCount += 1;
      }

      const finalized: Question = {
        ...q,
        fingerprint,
        isApproved,
        sourceInfo: q.sourceInfo ? {
          ...q.sourceInfo,
          verificationStatus: isApproved ? 'Verified' : 'Pending Verification'
        } : undefined
      };

      toAdd.push(finalized);
      added += 1;
    });

    if (toAdd.length > 0) {
      setQuestions(prev => [...toAdd, ...prev]);
    }

    return { added, skipped, pendingCount };
  }, [questions]);

  // Admin: Export Questions JSON
  const exportQuestionsJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `principal_portal_questions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [questions]);

  const value = {
    questions,
    activeExam,
    setActiveExam,
    languageMode,
    setLanguageMode,
    session,
    currentQuestions,
    currentQuestion,
    currentQuestionState,
    examConfigs,
    updateExamConfig,
    resetExamConfigsToDefault,
    checkBankAvailability,
    startTest,
    autoGenerate120Pool,
    autoGenerateAndLaunch120Test,
    selectOption,
    clearOption,
    toggleMarkForReview,
    saveAndNext,
    markAndNext,
    previousQuestion,
    nextQuestion,
    jumpToQuestion,
    submitTest,
    cancelTest,
    clearActiveSession,
    resetExamUsage,
    getUsageStats,
    importUsageHistory,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    approveQuestion,
    bulkApproveQuestions,
    resetQuestionsToDefault,
    importQuestions,
    exportQuestionsJSON,
    resultSummary,
    pinnedQuestionIds,
    pinnedQuestions,
    togglePinQuestion,
    isQuestionPinned,
    clearAllPinned
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
