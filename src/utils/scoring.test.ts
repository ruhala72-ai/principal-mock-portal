import { evaluateExamSession } from './scoring';
import { EXAM_CONFIGS, INITIAL_QUESTIONS } from '../data/seedQuestions';
import { Question } from '../types/quiz';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('==================================================');
console.log('RUNNING AUTOMATED TEST CASES FOR MOCK TEST SCORING');
console.log('Marking Scheme: +2.5 per correct, -2.5/3 per incorrect, 0 for unanswered');
console.log('==================================================');

const upscConfig = EXAM_CONFIGS['upsc-principal'];
const allUpscQuestions = INITIAL_QUESTIONS.filter(q => q.examType === 'upsc-principal');

console.log(`\nUPSC Question Bank Size: ${allUpscQuestions.length} questions available`);
assert(allUpscQuestions.length >= 120, `Expected at least 120 UPSC questions, got ${allUpscQuestions.length}`);

// Check uniqueness of IDs
const uniqueIds = new Set(allUpscQuestions.map(q => q.id));
assert(uniqueIds.size === allUpscQuestions.length, `All ${allUpscQuestions.length} UPSC questions must have unique IDs (got ${uniqueIds.size} unique)`);

// -----------------------------------------------------------------
// TEST CASE 1: 3 Correct + 5 Incorrect (8-Question Benchmark)
// -----------------------------------------------------------------
console.log('\n--- Test Case 1: 3 Correct + 5 Incorrect (8-question benchmark) ---');
const eightQuestions = allUpscQuestions.slice(0, 8);
const answers3c5i: Record<string, number> = {};
// 3 correct
answers3c5i[eightQuestions[0].id] = eightQuestions[0].correctOptionIndex;
answers3c5i[eightQuestions[1].id] = eightQuestions[1].correctOptionIndex;
answers3c5i[eightQuestions[2].id] = eightQuestions[2].correctOptionIndex;
// 5 incorrect
answers3c5i[eightQuestions[3].id] = (eightQuestions[3].correctOptionIndex + 1) % 4;
answers3c5i[eightQuestions[4].id] = (eightQuestions[4].correctOptionIndex + 1) % 4;
answers3c5i[eightQuestions[5].id] = (eightQuestions[5].correctOptionIndex + 1) % 4;
answers3c5i[eightQuestions[6].id] = (eightQuestions[6].correctOptionIndex + 1) % 4;
answers3c5i[eightQuestions[7].id] = (eightQuestions[7].correctOptionIndex + 1) % 4;

const result3c5i = evaluateExamSession(eightQuestions, answers3c5i, upscConfig);

console.log('Result for 3C + 5I:');
console.log(`  Total Questions: ${result3c5i.totalQuestions}`);
console.log(`  Attempted: ${result3c5i.attempted}`);
console.log(`  Correct: ${result3c5i.correctCount}`);
console.log(`  Incorrect: ${result3c5i.incorrectCount}`);
console.log(`  Unanswered: ${result3c5i.unansweredCount}`);
console.log(`  Earned Marks: ${result3c5i.earnedMarks}`);
console.log(`  Negative Marks: ${result3c5i.negativeMarks}`);
console.log(`  Total Score: ${result3c5i.totalScore} / ${result3c5i.maxScore}`);
console.log(`  Percentage: ${result3c5i.percentage}%`);

assert(result3c5i.maxScore === 20, `Max score should be 20, got ${result3c5i.maxScore}`);
assert(result3c5i.correctCount === 3, `Correct count should be 3, got ${result3c5i.correctCount}`);
assert(result3c5i.incorrectCount === 5, `Incorrect count should be 5, got ${result3c5i.incorrectCount}`);
assert(result3c5i.earnedMarks === 7.5, `Earned marks should be 7.5, got ${result3c5i.earnedMarks}`);
assert(result3c5i.negativeMarks === 4.17, `Negative marks should be 4.17 (5 * 2.5/3 rounded), got ${result3c5i.negativeMarks}`);
assert(result3c5i.totalScore === 3.33, `Total score should be 3.33, got ${result3c5i.totalScore}`);
assert(result3c5i.percentage === 16.67, `Percentage should be 16.67%, got ${result3c5i.percentage}`);

