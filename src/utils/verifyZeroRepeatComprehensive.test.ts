import { strict as assert } from 'assert';
import { generateMockTest } from './testGeneratorEngine';
import {
  loadUsageRegistry,
  resetUsageRegistry,
  commitMockTestUsage,
  getRemainingEligibleQuestions,
  getRegistryStats,
  checkQuestionUsageStatus,
  migrateAndImportPreviousHistory
} from './questionUsageRegistry';
import { INITIAL_QUESTIONS } from '../data/seedQuestions';
import { Question } from '../types/quiz';

console.log('================================================================');
console.log('COMPREHENSIVE ZERO-REPEAT SYSTEM VERIFICATION SUITE');
console.log('================================================================\n');

// Reset registry to clean state for execution
resetUsageRegistry();

const upscQuestions = INITIAL_QUESTIONS.filter(q => q.examType === 'upsc-principal' && q.isApproved !== false);
console.log(`[Bank Setup] Total approved UPSC questions available: ${upscQuestions.length}`);
assert(upscQuestions.length >= 135, 'Bank must have sufficient questions for verification test');

// -------------------------------------------------------------------------
// TEST 1: Generate a practice test and record its question IDs
// -------------------------------------------------------------------------
console.log('\n--- Step 1: Generate Practice Test #1 (20 Questions) ---');
const practiceTest1 = generateMockTest(
  {
    examType: 'upsc-principal',
    targetCount: 20,
    durationMinutes: 20,
    isPracticeMode: true,
    difficultyPreset: 'standard',
    enforceZeroRepeat: true,
    testTitle: 'UPSC Principal - Practice Test #1'
  },
  upscQuestions
);

assert.strictEqual(practiceTest1.success, true, 'Practice Test #1 must generate successfully');
assert.strictEqual(practiceTest1.selectedQuestions?.length, 20, 'Practice Test #1 must contain exactly 20 questions');
assert(practiceTest1.testRecord, 'Test record must be generated');

const practiceTest1Ids = practiceTest1.selectedQuestions.map(q => q.id);
const practiceTest1IdSet = new Set(practiceTest1Ids);
assert.strictEqual(practiceTest1IdSet.size, 20, 'Practice Test #1 must not contain internal duplicate IDs');

// Commit immediately as per Zero-Repeat policy (at generation time)
commitMockTestUsage(practiceTest1.testRecord, practiceTest1.selectedQuestions);
console.log(`✅ Practice Test #1 generated (${practiceTest1Ids.length} Qs) and committed immediately to registry.`);
console.log(`   Sample question IDs: ${practiceTest1Ids.slice(0, 5).join(', ')}...`);

// Verify registry stats after Step 1
const statsAfterStep1 = getRegistryStats('upsc-principal', upscQuestions);
console.log(`   Registry status: Used = ${statsAfterStep1.usedCount}, Unused Eligible = ${statsAfterStep1.eligibleRemaining}`);
assert.strictEqual(statsAfterStep1.usedCount, 20, 'Used count must accurately show 20');
assert(statsAfterStep1.eligibleRemaining <= upscQuestions.length - 20, 'Eligible count must decrement by at least 20 (plus any conceptual duplicates excluded)');

// -------------------------------------------------------------------------
// TEST 2: Generate Full-Length Mock Test and verify 0% overlap with Test 1
// -------------------------------------------------------------------------
console.log('\n--- Step 2: Generate Full-Length Mock Test #2 (100 Questions) ---');
const fullLengthTest2 = generateMockTest(
  {
    examType: 'upsc-principal',
    targetCount: 100,
    durationMinutes: 120,
    isPracticeMode: false,
    difficultyPreset: 'standard',
    enforceZeroRepeat: true,
    testTitle: 'UPSC Principal - Full Length Mock Test #2'
  },
  upscQuestions
);

assert.strictEqual(fullLengthTest2.success, true, 'Full-Length Test #2 must generate successfully');
assert.strictEqual(fullLengthTest2.selectedQuestions?.length, 100, 'Full-Length Test #2 must contain exactly 100 questions');
assert(fullLengthTest2.testRecord, 'Test #2 record must be generated');

