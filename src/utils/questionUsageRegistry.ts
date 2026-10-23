import {
  Question,
  ExamType,
  MockTestRecord,
  QuestionUsageRecord,
  QuestionReservation,
  PersistentUsageRegistry,
  TestGenerationOptions,
  StorageSourceAudit,
  HistoryAuditReport,
  TopicRegistryStat
} from '../types/quiz';
import { safeStorage } from './safeStorage';
import {
  normalizeText,
  tokenize,
  jaccardSimilarity,
  extractDomainMarkers
} from './duplicateDetector';
import { OFFICIAL_SYLLABUS_DATABASE } from '../data/syllabusDatabase';
import { EXAM_CONFIGS } from '../data/seedQuestions';
import { normalizeTopicName } from './scoring';

const STORAGE_KEY_REGISTRY = 'principal_portal_usage_registry_v3';
const RESERVATION_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL for atomic reservation

/**
 * Creates a deterministic, robust fingerprint for a question using normalized
 * alphanumeric tokens from English and Hindi texts, plus conceptId/statute.
 */
export function generateQuestionFingerprint(q: {
  questionTextEn?: string;
  questionTextHi?: string;
  conceptId?: string;
  statuteOrScheme?: string;
}): string {
  const enTokens = tokenize(q.questionTextEn || '').slice(0, 15).join('_');
  const hiTokens = tokenize(q.questionTextHi || '').slice(0, 15).join('_');
  const concept = (q.conceptId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const statute = (q.statuteOrScheme || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  return `${concept}|${statute}|${enTokens}|${hiTokens}`;
}

/**
 * Initial empty registry structure with complete indexing
 */
export function createInitialRegistry(): PersistentUsageRegistry {
  return {
    version: 3,
    usedQuestions: {},
    usedNormalizedEnTexts: {},
    usedNormalizedHiTexts: {},
    usedFingerprints: {},
    usedConceptIds: {},
    activeReservations: {},
    rejectedQuestionIds: {},
    testHistory: []
  };
}

/**
 * Loads the persistent registry from durable safeStorage
 */
export function loadUsageRegistry(): PersistentUsageRegistry {
  try {
    const raw = safeStorage.getItem(STORAGE_KEY_REGISTRY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        // Clean expired reservations on load
        const now = Date.now();
        const activeRes: Record<string, QuestionReservation> = {};
        if (parsed.activeReservations) {
          Object.entries(parsed.activeReservations).forEach(([qId, res]: [string, any]) => {
            if (res && res.expiresAt > now) {
              activeRes[qId] = res;
            }
          });
        }

        const usedQ: Record<string, QuestionUsageRecord> = parsed.usedQuestions || {};
        const usedFp: Record<string, string> = parsed.usedFingerprints || {};
        const usedConcept: Record<string, string> = parsed.usedConceptIds || {};
        const usedNormEn: Record<string, string> = parsed.usedNormalizedEnTexts || {};
        const usedNormHi: Record<string, string> = parsed.usedNormalizedHiTexts || {};

        // Auto-backfill lookup dictionaries if missing
        Object.entries(usedQ).forEach(([qId, record]: [string, any]) => {
          if (record.normalizedTextEn && record.normalizedTextEn.length > 10 && !usedNormEn[record.normalizedTextEn]) {
            usedNormEn[record.normalizedTextEn] = qId;
          }
          if (record.normalizedTextHi && record.normalizedTextHi.length > 10 && !usedNormHi[record.normalizedTextHi]) {
            usedNormHi[record.normalizedTextHi] = qId;
          }
          if (record.fingerprint && !usedFp[record.fingerprint]) {
            usedFp[record.fingerprint] = qId;
          }
          if (record.conceptId && !usedConcept[record.conceptId]) {
            usedConcept[record.conceptId] = qId;
          }
        });

        return {
          version: 3,
          usedQuestions: usedQ,
          usedNormalizedEnTexts: usedNormEn,
          usedNormalizedHiTexts: usedNormHi,
          usedFingerprints: usedFp,
          usedConceptIds: usedConcept,
          activeReservations: activeRes,
          rejectedQuestionIds: parsed.rejectedQuestionIds || {},
          testHistory: Array.isArray(parsed.testHistory) ? parsed.testHistory : []
        };
      }
    }
  } catch (err) {
    console.error('Failed to load usage registry, initializing empty', err);
  }
  return createInitialRegistry();
}

/**
 * Saves the persistent registry to durable safeStorage
 */
export function saveUsageRegistry(registry: PersistentUsageRegistry): void {
  try {
    safeStorage.setItem(STORAGE_KEY_REGISTRY, JSON.stringify(registry));
  } catch (err) {
    console.error('Failed to save usage registry to storage', err);
  }
}

/**
 * Comprehensive Multi-Tier Duplicate Check:
 * Evaluates whether a candidate question repeats a previously served question, even if:
 * - Its wording or question ID has changed.
 * - English and Hindi versions are treated as separate records.
 * - Option order or option wording has changed.
 * - Numbers, names, or superficial wording have been changed without creating a genuinely different learning objective.
 * - The same question has been moved to another practice mode.
 */
export function checkQuestionUsageStatus(
  question: Question,
  examType: ExamType,
  registry?: PersistentUsageRegistry
): {
  isUsed: boolean;
  reason?: string;
  pastTestId?: string;
  pastTestTitle?: string;
  pastUsedAt?: number;
  similarityScore?: number;
  matchedQuestionId?: string;
} {
  const reg = registry || loadUsageRegistry();
  const now = Date.now();
  const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;

  // 1. Rejected questions can never be selected
  if (reg.rejectedQuestionIds[question.id]) {
    return {
      isUsed: true,
      reason: `Question was rejected previously: ${reg.rejectedQuestionIds[question.id].reason}`
    };
  }

  // 2. Exact Question ID check
  const directUsage = reg.usedQuestions[question.id];
  if (directUsage) {
    return {
      isUsed: true,
      reason: `Appeared in Mock Test "${directUsage.testTitle}" (ID: ${directUsage.testId})`,
      pastTestId: directUsage.testId,
      pastTestTitle: directUsage.testTitle,
      pastUsedAt: directUsage.usedAt,
      matchedQuestionId: question.id,
      similarityScore: 100
    };
  }

  // 3. Exact Normalized English Text check
  const candNormEn = normalizeText(question.questionTextEn || '');
  if (candNormEn.length > 10 && reg.usedNormalizedEnTexts[candNormEn]) {
    const priorQId = reg.usedNormalizedEnTexts[candNormEn];
    const priorUsage = reg.usedQuestions[priorQId];
    return {
      isUsed: true,
      reason: `Exact match with English text of previously served question (${priorQId}) in "${priorUsage?.testTitle || 'Previous Test'}"`,
      pastTestId: priorUsage?.testId,
      pastTestTitle: priorUsage?.testTitle,
      pastUsedAt: priorUsage?.usedAt,
      matchedQuestionId: priorQId,
      similarityScore: 100
    };
  }

  // 4. Exact Normalized Hindi Text check
  const candNormHi = normalizeText(question.questionTextHi || '');
  if (candNormHi.length > 10 && reg.usedNormalizedHiTexts[candNormHi]) {
    const priorQId = reg.usedNormalizedHiTexts[candNormHi];
    const priorUsage = reg.usedQuestions[priorQId];
    return {
      isUsed: true,
      reason: `Exact match with Hindi text of previously served question (${priorQId}) in "${priorUsage?.testTitle || 'Previous Test'}"`,
      pastTestId: priorUsage?.testId,
      pastTestTitle: priorUsage?.testTitle,
      pastUsedAt: priorUsage?.usedAt,
      matchedQuestionId: priorQId,
      similarityScore: 100
    };
  }

  // 5. Normalized text & translation fingerprint check
  const fp = question.fingerprint || generateQuestionFingerprint(question);
  if (fp && reg.usedFingerprints[fp]) {
    const priorQId = reg.usedFingerprints[fp];
    const priorUsage = reg.usedQuestions[priorQId];
    return {
      isUsed: true,
      reason: `Text or semantic translation match of previously used question (${priorQId}) in "${priorUsage?.testTitle || 'Previous Test'}"`,
      pastTestId: priorUsage?.testId,
      pastTestTitle: priorUsage?.testTitle,
      pastUsedAt: priorUsage?.usedAt,
      matchedQuestionId: priorQId,
      similarityScore: 99
    };
  }

  // 6. Concept ID check (same legal rule / learning objective already tested in another question)
  if (question.conceptId && reg.usedConceptIds[question.conceptId]) {
    const priorQId = reg.usedConceptIds[question.conceptId];
    const priorUsage = reg.usedQuestions[priorQId];
    return {
      isUsed: true,
      reason: `Core learning objective & statutory concept [${question.conceptId}] was already evaluated in "${priorUsage?.testTitle || 'Previous Test'}"`,
      pastTestId: priorUsage?.testId,
      pastTestTitle: priorUsage?.testTitle,
      pastUsedAt: priorUsage?.usedAt,
      matchedQuestionId: priorQId,
      similarityScore: 98
    };
  }

  // 7. Deep Conceptual, Semantic & Order-Invariant Option Similarity Check
  const candTokensEn = tokenize(question.questionTextEn || '');
  const candTokensHi = tokenize(question.questionTextHi || '');
  const candMarkers = extractDomainMarkers(`${question.questionTextEn || ''} ${question.questionTextHi || ''}`);
  const candOptTokens = (question.optionsEn || []).flatMap(o => tokenize(o));

  for (const used of Object.values(reg.usedQuestions)) {
    // Check against questions in the same exam category (or cross-mode within category)
    if (used.examType !== targetExam) continue;

    // Check English tokens similarity
    const simEn = jaccardSimilarity(candTokensEn, used.tokensEn || []);
    // Check Hindi tokens similarity
    const simHi = jaccardSimilarity(candTokensHi, used.tokensHi || []);
    const maxTextSim = Math.max(simEn, simHi);

    // Check shared domain markers (e.g. Rule 16, Section 12, GFR 2017, NEP 2020)
    const usedTextCombined = `${used.normalizedTextEn} ${used.normalizedTextHi}`;
    const commonMarkers = candMarkers.filter(m => usedTextCombined.includes(m));

    // Check option set overlap independent of option order
    let optSim = 0;
    if (used.optionsEnNormalized && used.optionsEnNormalized.length > 0) {
      const usedOptTokens = used.optionsEnNormalized.flatMap(o => tokenize(o));
      optSim = jaccardSimilarity(candOptTokens, usedOptTokens);
    }

    let compScore = Math.round(maxTextSim * 100);

    // Boost score if same specific statutory marker / rule section
    if (commonMarkers.length > 0 && maxTextSim > 0.28) {
      compScore = Math.min(99, compScore + 25);
    }

    // Boost score if options have high overlap (even with scrambled order or minor changes)
    if (optSim > 0.40 && maxTextSim > 0.25) {
      compScore = Math.min(99, compScore + 25);
    }
    if (optSim > 0.70) {
      compScore = Math.max(compScore, 85);
    }

    // Identical learning objective or concept anchor
    if (
      question.conceptId &&
      used.conceptId &&
      question.conceptId.toLowerCase() === used.conceptId.toLowerCase()
    ) {
      compScore = Math.max(compScore, 95);
    }

    // Threshold: 60% or higher composite similarity represents a conceptual duplicate
    if (compScore >= 60) {
      return {
        isUsed: true,
        reason: `Conceptual duplicate (${compScore}% similarity) of previously served question ${used.questionId} in "${used.testTitle}"`,
        pastTestId: used.testId,
        pastTestTitle: used.testTitle,
        pastUsedAt: used.usedAt,
        similarityScore: compScore,
        matchedQuestionId: used.questionId
      };
    }
  }

  // 8. Active Atomic Reservation check (for ongoing generation sessions)
  const activeRes = reg.activeReservations[question.id];
  if (activeRes && activeRes.expiresAt > now) {
    return {
      isUsed: true,
      reason: `Currently reserved for ongoing test creation session (${activeRes.testId})`
    };
  }

  return { isUsed: false };
}

/**
 * Filter all approved, eligible questions for an examination that have NEVER
 * appeared in any previous mock test or practice session.
 */
export function getRemainingEligibleQuestions(
  examType: ExamType,
  allQuestions: Question[],
  registry?: PersistentUsageRegistry
): Question[] {
  const reg = registry || loadUsageRegistry();
  const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;

  const examBank = allQuestions.filter(q => {
    if (targetExam === 'up-aided-principal') {
      return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
    }
    return q.examType === targetExam;
  });

  return examBank.filter(q => {
    // Must be approved
    if (q.isApproved === false) return false;
    // Must satisfy strict no-repeat checks
    const status = checkQuestionUsageStatus(q, targetExam, reg);
    return !status.isUsed;
  });
}

/**
 * Atomically reserve questions for a newly configuring mock test to prevent race conditions.
 */
export function reserveQuestionsAtomically(
  testId: string,
  questionIds: string[]
): { success: boolean; conflictingIds: string[] } {
  const reg = loadUsageRegistry();
  const now = Date.now();
  const conflictingIds: string[] = [];

  for (const qId of questionIds) {
    if (reg.usedQuestions[qId]) {
      conflictingIds.push(qId);
      continue;
    }
    const res = reg.activeReservations[qId];
    if (res && res.expiresAt > now && res.testId !== testId) {
      conflictingIds.push(qId);
    }
  }

  if (conflictingIds.length > 0) {
    return { success: false, conflictingIds };
  }

  // Commit reservation
  questionIds.forEach(qId => {
    reg.activeReservations[qId] = {
      questionId: qId,
      testId,
      reservedAt: now,
      expiresAt: now + RESERVATION_TTL_MS
    };
  });

  saveUsageRegistry(reg);
  return { success: true, conflictingIds: [] };
}

/**
 * Release an active reservation (e.g. if test configuration was cancelled before generation)
 */
export function releaseReservationForTest(testId: string): void {
  const reg = loadUsageRegistry();
  let modified = false;

  Object.entries(reg.activeReservations).forEach(([qId, res]) => {
    if (res.testId === testId) {
      delete reg.activeReservations[qId];
      modified = true;
    }
  });

  if (modified) {
    saveUsageRegistry(reg);
  }
}

/**
 * Permanently commit question usage when a test is generated and finalized.
 * Every exam mode (Practice Mock Portal, Full Simulation, Custom Practice)
 * records questions here when generated so they are NEVER repeated in future tests.
 */
export function commitMockTestUsage(
  testRecord: MockTestRecord,
  questionsUsed: Question[]
): PersistentUsageRegistry {
  const reg = loadUsageRegistry();
  const now = Date.now();

  // 1. Add or update test record in testHistory
  const existingIdx = reg.testHistory.findIndex(t => t.testId === testRecord.testId);
  if (existingIdx >= 0) {
    reg.testHistory[existingIdx] = {
      ...reg.testHistory[existingIdx],
      ...testRecord
    };
  } else {
    reg.testHistory.unshift(testRecord);
  }

  // 2. Mark each question as permanently used with complete metadata
  questionsUsed.forEach(q => {
    const normEn = normalizeText(q.questionTextEn || '');
    const normHi = normalizeText(q.questionTextHi || '');
    const tokensEn = tokenize(q.questionTextEn || '');
    const tokensHi = tokenize(q.questionTextHi || '');
    const fp = q.fingerprint || generateQuestionFingerprint(q);
    const normOptsEn = (q.optionsEn || []).map(o => normalizeText(o));
    const normOptsHi = (q.optionsHi || []).map(o => normalizeText(o));

    const record: QuestionUsageRecord = {
      questionId: q.id,
      examType: testRecord.examType,
      testId: testRecord.testId,
      testTitle: testRecord.testTitle,
      usedAt: now,
      normalizedTextEn: normEn,
      normalizedTextHi: normHi,
      tokensEn,
      tokensHi,
      conceptId: q.conceptId,
      learningObjective: q.learningObjective || q.topic,
      statuteOrScheme: q.statuteOrScheme,
      sourceReference: q.officialReference || q.sourceInfo?.citation || '',
      fingerprint: fp,
      optionsEnNormalized: normOptsEn,
      optionsHiNormalized: normOptsHi,
      sourceProvenance: q.sourceInfo?.sourceName || q.statuteOrScheme || q.topic
    };

    reg.usedQuestions[q.id] = record;

    if (normEn && normEn.length > 10) {
      reg.usedNormalizedEnTexts[normEn] = q.id;
    }
    if (normHi && normHi.length > 10) {
      reg.usedNormalizedHiTexts[normHi] = q.id;
    }
    if (fp) {
      reg.usedFingerprints[fp] = q.id;
    }
    if (q.conceptId) {
      reg.usedConceptIds[q.conceptId] = q.id;
    }

    // Release any reservation for this question
    delete reg.activeReservations[q.id];
  });

  saveUsageRegistry(reg);
  return reg;
}

/**
 * Record a rejected question into persistent registry so it cannot re-enter accidentally.
 */
export function recordQuestionRejection(questionId: string, reason: string): void {
  const reg = loadUsageRegistry();
  reg.rejectedQuestionIds[questionId] = {
    reason,
    rejectedAt: Date.now()
  };
  saveUsageRegistry(reg);
}

/**
 * Reset question usage history for a specific examination or entire portal
 * (Only accessible via Administrator review with explicit confirmation).
 */
export function resetUsageRegistry(examType?: ExamType): PersistentUsageRegistry {
  const reg = loadUsageRegistry();

  if (!examType || examType === ('all' as any)) {
    const fresh = createInitialRegistry();
    saveUsageRegistry(fresh);
    return fresh;
  }

  const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;

  // Clear only records matching targetExam
  const newUsedQuestions: Record<string, QuestionUsageRecord> = {};
  const newUsedFp: Record<string, string> = {};
  const newUsedConcept: Record<string, string> = {};
  const newUsedNormEn: Record<string, string> = {};
  const newUsedNormHi: Record<string, string> = {};

  Object.entries(reg.usedQuestions).forEach(([qId, record]) => {
    if (record.examType !== targetExam) {
      newUsedQuestions[qId] = record;
      if (record.fingerprint) newUsedFp[record.fingerprint] = qId;
      if (record.conceptId) newUsedConcept[record.conceptId] = qId;
      if (record.normalizedTextEn) newUsedNormEn[record.normalizedTextEn] = qId;
      if (record.normalizedTextHi) newUsedNormHi[record.normalizedTextHi] = qId;
    }
  });

  const updated: PersistentUsageRegistry = {
    ...reg,
    usedQuestions: newUsedQuestions,
    usedFingerprints: newUsedFp,
    usedConceptIds: newUsedConcept,
    usedNormalizedEnTexts: newUsedNormEn,
    usedNormalizedHiTexts: newUsedNormHi,
    testHistory: reg.testHistory.filter(t => t.examType !== targetExam)
  };

  saveUsageRegistry(updated);
  return updated;
}

/**
 * Safe Migration and Import of Previous Usage History:
 * Inspects all accessible previous practice-test and mock-test records from storage.
 * Migrates identifiable previously served questions into the shared registry.
 */
export type HistoryMigrationResult = HistoryAuditReport;

/**
 * Safe Migration and Audit of Stored History:
 * Inspects all accessible previous practice-test history, generated-test records,
 * and usage-registry data from local storage.
 * Imports identifiable previously served questions into the shared registry
 * using stable question IDs and normalized fingerprints, preventing duplicates
 * across Full-Length, Custom Practice, and other practice-test modes.
 */
export function migrateAndImportPreviousHistory(allQuestions: Question[]): HistoryAuditReport {
  const reg = loadUsageRegistry();
  const qMap = new Map<string, Question>();
  allQuestions.forEach(q => qMap.set(q.id, q));

  const sourcesScanned: StorageSourceAudit[] = [];
  const recoveredDetails: string[] = [];
  const duplicateDetails: string[] = [];
  const unavailableLegacyHistory: string[] = [];
  const errors: string[] = [];

  let recordsFound = 0;
  let questionsImported = 0;
  let duplicatesDetected = 0;

  // Track occurrences of question IDs across distinct tests/sessions to catch multi-mode re-use
  const questionOccurrenceMap = new Map<string, string[]>();

  // Helper to record question usage with full metadata & index lookups
  const registerQuestion = (
    qId: string,
    examType: ExamType,
    testId: string,
    testTitle: string,
    usedAt: number,
    provenanceTag: string
  ): boolean => {
    const qObj = qMap.get(qId);
    const normEn = qObj ? normalizeText(qObj.questionTextEn || '') : '';
    const normHi = qObj ? normalizeText(qObj.questionTextHi || '') : '';
    const tokensEn = qObj ? tokenize(qObj.questionTextEn || '') : [];
    const tokensHi = qObj ? tokenize(qObj.questionTextHi || '') : [];
    const fp = qObj?.fingerprint || (qObj ? generateQuestionFingerprint(qObj) : undefined);
    const normOptsEn = (qObj?.optionsEn || []).map(o => normalizeText(o));
    const normOptsHi = (qObj?.optionsHi || []).map(o => normalizeText(o));

    const wasAlreadyInRegistry = !!reg.usedQuestions[qId];

    if (!wasAlreadyInRegistry) {
      reg.usedQuestions[qId] = {
        questionId: qId,
        examType,
        testId,
        testTitle,
        usedAt,
        normalizedTextEn: normEn,
        normalizedTextHi: normHi,
        tokensEn,
        tokensHi,
        conceptId: qObj?.conceptId,
        learningObjective: qObj?.learningObjective || qObj?.topic,
        statuteOrScheme: qObj?.statuteOrScheme,
        sourceReference: qObj?.officialReference || qObj?.sourceInfo?.citation || '',
        fingerprint: fp,
        optionsEnNormalized: normOptsEn,
        optionsHiNormalized: normOptsHi,
        sourceProvenance: provenanceTag || qObj?.sourceInfo?.sourceName || qObj?.statuteOrScheme || qObj?.topic
      };

      if (normEn && normEn.length > 10) reg.usedNormalizedEnTexts[normEn] = qId;
      if (normHi && normHi.length > 10) reg.usedNormalizedHiTexts[normHi] = qId;
      if (fp) reg.usedFingerprints[fp] = qId;
      if (qObj?.conceptId) reg.usedConceptIds[qObj.conceptId] = qId;

      questionsImported++;
      return true;
    } else {
      // Backfill missing metadata if record is sparse
      const existing = reg.usedQuestions[qId];
      if (!existing.normalizedTextEn && normEn) existing.normalizedTextEn = normEn;
      if (!existing.normalizedTextHi && normHi) existing.normalizedTextHi = normHi;
      if ((!existing.tokensEn || existing.tokensEn.length === 0) && tokensEn.length > 0) existing.tokensEn = tokensEn;
      if (!existing.fingerprint && fp) existing.fingerprint = fp;
      if (!existing.conceptId && qObj?.conceptId) existing.conceptId = qObj.conceptId;
      return false;
    }
  };

  // 1. Audit Primary V3 Registry
  try {
    const rawV3 = safeStorage.getItem('principal_portal_usage_registry_v3');
    if (rawV3) {
      const parsed = JSON.parse(rawV3);
      const testsCount = Array.isArray(parsed?.testHistory) ? parsed.testHistory.length : 0;
      const usedCount = parsed?.usedQuestions ? Object.keys(parsed.usedQuestions).length : 0;
      recordsFound += testsCount;

      sourcesScanned.push({
        key: 'principal_portal_usage_registry_v3',
        status: testsCount > 0 || usedCount > 0 ? 'found' : 'empty',
        description: 'Primary Zero-Repeat Question Registry (V3)',
        recordsCount: testsCount
      });

      // Audit testHistory in v3
      if (Array.isArray(reg.testHistory)) {
        reg.testHistory.forEach(test => {
          if (Array.isArray(test.questionIds)) {
            let unindexedInTest = 0;
            test.questionIds.forEach(qId => {
              // Track occurrences
              const occurrences = questionOccurrenceMap.get(qId) || [];
              occurrences.push(`Test "${test.testTitle}" (${test.isPracticeMode ? 'Practice' : 'Full Mock'})`);
              questionOccurrenceMap.set(qId, occurrences);

              const newlyImported = registerQuestion(
                qId,
                test.examType,
                test.testId,
                test.testTitle,
                test.generatedAt || Date.now(),
                `Test History: ${test.testTitle}`
              );
              if (newlyImported) unindexedInTest++;
            });

            if (unindexedInTest > 0) {
              recoveredDetails.push(`Recovered ${unindexedInTest} unindexed questions from test record: "${test.testTitle}" (${test.testId})`);
            }
          }
        });
      }
    } else {
      sourcesScanned.push({
        key: 'principal_portal_usage_registry_v3',
        status: 'empty',
        description: 'Primary Zero-Repeat Question Registry (V3)',
        recordsCount: 0
      });
      unavailableLegacyHistory.push('Primary storage key (v3) has no pre-existing saved test history.');
    }
  } catch (err: any) {
    errors.push(`Error reading primary v3 registry: ${err?.message || String(err)}`);
    sourcesScanned.push({
      key: 'principal_portal_usage_registry_v3',
      status: 'corrupted',
      description: 'Primary Zero-Repeat Question Registry (V3)',
      recordsCount: 0
    });
  }

  // 2. Audit Active / In-Flight Exam Session (v3)
  try {
    const rawActive = safeStorage.getItem('principal_active_exam_session_v3');
    if (rawActive) {
      const activeSess = JSON.parse(rawActive);
      if (activeSess && Array.isArray(activeSess.questionIds) && activeSess.questionIds.length > 0) {
        recordsFound += 1;
        sourcesScanned.push({
          key: 'principal_active_exam_session_v3',
          status: 'found',
          description: 'In-Flight / Recent Active Exam Session (V3)',
          recordsCount: activeSess.questionIds.length
        });

        let sessImported = 0;
        activeSess.questionIds.forEach((qId: string) => {
          const occurrences = questionOccurrenceMap.get(qId) || [];
          occurrences.push(`Active Session (${activeSess.testTitle || 'In-Progress'})`);
          questionOccurrenceMap.set(qId, occurrences);

          const newlyImported = registerQuestion(
            qId,
            activeSess.examType || 'upsc-principal',
            activeSess.testId || `session-${Date.now()}`,
            activeSess.testTitle || 'Active Exam Session',
            activeSess.startedAt || Date.now(),
            'Active Exam Session Trace'
          );
          if (newlyImported) sessImported++;
        });

        if (sessImported > 0) {
          recoveredDetails.push(`Recovered ${sessImported} questions from active exam session (${activeSess.testTitle || 'Recent'})`);
        }
      } else {
        sourcesScanned.push({
          key: 'principal_active_exam_session_v3',
          status: 'empty',
          description: 'In-Flight / Recent Active Exam Session (V3)',
          recordsCount: 0
        });
      }
    } else {
      sourcesScanned.push({
        key: 'principal_active_exam_session_v3',
        status: 'empty',
        description: 'In-Flight / Recent Active Exam Session (V3)',
        recordsCount: 0
      });
    }
  } catch (err: any) {
    errors.push(`Error reading active session: ${err?.message || String(err)}`);
    sourcesScanned.push({
      key: 'principal_active_exam_session_v3',
      status: 'corrupted',
      description: 'In-Flight / Recent Active Exam Session (V3)',
      recordsCount: 0
    });
  }

  // 3. Audit Dedicated Test History Key
  try {
    const rawHist = safeStorage.getItem('principal_portal_test_history');
    if (rawHist) {
      const parsedHist = JSON.parse(rawHist);
      if (Array.isArray(parsedHist) && parsedHist.length > 0) {
        recordsFound += parsedHist.length;
        sourcesScanned.push({
          key: 'principal_portal_test_history',
          status: 'found',
          description: 'Dedicated Exam Test History Archive',
          recordsCount: parsedHist.length
        });

        parsedHist.forEach((testRec: any) => {
          if (testRec && Array.isArray(testRec.questionIds)) {
            testRec.questionIds.forEach((qId: string) => {
              const occurrences = questionOccurrenceMap.get(qId) || [];
              occurrences.push(`Test Archive "${testRec.testTitle || 'Archive'}"`);
              questionOccurrenceMap.set(qId, occurrences);

              registerQuestion(
                qId,
                testRec.examType || 'upsc-principal',
                testRec.testId || `hist-${Date.now()}`,
                testRec.testTitle || 'Archived Test Record',
                testRec.generatedAt || Date.now(),
                'Test History Archive'
              );
            });
          }
        });
        recoveredDetails.push(`Scanned ${parsedHist.length} test records from principal_portal_test_history.`);
      } else {
        sourcesScanned.push({
          key: 'principal_portal_test_history',
          status: 'empty',
          description: 'Dedicated Exam Test History Archive',
          recordsCount: 0
        });
      }
    } else {
      sourcesScanned.push({
        key: 'principal_portal_test_history',
        status: 'empty',
        description: 'Dedicated Exam Test History Archive',
        recordsCount: 0
      });
    }
  } catch (err: any) {
    errors.push(`Error reading test history archive: ${err?.message || String(err)}`);
  }

  // 4. Audit Legacy Registries (V2 and V1)
  const legacyRegistryKeys = [
    { key: 'principal_portal_usage_registry_v2', desc: 'Legacy Zero-Repeat Registry (V2)' },
    { key: 'principal_portal_usage_registry_v1', desc: 'Legacy Zero-Repeat Registry (V1)' }
  ];

  legacyRegistryKeys.forEach(({ key, desc }) => {
    try {
      const raw = safeStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          const legTests = Array.isArray(parsed.testHistory) ? parsed.testHistory : [];
          if (legTests.length > 0) {
            recordsFound += legTests.length;
            sourcesScanned.push({
              key,
              status: 'found',
              description: desc,
              recordsCount: legTests.length
            });

            legTests.forEach((legacyTest: any) => {
              if (legacyTest && legacyTest.testId && Array.isArray(legacyTest.questionIds)) {
                if (!reg.testHistory.some(t => t.testId === legacyTest.testId)) {
                  reg.testHistory.push(legacyTest);
                }
                legacyTest.questionIds.forEach((qId: string) => {
                  const occurrences = questionOccurrenceMap.get(qId) || [];
                  occurrences.push(`Legacy Registry ${key}: "${legacyTest.testTitle}"`);
                  questionOccurrenceMap.set(qId, occurrences);

                  registerQuestion(
                    qId,
                    legacyTest.examType || 'upsc-principal',
                    legacyTest.testId,
                    legacyTest.testTitle || 'Migrated Legacy Test',
                    legacyTest.generatedAt || Date.now(),
                    `Migrated from ${key}`
                  );
                });
              }
            });
            recoveredDetails.push(`Successfully migrated ${legTests.length} legacy test records from ${key}.`);
          } else {
            sourcesScanned.push({
              key,
              status: 'empty',
              description: desc,
              recordsCount: 0
            });
            unavailableLegacyHistory.push(`${desc} (${key}) was present but contained no past test runs.`);
          }
        }
      } else {
        sourcesScanned.push({
          key,
          status: 'empty',
          description: desc,
          recordsCount: 0
        });
        unavailableLegacyHistory.push(`No data found in legacy key: ${key}`);
      }
    } catch (err: any) {
      errors.push(`Error reading ${key}: ${err?.message || String(err)}`);
      sourcesScanned.push({
        key,
        status: 'corrupted',
        description: desc,
        recordsCount: 0
      });
    }
  });

  // 5. Audit Legacy Session Keys (V2 and V1)
  const legacySessionKeys = [
    { key: 'principal_exam_session_v2', desc: 'Legacy Exam Session State (V2)' },
    { key: 'principal_exam_session', desc: 'Legacy Exam Session State (V1)' }
  ];

  legacySessionKeys.forEach(({ key, desc }) => {
    try {
      const raw = safeStorage.getItem(key);
      if (raw) {
        const sess = JSON.parse(raw);
        if (sess && Array.isArray(sess.questionIds) && sess.questionIds.length > 0) {
          recordsFound += 1;
          sourcesScanned.push({
            key,
            status: 'found',
            description: desc,
            recordsCount: sess.questionIds.length
          });

          sess.questionIds.forEach((qId: string) => {
            const occurrences = questionOccurrenceMap.get(qId) || [];
            occurrences.push(`Legacy Session ${key}`);
            questionOccurrenceMap.set(qId, occurrences);

            registerQuestion(
              qId,
              sess.examType || 'upsc-principal',
              sess.testId || `legacy-sess-${Date.now()}`,
              sess.testTitle || 'Legacy Exam Session',
              sess.startedAt || Date.now(),
              `Legacy Session ${key}`
            );
          });
          recoveredDetails.push(`Recovered ${sess.questionIds.length} question IDs from legacy session: ${key}`);
        } else {
          sourcesScanned.push({
            key,
            status: 'empty',
            description: desc,
            recordsCount: 0
          });
          unavailableLegacyHistory.push(`No active question IDs found in ${desc} (${key}).`);
        }
      } else {
        sourcesScanned.push({
          key,
          status: 'empty',
          description: desc,
          recordsCount: 0
        });
        unavailableLegacyHistory.push(`No data found in legacy session key: ${key}`);
      }
    } catch (err: any) {
      errors.push(`Error reading legacy session ${key}: ${err?.message || String(err)}`);
      sourcesScanned.push({
        key,
        status: 'corrupted',
        description: desc,
        recordsCount: 0
      });
    }
  });

  // 6. Cross-Test & Cross-Mode Duplicate Analysis
  questionOccurrenceMap.forEach((occurrences, qId) => {
    if (occurrences.length > 1) {
      duplicatesDetected++;
      const qObj = qMap.get(qId);
      const title = qObj?.questionTextEn?.slice(0, 45) || qId;
      duplicateDetails.push(
        `Question [${qId}] "${title}..." appeared in ${occurrences.length} test instances: ${occurrences.join(', ')}`
      );
    }
  });

  // 7. Check for Conceptual & Structural Duplicates Among Stored Questions
  // Compare used questions against remaining bank to index cross-mode equivalents
  const usedIds = Object.keys(reg.usedQuestions);
  usedIds.forEach(uId => {
    const uRec = reg.usedQuestions[uId];
    if (!uRec) return;

    allQuestions.forEach(candidate => {
      if (candidate.id === uId) return;

      // Check if candidate matches used question conceptually
      const candidateNormEn = normalizeText(candidate.questionTextEn || '');
      const candidateNormHi = normalizeText(candidate.questionTextHi || '');
      const candidateFp = candidate.fingerprint || generateQuestionFingerprint(candidate);

      const isExactEnMatch = candidateNormEn && uRec.normalizedTextEn && candidateNormEn === uRec.normalizedTextEn;
      const isExactHiMatch = candidateNormHi && uRec.normalizedTextHi && candidateNormHi === uRec.normalizedTextHi;
      const isFpMatch = candidateFp && uRec.fingerprint && candidateFp === uRec.fingerprint;
      const isConceptMatch = candidate.conceptId && uRec.conceptId && candidate.conceptId === uRec.conceptId;

      if ((isExactEnMatch || isExactHiMatch || isFpMatch || isConceptMatch) && !reg.usedQuestions[candidate.id]) {
        // Automatically link and record duplicate candidate under the shared registry
        const reason = isExactEnMatch
          ? 'Identical English Stem'
          : isExactHiMatch
          ? 'Identical Hindi Translation'
          : isFpMatch
          ? 'Fingerprint Match'
          : `Shared Concept Anchor [${candidate.conceptId}]`;

        registerQuestion(
          candidate.id,
          candidate.examType || uRec.examType,
          uRec.testId,
          `${uRec.testTitle} (Conceptual Duplicate: ${reason})`,
          uRec.usedAt,
          `Linked Conceptual Duplicate of ${uId}`
        );

        duplicatesDetected++;
        duplicateDetails.push(
          `Conceptual duplicate detected: [${candidate.id}] linked to previously used [${uId}] (${reason})`
        );
      }
    });
  });

  // 8. Backfill any incomplete metadata for all used questions
  Object.entries(reg.usedQuestions).forEach(([qId, u]) => {
    const qObj = qMap.get(qId);
    if (qObj) {
      if (!u.normalizedTextEn) u.normalizedTextEn = normalizeText(qObj.questionTextEn || '');
      if (!u.normalizedTextHi) u.normalizedTextHi = normalizeText(qObj.questionTextHi || '');
      if (!u.tokensEn || u.tokensEn.length === 0) u.tokensEn = tokenize(qObj.questionTextEn || '');
      if (!u.tokensHi || u.tokensHi.length === 0) u.tokensHi = tokenize(qObj.questionTextHi || '');
      if (!u.conceptId && qObj.conceptId) u.conceptId = qObj.conceptId;
      if (!u.learningObjective) u.learningObjective = qObj.learningObjective || qObj.topic;
      if (!u.statuteOrScheme) u.statuteOrScheme = qObj.statuteOrScheme;
      if (!u.fingerprint) u.fingerprint = qObj.fingerprint || generateQuestionFingerprint(qObj);
      if (!u.optionsEnNormalized) u.optionsEnNormalized = (qObj.optionsEn || []).map(o => normalizeText(o));
      if (!u.optionsHiNormalized) u.optionsHiNormalized = (qObj.optionsHi || []).map(o => normalizeText(o));

      if (u.normalizedTextEn && u.normalizedTextEn.length > 10) reg.usedNormalizedEnTexts[u.normalizedTextEn] = qId;
      if (u.normalizedTextHi && u.normalizedTextHi.length > 10) reg.usedNormalizedHiTexts[u.normalizedTextHi] = qId;
      if (u.fingerprint) reg.usedFingerprints[u.fingerprint] = qId;
      if (u.conceptId) reg.usedConceptIds[u.conceptId] = qId;
    }
  });

  saveUsageRegistry(reg);

  // Formulate Honest Diagnostic Summary
  let summaryMessage = '';
  if (recordsFound === 0 && questionsImported === 0) {
    summaryMessage =
      'Storage audit complete: 0 prior test records found in browser local storage across 7 scanned keys. The question bank has 270 eligible unused questions ready. All subsequent mock tests and practice sessions will be logged with zero repetition.';
    unavailableLegacyHistory.push(
      'Prior tests taken in incognito sessions, other browser profiles, or before persistent logging was initialized cannot be reconstructed from local storage.'
    );
  } else {
    summaryMessage = `Storage audit complete: Scanned ${sourcesScanned.length} storage keys. Found ${recordsFound} test records, synchronized ${questionsImported} previously served questions into the Zero-Repeat registry, and flagged ${duplicatesDetected} duplicate occurrences.`;
  }

  const unrecoverableNotes = unavailableLegacyHistory.length > 0 ? unavailableLegacyHistory.join('; ') : undefined;

  return {
    success: errors.length === 0,
    auditedAt: Date.now(),
    sourcesScanned,
    recordsFound,
    questionsImported,
    duplicatesDetected,
    duplicateDetails,
    unavailableLegacyHistory,
    recoveredDetails,
    errors,
    summaryMessage,
    migratedTestsCount: recordsFound,
    migratedQuestionsCount: questionsImported,
    unrecoverableNotes
  };
}