// Check topic scores sum up to overall score
const sumTopicScores3c5i = Number(result3c5i.topics.reduce((acc, t) => acc + t.score, 0).toFixed(2));
console.log(`  Sum of Topic Scores: ${sumTopicScores3c5i}, Overall Total Score: ${result3c5i.totalScore}`);
assert(sumTopicScores3c5i === result3c5i.totalScore, `Topic scores (${sumTopicScores3c5i}) must exactly sum to overall score (${result3c5i.totalScore})`);

// -----------------------------------------------------------------
// TEST CASE 2: All Correct (8-Question)
// -----------------------------------------------------------------
console.log('\n--- Test Case 2: All Correct (8 Questions) ---');
const answersAllCorrect: Record<string, number> = {};
eightQuestions.forEach(q => {
  answersAllCorrect[q.id] = q.correctOptionIndex;
});

const resultAllCorrect = evaluateExamSession(eightQuestions, answersAllCorrect, upscConfig);
assert(resultAllCorrect.correctCount === 8, 'All 8 questions correct');
assert(resultAllCorrect.totalScore === 20, `Total score should be 20, got ${resultAllCorrect.totalScore}`);
assert(resultAllCorrect.percentage === 100, `Percentage should be 100%, got ${resultAllCorrect.percentage}`);

// -----------------------------------------------------------------
// TEST CASE 3: All Incorrect (8-Question)
// -----------------------------------------------------------------
console.log('\n--- Test Case 3: All Incorrect (8 Questions) ---');
const answersAllIncorrect: Record<string, number> = {};
eightQuestions.forEach(q => {
  answersAllIncorrect[q.id] = (q.correctOptionIndex + 1) % 4;
});

const resultAllIncorrect = evaluateExamSession(eightQuestions, answersAllIncorrect, upscConfig);
assert(resultAllIncorrect.correctCount === 0, '0 questions correct');
assert(resultAllIncorrect.incorrectCount === 8, '8 questions incorrect');
assert(resultAllIncorrect.totalScore === -6.67, `Total score should be -6.67, got ${resultAllIncorrect.totalScore}`);
assert(resultAllIncorrect.percentage === 0, `Percentage floored at 0%, got ${resultAllIncorrect.percentage}`);

// -----------------------------------------------------------------
// TEST CASE 4: All Unanswered (8-Question)
// -----------------------------------------------------------------
console.log('\n--- Test Case 4: All Unanswered (8 Questions) ---');
const resultAllUnanswered = evaluateExamSession(eightQuestions, {}, upscConfig);
assert(resultAllUnanswered.unansweredCount === 8, '8 unanswered');
assert(resultAllUnanswered.totalScore === 0, `Total score should be 0, got ${resultAllUnanswered.totalScore}`);

// -----------------------------------------------------------------
// TEST CASE 5: FULL-LENGTH 120-QUESTION TEST (300 MAXIMUM MARKS)
// -----------------------------------------------------------------
console.log('\n--- Test Case 5: Full-Length 120-Question Test Validation ---');
const questions120 = allUpscQuestions.slice(0, 120);
assert(questions120.length === 120, `Must load exactly 120 questions, got ${questions120.length}`);

// Verify 120 unique IDs
const set120 = new Set(questions120.map(q => q.id));
assert(set120.size === 120, 'All 120 questions must be completely distinct');

// Simulate session with 80 correct, 30 incorrect, 10 unanswered
const answers120: Record<string, number> = {};
questions120.forEach((q, idx) => {
  if (idx < 80) {
    answers120[q.id] = q.correctOptionIndex; // 80 correct
  } else if (idx < 110) {
    answers120[q.id] = (q.correctOptionIndex + 1) % 4; // 30 incorrect
  }
  // remaining 10 unanswered
});

const result120 = evaluateExamSession(questions120, answers120, upscConfig);

console.log('Result for 120-Question Test:');
console.log(`  Total Questions: ${result120.totalQuestions}`);
console.log(`  Maximum Marks: ${result120.maxScore}`);
console.log(`  Correct: ${result120.correctCount} (+${result120.earnedMarks})`);
console.log(`  Incorrect: ${result120.incorrectCount} (-${result120.negativeMarks})`);
console.log(`  Unanswered: ${result120.unansweredCount}`);
console.log(`  Total Score: ${result120.totalScore} / ${result120.maxScore}`);
console.log(`  Percentage: ${result120.percentage}%`);