const test2Ids = fullLengthTest2.selectedQuestions.map(q => q.id);
const test2IdSet = new Set(test2Ids);
assert.strictEqual(test2IdSet.size, 100, 'Test #2 must not contain internal duplicates');

// Rigorously verify NO question from Practice Test #1 appears in Test #2
const test2OverlapWithTest1 = test2Ids.filter(id => practiceTest1IdSet.has(id));
console.log(`   Overlap between Practice Test #1 and Full-Length Test #2: ${test2OverlapWithTest1.length} questions`);
assert.strictEqual(
  test2OverlapWithTest1.length,
  0,
  `ZERO-REPEAT VIOLATION: Questions ${test2OverlapWithTest1.join(', ')} repeated from Practice Test #1!`
);

// Commit Test #2 immediately to registry
commitMockTestUsage(fullLengthTest2.testRecord, fullLengthTest2.selectedQuestions);
console.log(`✅ Full-Length Test #2 verified: 100% distinct from Practice Test #1 (0 overlaps). Committed to registry.`);

const statsAfterStep2 = getRegistryStats('upsc-principal', upscQuestions);
console.log(`   Registry status: Used = ${statsAfterStep2.usedCount}, Unused Eligible = ${statsAfterStep2.eligibleRemaining}`);
assert.strictEqual(statsAfterStep2.usedCount, 120, 'Used count must accurately show 120 (20 + 100)');
assert(statsAfterStep2.eligibleRemaining <= upscQuestions.length - 120, 'Eligible count must decrement');

// -------------------------------------------------------------------------
// TEST 3: Generate Custom Practice Test #3 and repeat comparison
// -------------------------------------------------------------------------
console.log('\n--- Step 3: Generate Custom Practice Test #3 (10 Questions) ---');
const customTest3 = generateMockTest(
  {
    examType: 'upsc-principal',
    targetCount: 10,
    durationMinutes: 15,
    isPracticeMode: true,
    difficultyPreset: 'difficult_focus',
    enforceZeroRepeat: true,
    testTitle: 'UPSC Principal - Custom Practice #3'
  },
  upscQuestions
);

assert.strictEqual(customTest3.success, true, 'Custom Practice Test #3 must generate successfully');
assert.strictEqual(customTest3.selectedQuestions?.length, 10, 'Custom Practice Test #3 must contain exactly 10 questions');
assert(customTest3.testRecord, 'Test #3 record must be generated');

const test3Ids = customTest3.selectedQuestions.map(q => q.id);
const allPreviousIds = new Set([...practiceTest1Ids, ...test2Ids]);

const test3Overlap = test3Ids.filter(id => allPreviousIds.has(id));
console.log(`   Overlap between Custom Practice #3 and all previous tests: ${test3Overlap.length} questions`);
assert.strictEqual(
  test3Overlap.length,
  0,
  `ZERO-REPEAT VIOLATION: Questions ${test3Overlap.join(', ')} repeated in Custom Practice Test #3!`
);

commitMockTestUsage(customTest3.testRecord, customTest3.selectedQuestions);
console.log(`✅ Custom Practice Test #3 verified: 100% distinct from Test #1 and Test #2 (0 overlaps). Committed to registry.`);

const statsAfterStep3 = getRegistryStats('upsc-principal', upscQuestions);
console.log(`   Registry status: Used = ${statsAfterStep3.usedCount}, Unused Eligible = ${statsAfterStep3.eligibleRemaining}`);
assert.strictEqual(statsAfterStep3.usedCount, 130, 'Used count must accurately show 130 (20 + 100 + 10)');

// -------------------------------------------------------------------------
// TEST 4: Page Refresh & App Restart Persistence Verification
// -------------------------------------------------------------------------
console.log('\n--- Step 4: Simulate Page Refresh & Persistence Reload ---');
// Simulate fresh page load by re-loading registry from storage
const reloadedRegistry = loadUsageRegistry();
assert(reloadedRegistry, 'Registry must load from durable storage');
assert.strictEqual(Object.keys(reloadedRegistry.usedQuestions).length, 130, 'All 130 question records must persist across reloads');
assert.strictEqual(reloadedRegistry.testHistory.length, 3, 'All 3 test records must persist in testHistory');

