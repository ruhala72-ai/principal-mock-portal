import { Question, DuplicateCheckMatch, DuplicateDetectionResult } from '../types/quiz';

/**
 * Normalizes text for comparison by removing diacritics, punctuation,
 * extra whitespaces, and converting to lowercase.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’“”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenizes text into meaningful words, filtering out common stop words.
 */
const STOP_WORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'in', 'of', 'for', 'to', 'and', 'or',
  'by', 'with', 'from', 'as', 'that', 'this', 'are', 'was', 'were', 'be', 'been',
  'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'shall', 'should',
  'under', 'what', 'who', 'how', 'when', 'where', 'per', 'any', 'all',
  'का', 'के', 'की', 'है', 'हैं', 'में', 'से', 'को', 'और', 'या', 'पर', 'एक',
  'द्वारा', 'किया', 'जाता', 'होता', 'लिए', 'यह', 'वह', 'कि'
]);

export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized
    .split(' ')
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

/**
 * Computes Jaccard similarity between two sets of tokens (0 to 1).
 */
export function jaccardSimilarity(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  
  let intersectionCount = 0;
  setA.forEach(token => {
    if (setB.has(token)) intersectionCount++;
  });

  const unionSize = setA.size + setB.size - intersectionCount;
  if (unionSize === 0) return 0;
  return intersectionCount / unionSize;
}

/**
 * Extracts key domain phrases/numbers (e.g. "Rule 16", "Section 12", "1921", "NEP 2020", "GFR")
 */
const REGEX_DOMAIN_MARKERS = /\b(rule\s*\d+|section\s*\d+|act\s*\d+|1921|2009|2020|2017|ccs|gfr|gem|rte|pocso|dios|smc|parakh|fln)\b/gi;

export function extractDomainMarkers(text: string): string[] {
  const matches = text.match(REGEX_DOMAIN_MARKERS);
  return matches ? matches.map(m => m.toLowerCase().replace(/\s+/g, '')) : [];
}

/**
 * Check a candidate question against existing questions for duplicates.
 * Returns exact duplicates as well as potential concept-level duplicates for human review.
 */