assert(result120.totalQuestions === 120, `Total questions should be 120, got ${result120.totalQuestions}`);
assert(result120.maxScore === 300, `Maximum marks for 120 questions must be 300.0, got ${result120.maxScore}`);
assert(result120.correctCount === 80, `Correct count should be 80, got ${result120.correctCount}`);
assert(result120.incorrectCount === 30, `Incorrect count should be 30, got ${result120.incorrectCount}`);
assert(result120.unansweredCount === 10, `Unanswered count should be 10, got ${result120.unansweredCount}`);

// 80 * 2.5 = 200 marks
assert(result120.earnedMarks === 200, `Earned marks should be 200, got ${result120.earnedMarks}`);
// 30 * (2.5 / 3) = 25 marks
assert(result120.negativeMarks === 25, `Negative marks should be 25, got ${result120.negativeMarks}`);
// Total = 200 - 25 = 175
assert(result120.totalScore === 175, `Total score should be 175, got ${result120.totalScore}`);
// Percentage = 175 / 300 * 100 = 58.33%
assert(result120.percentage === 58.33, `Percentage should be 58.33%, got ${result120.percentage}`);

const sumTopic120 = Number(result120.topics.reduce((acc, t) => acc + t.score, 0).toFixed(2));
console.log(`  Sum of Topic Scores: ${sumTopic120}, Overall Score: ${result120.totalScore}`);
assert(sumTopic120 === result120.totalScore, `Topic scores (${sumTopic120}) must equal overall score (${result120.totalScore})`);

// -----------------------------------------------------------------
// TEST CASE 6: UP INTER COLLEGE PRINCIPAL FULL-LENGTH 120-QUESTION TEST
// (Section I: 30, Section II: 30, Section III: 60 = 120 Questions • 300 Marks)
// -----------------------------------------------------------------
console.log('\n--- Test Case 6: UP Inter College Principal Full-Length Test Validation ---');
const upConfig = EXAM_CONFIGS['up-aided-principal'];
const allUpQuestions = INITIAL_QUESTIONS.filter(q => q.examType === 'up-aided-principal');

console.log(`UP Inter College Question Bank Size: ${allUpQuestions.length} questions available`);
assert(allUpQuestions.length >= 120, `Expected at least 120 UP questions, got ${allUpQuestions.length}`);

const uniqueUpIds = new Set(allUpQuestions.map(q => q.id));
assert(uniqueUpIds.size === allUpQuestions.length, `All ${allUpQuestions.length} UP questions must have unique IDs`);

const questionsUp120 = allUpQuestions.slice(0, 120);
assert(questionsUp120.length === 120, `Must load exactly 120 questions, got ${questionsUp120.length}`);

// Verify Section Prescriptions: Sec I: 30, Sec II: 30, Sec III: 60
const sec1Count = questionsUp120.filter(q => q.sectionId === 'up-sec-1').length;
const sec2Count = questionsUp120.filter(q => q.sectionId === 'up-sec-2').length;
const sec3Count = questionsUp120.filter(q => q.sectionId === 'up-sec-3').length;

console.log(`  Section I (GS): ${sec1Count} Qs (Target 30)`);
console.log(`  Section II (Lang): ${sec2Count} Qs (Target 30)`);
console.log(`  Section III (Edu Admin & Acts): ${sec3Count} Qs (Target 60)`);

assert(sec1Count === 30, `Section I must have exactly 30 questions, got ${sec1Count}`);
assert(sec2Count === 30, `Section II must have exactly 30 questions, got ${sec2Count}`);
assert(sec3Count === 60, `Section III must have exactly 60 questions, got ${sec3Count}`);

// Simulate 90 correct, 20 incorrect, 10 unanswered
const answersUp120: Record<string, number> = {};
questionsUp120.forEach((q, idx) => {
  if (idx < 90) {
    answersUp120[q.id] = q.correctOptionIndex; // 90 correct
  } else if (idx < 110) {
    answersUp120[q.id] = (q.correctOptionIndex + 1) % 4; // 20 incorrect
  }
  // remaining 10 unanswered
});