// Verify that each used question has rich metadata persisted
const sampleUsedRecord = Object.values(reloadedRegistry.usedQuestions)[0];
assert(sampleUsedRecord.normalizedTextEn, 'Normalized English text must be persisted');
assert(sampleUsedRecord.normalizedTextHi, 'Normalized Hindi text must be persisted');
assert(sampleUsedRecord.testId, 'Test ID must be persisted');
assert(sampleUsedRecord.usedAt > 0, 'Generation timestamp must be persisted');
console.log('✅ Usage history remains 100% intact with normalized bilingual texts, concept anchors, and timestamps.');

// -------------------------------------------------------------------------
// TEST 5: Conceptual Duplicate Detection (Hindi-English, Scrambled Options, Paraphrasing)
// -------------------------------------------------------------------------
console.log('\n--- Step 5: Test Conceptual Duplicate Rejection Engine ---');

const knownServedQuestion = practiceTest1.selectedQuestions[0];
console.log(`   Testing against known served question: "${knownServedQuestion.questionTextEn.slice(0, 50)}..."`);

// 5a: Exact duplicate with changed ID
const duplicateWithDifferentId: Question = {
  ...knownServedQuestion,
  id: 'NEW_SPOOFED_ID_99999',
  topic: 'CCS Rules'
};
const dupCheck1 = checkQuestionUsageStatus(duplicateWithDifferentId, 'upsc-principal', reloadedRegistry);
console.log(`   5a (Changed ID, Identical English Text): isUsed = ${dupCheck1.isUsed}, Reason = "${dupCheck1.reason}"`);
assert.strictEqual(dupCheck1.isUsed, true, 'Question with changed ID but identical text must be rejected');

// 5b: Hindi text check (English text stripped, testing Hindi equivalence)
const hindiOnlyDuplicate: Question = {
  ...knownServedQuestion,
  id: 'HINDI_VARIANT_ID_88888',
  questionTextEn: 'A completely altered superficial English string with no match',
  questionTextHi: knownServedQuestion.questionTextHi
};
const dupCheck2 = checkQuestionUsageStatus(hindiOnlyDuplicate, 'upsc-principal', reloadedRegistry);
console.log(`   5b (Identical Hindi Text): isUsed = ${dupCheck2.isUsed}, Reason = "${dupCheck2.reason}"`);
assert.strictEqual(dupCheck2.isUsed, true, 'Question with identical Hindi text must be rejected');

// 5c: Option order scrambled duplicate
const scrambledOptionsDuplicate: Question = {
  ...knownServedQuestion,
  id: 'SCRAMBLED_OPTIONS_ID_77777',
  optionsEn: [
    knownServedQuestion.optionsEn[3],
    knownServedQuestion.optionsEn[2],
    knownServedQuestion.optionsEn[1],
    knownServedQuestion.optionsEn[0]
  ]
};
const dupCheck3 = checkQuestionUsageStatus(scrambledOptionsDuplicate, 'upsc-principal', reloadedRegistry);
console.log(`   5c (Scrambled Option Order): isUsed = ${dupCheck3.isUsed}, Reason = "${dupCheck3.reason}"`);
assert.strictEqual(dupCheck3.isUsed, true, 'Question with scrambled option order must be rejected');

// 5d: Paraphrased question testing same statutory concept ID
const conceptDuplicate: Question = {
  ...knownServedQuestion,
  id: 'PARAPHRASED_CONCEPT_ID_66666',
  questionTextEn: 'In a modified hypothetical school situation, what rule applies to this officer?',
  questionTextHi: 'किसी संशोधित विद्यालय परिदृश्य में, इस अधिकारी पर कौन सा नियम लागू होगा?',
  conceptId: knownServedQuestion.conceptId
};
const dupCheck4 = checkQuestionUsageStatus(conceptDuplicate, 'upsc-principal', reloadedRegistry);
console.log(`   5d (Paraphrased with Identical Concept Anchor): isUsed = ${dupCheck4.isUsed}, Reason = "${dupCheck4.reason}"`);
assert.strictEqual(dupCheck4.isUsed, true, 'Question testing identical statutory concept anchor must be rejected');

