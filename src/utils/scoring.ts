import { Question, ExamConfig, ExamType, ExamResultSummary, EvaluatedQuestionResult, TopicResult } from '../types/quiz';
import { EXAM_CONFIGS } from '../data/seedQuestions';

/**
 * Normalizes a topic string to its canonical name according to the exam configuration.
 * Handles abbreviations (e.g. "GFR", "GFR 2017 & GeM", "CCS Rules", "Intermediate Act") and ensures
 * exact topic grouping without fragmentation.
 */
export function normalizeTopicName(rawTopic: string, examType: ExamType): { nameEn: string; nameHi?: string } {
  // Normalize alias
  const targetExam = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
  const config = EXAM_CONFIGS[targetExam] || EXAM_CONFIGS['upsc-principal'];
  const cleaned = (rawTopic || '').trim();
  const lower = cleaned.toLowerCase();

  // 1. Direct exact or case-insensitive match
  const exact = config.topics.find(
    t => t.nameEn.toLowerCase() === lower || t.id.toLowerCase() === lower
  );
  if (exact) {
    return { nameEn: exact.nameEn, nameHi: exact.nameHi };
  }

  // 2. UPSC Principal topic aliases (Official 8 Syllabus Areas)
  if (targetExam === 'upsc-principal') {
    if (lower.includes('hindi') || lower.includes('हिन्दी') || lower.includes('व्याकरण') || lower.includes('संधि') || lower.includes('समास') || lower.includes('मुहावरे') || lower.includes('लोकोक्तियाँ') || lower.includes('शब्दावली') || lower.includes('विलोम') || lower.includes('पर्यायवाची')) {
      const t = config.topics.find(item => item.id === 'upsc-area-2' || item.nameEn === 'General Hindi');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('english') || lower.includes('अंग्रेजी') || lower.includes('grammar') || lower.includes('vocabulary') || lower.includes('comprehension') || lower.includes('idioms') || lower.includes('prepositions') || lower.includes('antonyms') || lower.includes('synonyms')) {
      const t = config.topics.find(item => item.id === 'upsc-area-3' || item.nameEn === 'General English');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('reasoning') || lower.includes('तार्किक') || lower.includes('quantitative') || lower.includes('संख्यात्मक') || lower.includes('aptitude') || lower.includes('math') || lower.includes('arithmetic') || lower.includes('analogy') || lower.includes('syllogism') || lower.includes('coding-decoding') || lower.includes('ratio') || lower.includes('percentage') || lower.includes('data interpretation')) {
      const t = config.topics.find(item => item.id === 'upsc-area-4' || item.nameEn === 'Reasoning Ability and Quantitative Aptitude');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('policy') || lower.includes('policies') || lower.includes('measurement') || lower.includes('evaluation') || lower.includes('मूल्यांकन') || lower.includes('rte') || lower.includes('assessment') || lower.includes('parakh') || lower.includes('cce')) {
      const t = config.topics.find(item => item.id === 'upsc-area-5' || item.nameEn === 'Educational Policies, Educational Measurement and Evaluation');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('office procedure') || lower.includes('csmop') || lower.includes('noting') || lower.includes('drafting') || lower.includes('कार्यालय प्रक्रिया') || lower.includes('leave rules') || lower.includes('conduct rules') || lower.includes('service book') || lower.includes('posh') || lower.includes('rti')) {
      const t = config.topics.find(item => item.id === 'upsc-area-7' || item.nameEn === 'Office Procedure');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('management') || lower.includes('financial') || lower.includes('वित्तीय') || lower.includes('प्रबंधन') || lower.includes('gfr') || lower.includes('gem') || lower.includes('procurement') || lower.includes('budget') || lower.includes('pfms') || lower.includes('cash book')) {
      const t = config.topics.find(item => item.id === 'upsc-area-6' || item.nameEn === 'Management and Financial Administration');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('pedagogy') || lower.includes('शिक्षा शास्त्र') || lower.includes('digital') || lower.includes('डिजिटल') || lower.includes('ict') || lower.includes('inclusive') || lower.includes('cyber') || lower.includes('teaching') || lower.includes('psychology') || lower.includes('piaget') || lower.includes('vygotsky') || lower.includes('diksha')) {
      const t = config.topics.find(item => item.id === 'upsc-area-8' || item.nameEn === 'Pedagogy in Education and Digital Literacy');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('knowledge') || lower.includes('ज्ञान') || lower.includes('polity') || lower.includes('constitution') || lower.includes('geography') || lower.includes('history') || lower.includes('economy') || lower.includes('current affairs')) {
      const t = config.topics.find(item => item.id === 'upsc-area-1' || item.nameEn === 'General Knowledge');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
  }

  // 3. UP Aided Inter College Principal topic aliases
  if (targetExam === 'up-aided-principal') {
    if (lower.includes('1921') || lower.includes('intermediate education act')) {
      const t = config.topics.find(item => item.id === 'up-education-act');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('1971') || lower.includes('1982') || lower.includes('upsessb') || lower.includes('salary')) {
      const t = config.topics.find(item => item.id === 'up-service-rules');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('scholar') || lower.includes('records') || lower.includes('dios') || lower.includes('management committee')) {
      const t = config.topics.find(item => item.id === 'up-school-admin');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('financial handbook') || lower.includes('audit') || lower.includes('cash book')) {
      const t = config.topics.find(item => item.id === 'up-financial-rules');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('nep') || lower.includes('pedagogy') || lower.includes('state curriculum') || lower.includes('holistic progress')) {
      const t = config.topics.find(item => item.id === 'pedagogy-nep');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
  }

  // 4. UP Technical Education Principal topic aliases
  if (targetExam === 'up-technical-principal') {
    if (lower.includes('aicte') || lower.includes('technical education governance')) {
      const t = config.topics.find(item => item.id === 'tech-governance');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('polytechnic') || lower.includes('diploma')) {
      const t = config.topics.find(item => item.id === 'polytechnic-admin');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('financial') || lower.includes('budget')) {
      const t = config.topics.find(item => item.id === 'tech-financial');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('nba') || lower.includes('accreditation') || lower.includes('industry')) {
      const t = config.topics.find(item => item.id === 'nba-curriculum');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
    if (lower.includes('aptitude') || lower.includes('general')) {
      const t = config.topics.find(item => item.id === 'general-aptitude');
      if (t) return { nameEn: t.nameEn, nameHi: t.nameHi };
    }
  }

  return { nameEn: cleaned || 'General', nameHi: undefined };
}

/**
 * Validates and sanitizes a Question object so correctOptionIndex is a clean integer
 * and topic names are standardized.
 */
export function sanitizeQuestion(raw: any, fallbackExam: ExamType = 'upsc-principal'): Question {
  let examType: ExamType = fallbackExam;
  if (raw.examType === 'upsc-principal' || raw.examType === 'up-aided-principal' || raw.examType === 'up-technical-principal') {
    examType = raw.examType;
  } else if (raw.examType === 'uppcs-principal') {
    examType = 'up-aided-principal';
  }

  const normTopic = normalizeTopicName(raw.topic || '', examType);

  return {
    id: String(raw.id || `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`),
    examType,
    topic: normTopic.nameEn,
    topicHi: raw.topicHi || normTopic.nameHi,
    questionTextEn: String(raw.questionTextEn || '').trim(),
    questionTextHi: String(raw.questionTextHi || '').trim(),
    optionsEn: Array.isArray(raw.optionsEn) && raw.optionsEn.length === 4
      ? [String(raw.optionsEn[0]), String(raw.optionsEn[1]), String(raw.optionsEn[2]), String(raw.optionsEn[3])]
      : ['', '', '', ''],
    optionsHi: Array.isArray(raw.optionsHi) && raw.optionsHi.length === 4
      ? [String(raw.optionsHi[0]), String(raw.optionsHi[1]), String(raw.optionsHi[2]), String(raw.optionsHi[3])]
      : ['', '', '', ''],
    correctOptionIndex: Math.min(3, Math.max(0, parseInt(String(raw.correctOptionIndex ?? 0), 10) || 0)),
    explanationEn: String(raw.explanationEn || ''),
    explanationHi: String(raw.explanationHi || ''),
    difficulty: raw.difficulty === 'Hard' ? 'Hard' : raw.difficulty === 'Easy' ? 'Easy' : 'Medium',
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    isPracticeQuestion: true,
    isApproved: raw.isApproved !== undefined ? Boolean(raw.isApproved) : true,
    createdAt: raw.createdAt || new Date().toISOString()
  };
}

/**
 * Pure, deterministic evaluation of an exam session based strictly on:
 * - Correct answer: +2.5 marks
 * - Incorrect answer: -2.5 / 3 = -0.833333333... marks (exact fraction internally, rounded only for display)
 * - Unattempted answer: 0 marks
 * - Maximum marks = total questions * 2.5
 * 
 * Guarantees:
 * 1. Single shared scoring engine used for overall scorecard, topic breakdown, and question review.
 * 2. Topic-wise scores sum exactly to overall totalScore.
 * 3. Question 8 and all other questions match their topic metrics.
 */
export function evaluateExamSession(
  questions: Question[],
  answers: Record<string, number>,
  config: ExamConfig,
  timeRemainingSeconds: number = 0,
  markedQuestionIds: Set<string> = new Set()
): ExamResultSummary {
  const marksPerCorrect = config.totalMarksPerQuestion || 2.5;
  // Always use exact one-third of marks per question: 2.5 / 3
  const marksPerIncorrect = marksPerCorrect / 3;

  const evaluatedQuestions: EvaluatedQuestionResult[] = [];
  const topicMap: Record<string, {
    topic: string;
    topicHi?: string;
    total: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    rawScore: number;
  }> = {};

  // Initialize configured topics in official syllabus order
  config.topics.forEach(t => {
    topicMap[t.nameEn] = {
      topic: t.nameEn,
      topicHi: t.nameHi,
      total: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      rawScore: 0
    };
  });

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach((q, idx) => {
    // Standardize topic name to ensure accurate topic grouping
    const normalized = normalizeTopicName(q.topic, config.examType);
    const canonicalTopic = normalized.nameEn;
    const topicHi = normalized.nameHi || q.topicHi;

    if (!topicMap[canonicalTopic]) {
      topicMap[canonicalTopic] = {
        topic: canonicalTopic,
        topicHi,
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        rawScore: 0
      };
    }

    const tObj = topicMap[canonicalTopic];
    tObj.total += 1;

    const rawChoice = answers[q.id];
    const isAnswered = rawChoice !== undefined && rawChoice !== null && rawChoice >= 0 && rawChoice <= 3;
    const userChoice = isAnswered ? Number(rawChoice) : undefined;
    const isCorrect = isAnswered && userChoice === Number(q.correctOptionIndex);
    const isIncorrect = isAnswered && !isCorrect;
    const isUnanswered = !isAnswered;

    let marksAwarded = 0;
    let displayMarksAwarded = '0';
    let status: 'correct' | 'incorrect' | 'unanswered';

    if (isCorrect) {
      status = 'correct';
      marksAwarded = marksPerCorrect;
      displayMarksAwarded = `+${marksPerCorrect}`;
      correctCount += 1;
      tObj.correct += 1;
      tObj.rawScore += marksPerCorrect;
    } else if (isIncorrect) {
      status = 'incorrect';
      marksAwarded = -marksPerIncorrect;
      displayMarksAwarded = `-${marksPerIncorrect.toFixed(2)}`;
      incorrectCount += 1;
      tObj.incorrect += 1;
      tObj.rawScore -= marksPerIncorrect;
    } else {
      status = 'unanswered';
      marksAwarded = 0;
      displayMarksAwarded = '0';
      unansweredCount += 1;
      tObj.unanswered += 1;
    }

    evaluatedQuestions.push({
      questionId: q.id,
      questionNumber: idx + 1,
      topic: canonicalTopic,
      topicHi,
      userChoice,
      correctOptionIndex: Number(q.correctOptionIndex),
      status,
      isCorrect,
      isIncorrect,
      isUnanswered,
      marksAwarded,
      displayMarksAwarded
    });
  });

  const attempted = correctCount + incorrectCount;
  const totalQuestions = questions.length;
  const maxScore = Number((totalQuestions * marksPerCorrect).toFixed(2));
  const earnedMarks = Number((correctCount * marksPerCorrect).toFixed(2));
  const rawNegativeMarks = incorrectCount * marksPerIncorrect;
  const negativeMarks = Number(rawNegativeMarks.toFixed(2));
  
  // Exact total score before rounding
  const rawTotalScore = (correctCount * marksPerCorrect) - (incorrectCount * marksPerIncorrect);
  const totalScore = Number(rawTotalScore.toFixed(2));

  // Percentage = (totalScore / maxScore) * 100
  const percentage = maxScore > 0
    ? Number(Math.max(0, (rawTotalScore / maxScore) * 100).toFixed(2))
    : 0;

  const accuracy = attempted > 0
    ? Number(((correctCount / attempted) * 100).toFixed(2))
    : 0;

  // Finalize topics
  const topicList: TopicResult[] = Object.values(topicMap)
    .filter(t => t.total > 0)
    .map(t => {
      const tMaxScore = Number((t.total * marksPerCorrect).toFixed(2));
      const tScore = Number(t.rawScore.toFixed(2));
      const pct = tMaxScore > 0
        ? Number(Math.max(0, (t.rawScore / tMaxScore) * 100).toFixed(2))
        : 0;
      return {
        topic: t.topic,
        topicHi: t.topicHi,
        total: t.total,
        correct: t.correct,
        incorrect: t.incorrect,
        unanswered: t.unanswered,
        score: tScore,
        maxScore: tMaxScore,
        percentage: pct
      };
    });

  // Guarantee that topic scores sum up exactly to overall totalScore
  const sumTopicScores = Number(topicList.reduce((acc, t) => acc + t.score, 0).toFixed(2));
  const diff = Number((totalScore - sumTopicScores).toFixed(2));
  if (Math.abs(diff) > 0 && Math.abs(diff) <= 0.05 && topicList.length > 0) {
    // Distribute the 0.01 rounding divergence to the topic with highest total questions
    const primaryTopic = [...topicList].sort((a, b) => b.total - a.total)[0];
    if (primaryTopic) {
      primaryTopic.score = Number((primaryTopic.score + diff).toFixed(2));
    }
  }

  const topicPerformance: Record<string, {
    total: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    score: number;
    maxScore: number;
  }> = {};

  topicList.forEach(t => {
    topicPerformance[t.topic] = {
      total: t.total,
      correct: t.correct,
      incorrect: t.incorrect,
      unanswered: t.unanswered,
      score: t.score,
      maxScore: t.maxScore
    };
  });

  const timeTakenSeconds = Math.max(0, (config.durationMinutes * 60) - timeRemainingSeconds);

  return {
    examType: config.examType,
    totalQuestions,
    attempted,
    correctCount,
    incorrectCount,
    unansweredCount,
    markedForReviewCount: markedQuestionIds.size,
    earnedMarks,
    negativeMarks,
    totalScore,
    maxScore,
    percentage,
    accuracy,
    timeTakenSeconds,
    topics: topicList,
    topicPerformance,
    evaluatedQuestions
  };
}