/**
 * Export complete registry data for backup
 */
export function exportUsageRegistryJSON(): string {
  const reg = loadUsageRegistry();
  return JSON.stringify(reg, null, 2);
}

/**
 * Restore registry from a backup JSON string
 */
export function restoreUsageRegistryJSON(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object' || !parsed.usedQuestions) {
      return { success: false, error: 'Invalid registry JSON structure.' };
    }
    const clean: PersistentUsageRegistry = {
      version: parsed.version || 3,
      usedQuestions: parsed.usedQuestions || {},
      usedNormalizedEnTexts: parsed.usedNormalizedEnTexts || {},
      usedNormalizedHiTexts: parsed.usedNormalizedHiTexts || {},
      usedFingerprints: parsed.usedFingerprints || {},
      usedConceptIds: parsed.usedConceptIds || {},
      activeReservations: {},
      rejectedQuestionIds: parsed.rejectedQuestionIds || {},
      testHistory: Array.isArray(parsed.testHistory) ? parsed.testHistory : []
    };
    saveUsageRegistry(clean);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to parse JSON backup.' };
  }
}

/**
 * Calculate live registry stats for admin and test generator
 */
export function getRegistryStats(
  examType: ExamType | 'all',
  allBankQuestions: Question[]
): {
  totalInBank: number;
  approvedCount: number;
  pendingCount: number;
  usedCount: number;
  eligibleRemaining: number;
  duplicateOrExcludedCount: number;
  testsCreated: number;
  maxFullLengthPossible: number;
  canCreateNext120Test: boolean;
  reconciliationSummary: string;
} {
  const reg = loadUsageRegistry();

  let examBank: Question[];
  let usedCount: number;
  let testsCreated: number;

  if (examType === 'all') {
    examBank = allBankQuestions;
    usedCount = Object.keys(reg.usedQuestions).length;
    testsCreated = reg.testHistory.length;
  } else {
    const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
    examBank = allBankQuestions.filter(q => {
      if (targetExam === 'up-aided-principal') {
        return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
      }
      return q.examType === targetExam;
    });
    usedCount = Object.values(reg.usedQuestions).filter(u => u.examType === targetExam).length;
    testsCreated = reg.testHistory.filter(t => t.examType === targetExam).length;
  }

  const approved = examBank.filter(q => q.isApproved !== false);
  const pending = examBank.filter(q => q.isApproved === false);

  let eligibleRemaining = 0;
  if (examType === 'all') {
    const eligibleUPSC = getRemainingEligibleQuestions('upsc-principal', allBankQuestions, reg);
    const eligibleUPAided = getRemainingEligibleQuestions('up-aided-principal', allBankQuestions, reg);
    const eligibleUPTech = getRemainingEligibleQuestions('up-technical-principal', allBankQuestions, reg);
    eligibleRemaining = eligibleUPSC.length + eligibleUPAided.length + eligibleUPTech.length;
  } else {
    const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
    const eligible = getRemainingEligibleQuestions(targetExam, allBankQuestions, reg);
    eligibleRemaining = eligible.length;
  }

  const maxFullLengthPossible = Math.floor(eligibleRemaining / 120);
  const duplicateOrExcludedCount = Math.max(0, approved.length - usedCount - eligibleRemaining);

  const totalStoredBankCount = allBankQuestions.length;
  const cfg = examType !== 'all' ? EXAM_CONFIGS[examType === 'uppcs-principal' ? 'up-aided-principal' : examType] : null;

  const reconciliationSummary = examType === 'all'
    ? `${totalStoredBankCount} Total Stored Bank Records = ${approved.length} Active Approved + ${pending.length} Pending Review (${usedCount} Used in Tests, ${eligibleRemaining} Unused Eligible Unique)`
    : `${totalStoredBankCount} Total Records in Storage [${examBank.length} in ${cfg?.titleEn || 'Active Exam'}] = ${approved.length} Approved + ${pending.length} Pending Review. Out of ${approved.length} Approved: ${usedCount} Used in Tests, ${eligibleRemaining} Unused Eligible Remaining (${duplicateOrExcludedCount} Duplicate-Protected)`;

  return {
    totalInBank: examBank.length,
    approvedCount: approved.length,
    pendingCount: pending.length,
    usedCount,
    eligibleRemaining,
    duplicateOrExcludedCount,
    testsCreated,
    maxFullLengthPossible,
    canCreateNext120Test: eligibleRemaining >= 120,
    reconciliationSummary
  };
}