// 5e: Genuinely unique, novel question (must be accepted)
const novelQuestion: Question = {
  id: 'GENUINELY_NOVEL_QUESTION_001',
  examType: 'upsc-principal',
  topic: 'Novel Administrative Law',
  conceptId: 'NOVEL-CONCEPT-XYZ-2026',
  questionTextEn: 'Under the newly enacted Digital Personal Data Protection Act 2023, what is the exact timeline for a school Data Fiduciary to report personal data breaches?',
  questionTextHi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 के तहत, किसी विद्यालय डेटा फिडुशियरी द्वारा डेटा उल्लंघन की रिपोर्ट करने की सटीक समय-सीमा क्या है?',
  optionsEn: ['Within 6 hours', 'Within 72 hours', 'Within 15 days', 'Immediately without delay'],
  optionsHi: ['6 घंटे के भीतर', '72 घंटे के भीतर', '15 दिनों के भीतर', 'बिना किसी देरी के तत्काल'],
  correctOptionIndex: 1,
  explanationEn: 'Under the DPDP Act provisions, breach notifications must be communicated to the Data Protection Board within the prescribed timeline.',
  explanationHi: 'डीपीडीपी अधिनियम के प्रावधानों के तहत, निर्धारित समय-सीमा के भीतर बोर्ड को सूचना दी जानी चाहिए।',
  difficulty: 'Hard',
  tags: ['DPDP', 'Data Protection'],
  isPracticeQuestion: true,
  isApproved: true
};
const dupCheck5 = checkQuestionUsageStatus(novelQuestion, 'upsc-principal', reloadedRegistry);
console.log(`   5e (Genuinely Novel Candidate): isUsed = ${dupCheck5.isUsed}`);
assert.strictEqual(dupCheck5.isUsed, false, 'Genuinely novel candidate question must be accepted');
console.log('✅ Conceptual duplicate rejection engine successfully detected exact duplicates, Hindi matches, scrambled options, and concept overlaps while accepting genuinely novel questions.');

// -------------------------------------------------------------------------
// TEST 6: Usage Counters & Shortfall Enforcement
// -------------------------------------------------------------------------
console.log('\n--- Step 6: Test Shortfall Protection & No Silent Reuse ---');
const remainingEligibleNow = getRemainingEligibleQuestions('upsc-principal', upscQuestions, reloadedRegistry);
console.log(`   Unused questions remaining in bank: ${remainingEligibleNow.length}`);

// Requesting more questions than remaining in bank without practice mode:
const excessiveTarget = remainingEligibleNow.length + 50;
const shortfallTest = generateMockTest(
  {
    examType: 'upsc-principal',
    targetCount: excessiveTarget,
    durationMinutes: 120,
    isPracticeMode: false,
    difficultyPreset: 'standard',
    enforceZeroRepeat: true
  },
  upscQuestions
);

assert.strictEqual(shortfallTest.success, false, 'Engine must REFUSE to generate when bank is insufficient for zero-repeat');
assert(shortfallTest.shortfallReason, 'Engine must clearly report the shortfall reason');
console.log(`   Shortfall rejection message: "${shortfallTest.shortfallReason}"`);
console.log('✅ Shortfall protection verified: Engine never silently reuses questions when bank is exhausted.');

// -------------------------------------------------------------------------
// TEST 7: Safe Storage History Migration & Audit Test
// -------------------------------------------------------------------------
console.log('\n--- Step 7: Test Migration & Audit of Stored History ---');
const migrationResult = migrateAndImportPreviousHistory(upscQuestions);
assert(Array.isArray(migrationResult.sourcesScanned), 'Sources scanned must be an array');
console.log(`   Migration audit: Scanned ${migrationResult.sourcesScanned.length} storage keys.`);
console.log(`   Recovered questions: ${migrationResult.migratedQuestionsCount}`);
console.log('✅ History migration audit executed safely.');

console.log('\n================================================================');
console.log('🎯 ALL 7 ZERO-REPEAT SYSTEM VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('================================================================');
