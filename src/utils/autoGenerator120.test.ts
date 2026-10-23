import { generateChunkQuestions, executeAuto120Generation } from './autoMockPoolGenerator';
import { generateMockTest } from './testGeneratorEngine';
import { getRegistryStats, commitMockTestUsage, loadUsageRegistry, resetUsageRegistry } from './questionUsageRegistry';
import { Question, ExamType } from '../types/quiz';

console.log('==================================================');
console.log('VERIFYING 4-CHUNK AUTO-GENERATOR & 120-Q STRICT SELECTION');
console.log('==================================================');

// Test 1: Generate 4 chunks of 30 bilingual questions
const targetExam: ExamType = 'upsc-principal';
const existingIds = new Set<string>();
const timestamp = Date.now();
const pool: Question[] = [];

for (let c = 0; c < 4; c++) {
  const chunk = generateChunkQuestions(targetExam, c, existingIds, timestamp);
  console.log(`Chunk ${c + 1}: Generated ${chunk.length} questions`);
  if (chunk.length !== 30) {
    throw new Error(`Expected 30 questions in chunk ${c + 1}, got ${chunk.length}`);
  }
  pool.push(...chunk);
}

console.log(`Total generated across 4 chunks: ${pool.length}`);
if (pool.length !== 120) {
  throw new Error(`Expected exactly 120 questions, got ${pool.length}`);
}

// Verify uniqueness of all 120 generated questions
const uniqueIds = new Set(pool.map(q => q.id));
if (uniqueIds.size !== 120) {
  throw new Error(`Duplicate IDs detected in generated pool: ${uniqueIds.size} unique vs 120 total`);
}
console.log('✅ PASSED: All 120 questions are completely unique in ID');

// Verify bilingual completeness
pool.forEach((q, idx) => {
  if (!q.questionTextEn || !q.questionTextHi) {
    throw new Error(`Question ${idx + 1} missing bilingual text`);
  }
  if (!Array.isArray(q.optionsEn) || q.optionsEn.length !== 4 || !Array.isArray(q.optionsHi) || q.optionsHi.length !== 4) {
    throw new Error(`Question ${idx + 1} does not have 4 bilingual options`);
  }
  if (q.correctOptionIndex < 0 || q.correctOptionIndex > 3) {
    throw new Error(`Question ${idx + 1} has invalid correctOptionIndex`);
  }
});
console.log('✅ PASSED: All 120 questions have valid bilingual texts, 4 options, and correct answers');

// Test 2: generateMockTest selects strictly 120 questions
const genResult = generateMockTest(
  {
    examType: targetExam,
    targetCount: 120,
    durationMinutes: 120,
    isPracticeMode: false,
    difficultyPreset: 'standard',
    testTitle: 'Test Full Simulation',
    enforceZeroRepeat: true
  },
  pool
);

if (!genResult.success) {
  throw new Error(`Mock test generation failed: ${genResult.shortfallReason}`);
}

if (!genResult.selectedQuestions || genResult.selectedQuestions.length !== 120) {
  throw new Error(`Expected exactly 120 selected questions, got ${genResult.selectedQuestions?.length}`);
}
console.log(`✅ PASSED: generateMockTest strictly selected exactly 120 questions (denominator 120)`);

// Test 3: UP Aided Principal 4 chunks (30 Qs x 4 chunks = 120 Qs)
const upExam: ExamType = 'up-aided-principal';
const upIds = new Set<string>();
const upPool: Question[] = [];
for (let c = 0; c < 4; c++) {
  const chunk = generateChunkQuestions(upExam, c, upIds, timestamp + 1000);
  upPool.push(...chunk);
}

if (upPool.length !== 120) {
  throw new Error(`Expected 120 UP questions, got ${upPool.length}`);
}

const upGenResult = generateMockTest(
  {
    examType: upExam,
    targetCount: 120,
    durationMinutes: 120,
    isPracticeMode: false,
    difficultyPreset: 'standard',
    testTitle: 'UP Inter College Principal Full Simulation',
    enforceZeroRepeat: true
  },
  upPool
);

if (!upGenResult.success || !upGenResult.selectedQuestions || upGenResult.selectedQuestions.length !== 120) {
  throw new Error(`Expected 120 UP selected questions, got ${upGenResult.selectedQuestions?.length}`);
}
console.log(`✅ PASSED: UP Inter College Principal strictly selected exactly 120 questions`);

console.log('==================================================');
console.log('ALL AUTO-GENERATOR 120-QUESTION TESTS PASSED! 🎯');
console.log('==================================================');