export function checkForDuplicates(
  candidate: {
    questionTextEn: string;
    questionTextHi: string;
    topic?: string;
    optionsEn?: string[];
  },
  existingQuestions: Question[],
  excludeId?: string
): DuplicateDetectionResult {
  const matches: DuplicateCheckMatch[] = [];

  const candNormEn = normalizeText(candidate.questionTextEn);
  const candNormHi = normalizeText(candidate.questionTextHi);
  const candTokensEn = tokenize(candidate.questionTextEn);
  const candTokensHi = tokenize(candidate.questionTextHi);
  const candMarkers = extractDomainMarkers(`${candidate.questionTextEn} ${candidate.questionTextHi}`);

  for (const existing of existingQuestions) {
    if (excludeId && existing.id === excludeId) continue;

    const existNormEn = normalizeText(existing.questionTextEn);
    const existNormHi = normalizeText(existing.questionTextHi);

    // 1. Exact match check (English or Hindi)
    const exactEn = candNormEn.length > 10 && candNormEn === existNormEn;
    const exactHi = candNormHi.length > 10 && candNormHi === existNormHi;

    if (exactEn || exactHi) {
      matches.push({
        matchedQuestion: existing,
        matchType: 'exact',
        similarityScore: 100,
        matchedLanguage: exactEn && exactHi ? 'both' : exactEn ? 'en' : 'hi',
        reason: 'Identical normalized question text found.'
      });
      continue;
    }

    // 2. Concept ID match (same exact statutory learning objective)
    if (
      (candidate as any).conceptId &&
      existing.conceptId &&
      (candidate as any).conceptId === existing.conceptId
    ) {
      matches.push({
        matchedQuestion: existing,
        matchType: 'concept_high',
        similarityScore: 98,
        matchedLanguage: 'both',
        reason: `Identical statutory concept and learning objective anchor [${existing.conceptId}]. Reworded duplicate.`
      });
      continue;
    }

    // 3. High Text Similarity (Jaccard on words)
    const existTokensEn = tokenize(existing.questionTextEn);
    const existTokensHi = tokenize(existing.questionTextHi);

    const simEn = jaccardSimilarity(candTokensEn, existTokensEn);
    const simHi = jaccardSimilarity(candTokensHi, existTokensHi);
    const maxSim = Math.max(simEn, simHi);

    // 4. Domain marker matching (Rule numbers, Act sections)
    const existMarkers = extractDomainMarkers(`${existing.questionTextEn} ${existing.questionTextHi}`);
    const commonMarkers = candMarkers.filter(m => existMarkers.includes(m));

    // Calculate composite score (0-100)
    let compositeScore = Math.round(maxSim * 100);

    // Boost score if same key regulatory marker (e.g. both refer to Rule 149 of GFR or Section 16-G)
    if (commonMarkers.length > 0 && maxSim > 0.30) {
      compositeScore = Math.min(99, compositeScore + 25);
    }

    // Check options similarity if provided
    if (candidate.optionsEn && existing.optionsEn) {
      const candOptTokens = candidate.optionsEn.flatMap(o => tokenize(o));
      const existOptTokens = existing.optionsEn.flatMap(o => tokenize(o));
      const optSim = jaccardSimilarity(candOptTokens, existOptTokens);
      if (optSim > 0.4) {
        compositeScore = Math.min(99, compositeScore + 20);
      }
    }

    if (compositeScore >= 70) {
      matches.push({
        matchedQuestion: existing,
        matchType: 'concept_high',
        similarityScore: compositeScore,
        matchedLanguage: simEn >= simHi ? 'en' : 'hi',
        reason: `High conceptual & keyword similarity (${compositeScore}%). Tests the same factual rule or question scenario.`
      });
    } else if (compositeScore >= 50) {
      matches.push({
        matchedQuestion: existing,
        matchType: 'concept_moderate',
        similarityScore: compositeScore,
        matchedLanguage: simEn >= simHi ? 'en' : 'hi',
        reason: `Moderate conceptual overlap (${compositeScore}%). May test similar administrative rule or pedagogical concept.`
      });
    }
  }

  // Sort matches by similarity score descending
  matches.sort((a, b) => b.similarityScore - a.similarityScore);

  return {
    hasPotentialDuplicate: matches.length > 0,
    matches,
    warningMessage: matches.length > 0
      ? `Identified ${matches.length} potential duplicate(s) or closely related question(s). Human verification is required.`
      : undefined
  };
}

/**
 * Scans an entire bank for all internal duplicate pairs.
 */
export function scanBankForDuplicates(questions: Question[]): Array<{
  questionA: Question;
  questionB: Question;
  similarityScore: number;
  matchType: 'exact' | 'concept_high' | 'concept_moderate';
  reason: string;
}> {
  const duplicatePairs: Array<{
    questionA: Question;
    questionB: Question;
    similarityScore: number;
    matchType: 'exact' | 'concept_high' | 'concept_moderate';
    reason: string;
  }> = [];

  for (let i = 0; i < questions.length; i++) {
    for (let j = i + 1; j < questions.length; j++) {
      const qA = questions[i];
      const qB = questions[j];

      const res = checkForDuplicates(
        {
          questionTextEn: qA.questionTextEn,
          questionTextHi: qA.questionTextHi,
          topic: qA.topic,
          optionsEn: qA.optionsEn
        },
        [qB]
      );

      if (res.matches.length > 0) {
        const top = res.matches[0];
        duplicatePairs.push({
          questionA: qA,
          questionB: qB,
          similarityScore: top.similarityScore,
          matchType: top.matchType,
          reason: top.reason
        });
      }
    }
  }

  return duplicatePairs.sort((a, b) => b.similarityScore - a.similarityScore);
}

/**
 * Scan a list of questions and return an object with matches array.
 */
export function detectDuplicates(questions: Question[]): { matches: Array<{ questionA: Question; questionB: Question; similarityScore: number; matchType: 'exact' | 'concept_high' | 'concept_moderate'; reason: string; }> } {
  const matches = scanBankForDuplicates(questions);
  return { matches };
}