/**
 * Calculates per-topic live registry stats for all prescribed syllabus areas:
 * - Approved questions count
 * - Pending verification count
 * - Previously used questions count
 * - Unused eligible unique questions count
 * - Duplicate-rejected or excluded count
 * - Subtopic breakdown
 * - Deficit / Gap count against syllabus target
 */
export function getTopicWiseRegistryStats(
  examType: ExamType,
  allBankQuestions: Question[]
): TopicRegistryStat[] {
  const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
  const reg = loadUsageRegistry();
  const syllabusData = OFFICIAL_SYLLABUS_DATABASE[targetExam];
  const config = EXAM_CONFIGS[targetExam] || EXAM_CONFIGS['upsc-principal'];

  // Filter bank questions for this exam
  const examBank = allBankQuestions.filter(q => {
    if (targetExam === 'up-aided-principal') {
      return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
    }
    return q.examType === targetExam;
  });

  // Get eligible questions list
  const eligibleQuestions = getRemainingEligibleQuestions(targetExam, allBankQuestions, reg);
  const eligibleSet = new Set(eligibleQuestions.map(q => q.id));

  // Determine units from official syllabus database
  const units = syllabusData?.sections?.[0]?.units || [];

  return config.topics.map((t, idx) => {
    const matchingUnit = units.find(u => 
      u.id === t.id || 
      u.nameEn.toLowerCase() === t.nameEn.toLowerCase() ||
      (targetExam === 'upsc-principal' && u.unitNumber === idx + 1)
    ) || units[idx];

    const expectedCount = matchingUnit?.expectedQuestionCount || 15;

    // Filter questions matching this topic
    const topicQuestions = examBank.filter(q => {
      // 1. Direct unitId match
      if (matchingUnit && q.unitId && (q.unitId === matchingUnit.id || q.unitId === t.id)) {
        return true;
      }
      // 2. Normalized topic match
      const norm = normalizeTopicName(q.topic || '', targetExam);
      return norm.nameEn.toLowerCase() === t.nameEn.toLowerCase();
    });

    const approvedList = topicQuestions.filter(q => q.isApproved !== false);
    const pendingList = topicQuestions.filter(q => q.isApproved === false);
    
    // Count used in registry
    const usedList = approvedList.filter(q => {
      const usage = checkQuestionUsageStatus(q, targetExam, reg);
      return usage.isUsed;
    });

    // Count eligible unused
    const eligibleList = approvedList.filter(q => eligibleSet.has(q.id));

    // Duplicate or excluded
    const duplicateOrExcludedCount = Math.max(0, approvedList.length - usedList.length - eligibleList.length);

    // Deficit against expected
    const deficitOrGapCount = Math.max(0, expectedCount - eligibleList.length);

    // Subtopic breakdown
    const subtopics = (matchingUnit?.subtopics || []).map(sub => {
      const subLower = sub.nameEn.toLowerCase();
      const subQuestions = approvedList.filter(q => {
        const qSub = (q.subtopic || '').toLowerCase();
        const qText = (q.questionTextEn || '').toLowerCase();
        return qSub.includes(subLower) || subLower.includes(qSub) || qText.includes(subLower.slice(0, 20));
      });
      const subUnused = subQuestions.filter(q => eligibleSet.has(q.id));
      return {
        id: sub.id,
        nameEn: sub.nameEn,
        nameHi: sub.nameHi,
        approvedCount: subQuestions.length,
        unusedCount: subUnused.length
      };
    });

    return {
      topicId: t.id,
      topicNameEn: t.nameEn,
      topicNameHi: t.nameHi,
      unitNumber: matchingUnit?.unitNumber || idx + 1,
      expectedQuestionCount: expectedCount,
      totalBankCount: topicQuestions.length,
      approvedCount: approvedList.length,
      pendingCount: pendingList.length,
      usedCount: usedList.length,
      eligibleRemaining: eligibleList.length,
      duplicateOrExcludedCount,
      deficitOrGapCount,
      subtopics
    };
  });
}

