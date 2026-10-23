import { strict as assert } from 'assert';
import {
  migrateAndImportPreviousHistory,
  resetUsageRegistry,
  commitMockTestUsage,
  loadUsageRegistry,
  getRegistryStats
} from './questionUsageRegistry';
import { safeStorage } from './safeStorage';
import { INITIAL_QUESTIONS } from '../data/seedQuestions';
import { Question } from '../types/quiz';

console.log('================================================================');
console.log('HISTORY AUDIT & STORAGE SYNC ENGINE VERIFICATION TEST');
console.log('================================================================\n');

// -------------------------------------------------------------------------
// TEST 1: Fresh storage scan with 0 records - No fabricated data
// -------------------------------------------------------------------------
console.log('--- Test 1: Audit with 0 Prior Test Records (Fresh State) ---');
resetUsageRegistry();
// Clear any test session keys
safeStorage.removeItem('principal_active_exam_session_v3');
safeStorage.removeItem('principal_portal_test_history');
safeStorage.removeItem('principal_portal_usage_registry_v2');
safeStorage.removeItem('principal_portal_usage_registry_v1');
safeStorage.removeItem('principal_exam_session_v2');
safeStorage.removeItem('principal_exam_session');

const freshReport = migrateAndImportPreviousHistory(INITIAL_QUESTIONS);
console.log(`Sources scanned: ${freshReport.sourcesScanned.length}`);
console.log(`Records found: ${freshReport.recordsFound}`);
console.log(`Questions imported: ${freshReport.questionsImported}`);
console.log(`Duplicates detected: ${freshReport.duplicatesDetected}`);
console.log(`Summary: "${freshReport.summaryMessage}"`);

assert.strictEqual(freshReport.recordsFound, 0, 'Must honestly report 0 records found in fresh state');
assert.strictEqual(freshReport.questionsImported, 0, 'Must not fabricate imported questions when none exist');
assert.strictEqual(freshReport.duplicatesDetected, 0, 'Must report 0 duplicates when none exist');
assert(freshReport.sourcesScanned.length >= 6, 'Must scan all relevant storage sources');
assert(freshReport.unavailableLegacyHistory.length > 0, 'Must provide clear diagnostic explanation for unavailable legacy records');
console.log('✅ Test 1 Passed: Fresh state audit reports 0 records accurately without fabricating history.\n');

// -------------------------------------------------------------------------
// TEST 2: Active Session Recovery & Migration
// -------------------------------------------------------------------------
console.log('--- Test 2: Active Session Question Recovery ---');
const sampleQIds = ['upsc-crt-1', 'upsc-crt-2', 'upsc-crt-3'];
safeStorage.setItem(
  'principal_active_exam_session_v3',
  JSON.stringify({
    testId: 'active-session-test-999',
    testTitle: 'Recoverable Practice Session',
    examType: 'upsc-principal',
    questionIds: sampleQIds,
    startedAt: Date.now() - 3600000
  })
);

const recoveryReport = migrateAndImportPreviousHistory(INITIAL_QUESTIONS);
console.log(`Records found: ${recoveryReport.recordsFound}`);
console.log(`Questions imported: ${recoveryReport.questionsImported}`);
console.log(`Recovered details: ${recoveryReport.recoveredDetails.join('; ')}`);

assert(recoveryReport.recordsFound >= 1, 'Must detect active session record');
assert.strictEqual(recoveryReport.questionsImported, 3, 'Must import all 3 questions from active session');

const regAfterRecovery = loadUsageRegistry();
sampleQIds.forEach(id => {
  assert(regAfterRecovery.usedQuestions[id], `Question ${id} must now be marked as permanently used`);
});
console.log('✅ Test 2 Passed: Active session questions safely migrated into shared usage registry.\n');

// -------------------------------------------------------------------------
// TEST 3: Cross-Mode Duplicate Detection
// -------------------------------------------------------------------------
console.log('--- Test 3: Cross-Mode Duplicate Detection Across Test Records ---');
// Inject a legacy test record containing an already-used question
safeStorage.setItem(
  'principal_portal_test_history',
  JSON.stringify([
    {
      testId: 'legacy-full-test-888',
      testTitle: 'Full-Length Simulation #1',
      examType: 'upsc-principal',
      questionIds: ['upsc-crt-1', 'upsc-crt-4'], // 'upsc-crt-1' is shared with Test 2 session
      generatedAt: Date.now() - 7200000
    }
  ])
);

const crossModeReport = migrateAndImportPreviousHistory(INITIAL_QUESTIONS);
console.log(`Duplicates detected: ${crossModeReport.duplicatesDetected}`);
console.log(`Duplicate details: ${crossModeReport.duplicateDetails.join('\n   ')}`);

assert(crossModeReport.duplicatesDetected >= 1, 'Must detect duplicate occurrence of upsc-crt-1 across modes');
assert(crossModeReport.duplicateDetails.some(d => d.includes('upsc-crt-1')), 'Duplicate details must mention upsc-crt-1');
console.log('✅ Test 3 Passed: Cross-mode duplicates across Full-Length and Practice modes properly flagged and isolated.\n');

// -------------------------------------------------------------------------
// TEST 4: Conceptual Duplicate Linking During Audit
// -------------------------------------------------------------------------
console.log('--- Test 4: Conceptual Duplicate Linking ---');
// Inject an artificial candidate with same English stem but different ID
const duplicateCandidate: Question = {
  id: 'ARTIFICIAL_DUP_99999',
  examType: 'upsc-principal',
  topic: 'Administration',
  conceptId: 'UPSC-CONCEPT-G20',
  questionTextEn: INITIAL_QUESTIONS.find(q => q.id === 'upsc-crt-1')?.questionTextEn || 'Which international forum hosted the 2023 G20 Leaders Summit?',
  questionTextHi: '2023 जी20 लीडर्स समिट की मेजबानी किस अंतरराष्ट्रीय मंच ने की?',
  optionsEn: ['India', 'Brazil', 'South Africa', 'USA'],
  optionsHi: ['भारत', 'ब्राजील', 'दक्षिण अफ्रीका', 'अमेरिका'],
  correctOptionIndex: 0,
  explanationEn: 'Summit hosted in New Delhi, India.',
  explanationHi: 'शिखर सम्मेलन नई दिल्ली में आयोजित किया गया।',
  difficulty: 'Medium',
  tags: ['G20'],
  isPracticeQuestion: true,
  isApproved: true
};

const allWithCandidate = [...INITIAL_QUESTIONS, duplicateCandidate];
const conceptualAuditReport = migrateAndImportPreviousHistory(allWithCandidate);
const regFinal = loadUsageRegistry();

assert(regFinal.usedQuestions['ARTIFICIAL_DUP_99999'], 'Conceptual duplicate candidate must be linked and recorded as used');
console.log('✅ Test 4 Passed: Conceptual duplicate correctly linked to existing usage record.\n');

console.log('================================================================');
console.log('🎯 ALL HISTORY AUDIT SUITE TESTS PASSED WITH 100% SUCCESS!');
console.log('================================================================');