const resultUp120 = evaluateExamSession(questionsUp120, answersUp120, upConfig);

console.log('Result for UP 120-Question Test:');
console.log(`  Total Questions: ${resultUp120.totalQuestions}`);
console.log(`  Maximum Marks: ${resultUp120.maxScore}`);
console.log(`  Correct: ${resultUp120.correctCount} (+${resultUp120.earnedMarks})`);
console.log(`  Incorrect: ${resultUp120.incorrectCount} (-${resultUp120.negativeMarks})`);
console.log(`  Unanswered: ${resultUp120.unansweredCount}`);
console.log(`  Total Score: ${resultUp120.totalScore} / ${resultUp120.maxScore}`);
console.log(`  Percentage: ${resultUp120.percentage}%`);

assert(resultUp120.totalQuestions === 120, `Total questions should be 120, got ${resultUp120.totalQuestions}`);
assert(resultUp120.maxScore === 300, `Maximum marks must be 300.0, got ${resultUp120.maxScore}`);
assert(resultUp120.correctCount === 90, `Correct count should be 90, got ${resultUp120.correctCount}`);
assert(resultUp120.incorrectCount === 20, `Incorrect count should be 20, got ${resultUp120.incorrectCount}`);
assert(resultUp120.unansweredCount === 10, `Unanswered count should be 10, got ${resultUp120.unansweredCount}`);

// 90 * 2.5 = 225
assert(resultUp120.earnedMarks === 225, `Earned marks should be 225, got ${resultUp120.earnedMarks}`);
// 20 * (2.5 / 3) = 16.6666... -> 16.67
assert(resultUp120.negativeMarks === 16.67, `Negative marks should be 16.67, got ${resultUp120.negativeMarks}`);
// Total = 225 - 16.666666666666668 = 208.33333333333334 -> 208.33
assert(resultUp120.totalScore === 208.33, `Total score should be 208.33, got ${resultUp120.totalScore}`);

// -----------------------------------------------------------------
// TEST CASE 7: 150-QUESTION DYNAMIC SCALING VALIDATION (375 MAXIMUM MARKS)
// -----------------------------------------------------------------
console.log('\n--- Test Case 7: 150-Question Dynamic Scaling Session ---');
// Generate synthetic 150 questions to verify mathematical engine scalability
const synthetic150: Question[] = Array.from({ length: 150 }, (_, i) => ({
  id: `synthetic-q${i + 1}`,
  examType: 'upsc-principal',
  topic: 'General Knowledge & Contemporary Issues',
  questionTextEn: `Synthetic Question ${i + 1}`,
  questionTextHi: `सिंथेटिक प्रश्न ${i + 1}`,
  optionsEn: ['Option A', 'Option B', 'Option C', 'Option D'],
  optionsHi: ['विकल्प A', 'विकल्प B', 'विकल्प C', 'विकल्प D'],
  correctOptionIndex: 0,
  explanationEn: 'Explanation in English',
  explanationHi: 'हिन्दी में व्याख्या',
  difficulty: 'Medium',
  tags: ['GK'],
  isPracticeQuestion: true
}));

const answersSynthetic150: Record<string, number> = {};
synthetic150.forEach((q, idx) => {
  if (idx < 100) {
    answersSynthetic150[q.id] = q.correctOptionIndex; // 100 correct
  } else if (idx < 140) {
    answersSynthetic150[q.id] = (q.correctOptionIndex + 1) % 4; // 40 incorrect
  }
});

const result150 = evaluateExamSession(synthetic150, answersSynthetic150, upscConfig);
assert(result150.totalQuestions === 150, '150 questions evaluated');
assert(result150.maxScore === 375, 'Max marks for 150 is 375');
assert(result150.correctCount === 100, '100 correct');
assert(result150.incorrectCount === 40, '40 incorrect');
assert(result150.unansweredCount === 10, '10 unanswered');
assert(result150.earnedMarks === 250, '250 earned');
assert(result150.negativeMarks === 33.33, '33.33 deducted');
assert(result150.totalScore === 216.67, 'Total 216.67');

console.log('\n==================================================');
console.log('ALL AUTOMATED TEST CASES (8Q, 120Q UPSC, 120Q UP, 150Q SCALED) PASSED SUCCESSFULLY! 🎯');
console.log('==================================================');
