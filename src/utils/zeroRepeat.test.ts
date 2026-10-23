import { strict as assert } from 'assert';
import { generateMockTest } from './testGeneratorEngine';
import {
  loadUsageRegistry,
  resetUsageRegistry,
  commitMockTestUsage,
  getRemainingEligibleQuestions,
  getRegistryStats
} from './questionUsageRegistry';
import { INITIAL_QUESTIONS } from '../data/seedQuestions';

console.log('==================================================');
console.log('RUNNING AUTOMATED TEST CASES FOR ZERO-REPEAT ENGINE');
console.log('==================================================');

// Clear test registry for fresh run
resetUsageRegistry();

const upscQuestions = INITIAL_QUESTIONS.filter(q => q.examType === 'upsc-principal');
console.log(`\nUPSC Bank has ${upscQuestions.length} approved questions.`);

// 1. Generate First Test (120 Questions)
console.log('\n--- Step 1: Generating Mock Test #1 (120 Questions) ---');
const test1 = generateMockTest(
  {
    examType: 'upsc-principal',
    targetCount: 120,
    durationMinutes: 120,
    isPracticeMode: false,
    difficultyPreset: 'standard',
    enforceZeroRepeat: true
  },
  upscQuestions
);

assert(test1.success, 'Mock Test #1 should generate successfully');
assert(test1.selectedQuestions && test1.selectedQuestions.length === 120, 'Test #1 must have exactly 120 questions');
assert(test1.testRecord, 'Test #1 must provide a testRecord');
console.log(`✅ Test #1 Generated with ID: ${test1.testRecord.testId}`);

// Verify questions in Test #1 are distinct
const set1Ids = new Set(test1.selectedQuestions.map(q => q.id));
assert.strictEqual(set1Ids.size, 120, 'Test #1 questions must be unique');

// Commit Test #1
commitMockTestUsage(test1.testRecord, test1.selectedQuestions);
console.log('✅ Test #1 committed to persistent Zero-Repeat registry.');

// Verify stats after Test #1
const statsAfter1 = getRegistryStats('upsc-principal', upscQuestions);
console.log(`Stats after Test #1: Total: ${statsAfter1.totalInBank}, Used: ${statsAfter1.usedCount}, Unused: ${statsAfter1.eligibleRemaining}`);
assert.strictEqual(statsAfter1.usedCount, 120, 'Used count must be 120');
assert(statsAfter1.eligibleRemaining <= upscQuestions.length - 120, 'Unused count must reflect remaining bank after conceptual duplicate filtering');

// 2. Generate Practice Test with Remaining Questions (Strict Zero-Repeat)
console.log('\n--- Step 2: Generating Practice Test from Remaining Eligible Questions ---');
const remainingEligible = getRemainingEligibleQuestions('upsc-principal', upscQuestions);
console.log(`Remaining eligible unique questions: ${remainingEligible.length}`);

// Ensure NONE of the remaining questions appeared in Test #1
for (const q of remainingEligible) {
  assert(!set1Ids.has(q.id), `Question ${q.id} was in Test #1 but appeared in eligible remaining list!`);
}
console.log('✅ ZERO-REPEAT VERIFIED: 0% overlap with Test #1.');

// 3. Generate Custom Practice Test #2
const test2 = generateMockTest(
  {
    examType: 'upsc-principal',
    targetCount: Math.min(15, remainingEligible.length),
    durationMinutes: 15,
    isPracticeMode: true,
    difficultyPreset: 'standard',
    enforceZeroRepeat: true
  },
  upscQuestions
);

assert(test2.success, 'Test #2 should generate successfully');
const set2Ids = new Set(test2.selectedQuestions?.map(q => q.id) || []);

// Verify absolute zero repeat between Test #1 and Test #2
for (const qId of set2Ids) {
  assert(!set1Ids.has(qId), `Question ${qId} repeated between Test #1 and Test #2!`);
}
console.log(`✅ ZERO REPEAT ACROSS TESTS VERIFIED: Exactly 0 questions repeated between Test #1 and Test #2!`);

// Commit Test #2
commitMockTestUsage(test2.testRecord!, test2.selectedQuestions!);
const statsAfter2 = getRegistryStats('upsc-principal', upscQuestions);
assert.strictEqual(statsAfter2.usedCount, 120 + test2.selectedQuestions!.length, 'Used count updated');

// 4. Test Reset Functionality
console.log('\n--- Step 4: Testing Usage Registry Reset ---');
resetUsageRegistry('upsc-principal');
const statsAfterReset = getRegistryStats('upsc-principal', upscQuestions);
assert.strictEqual(statsAfterReset.usedCount, 0, 'Used count must reset to 0');
assert.strictEqual(statsAfterReset.eligibleRemaining, upscQuestions.length, 'All questions must become eligible again');
console.log('✅ Usage Registry Reset successfully restored all questions to eligible status.');

console.log('\n==================================================');
console.log('ALL ZERO-REPEAT ENGINE TESTS PASSED! 🎯');
console.log('==================================================');
