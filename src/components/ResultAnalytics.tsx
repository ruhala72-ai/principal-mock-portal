import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { EvaluatedQuestionResult } from '../types/quiz';
import { PracticeDisclaimerBanner } from './PracticeDisclaimerBanner';
import { safeStorage } from '../utils/safeStorage';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Award,
  Sparkles,
  BookmarkCheck,
  FileText,
  Download,
  Printer,
  Star
} from 'lucide-react';

interface Props {
  onRetake: () => void;
  onGoHome: () => void;
}

type FilterType = 'all' | 'correct' | 'incorrect' | 'unanswered' | 'revision';

export const ResultAnalytics: React.FC<Props> = ({ onRetake, onGoHome }) => {
  const {
    session,
    currentQuestions,
    resultSummary,
    languageMode,
    examConfigs,
    togglePinQuestion,
    isQuestionPinned,
    clearActiveSession
  } = useQuiz();

  const handleSwitchExamHome = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    try {
      clearActiveSession();
    } catch (err) {
      console.error('Failed to clear active session:', err);
    }
    try {
      safeStorage.removeItem('principal_active_exam_session_v3');
    } catch (err) {
      console.error(err);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    onGoHome();
  };

  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const handleDownloadPDF = (targetFilter: FilterType = 'all') => {
    setFilter(targetFilter);
    // Expand all questions for complete printing
    if (resultSummary) {
      const allExpanded: Record<string, boolean> = {};
      resultSummary.evaluatedQuestions.forEach(eq => {
        allExpanded[eq.questionId] = true;
      });
      setExpandedQuestions(allExpanded);
    }
    // Allow state render to flush, then trigger print dialog
    setTimeout(() => {
      window.print();
    }, 200);
  };

  if (!session || !resultSummary) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">No test results available.</p>
        <button
          onClick={handleSwitchExamHome}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  const targetExam = session.examType === 'uppcs-principal' ? 'up-aided-principal' : session.examType;
  const examConfig = examConfigs[targetExam];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const toggleExpand = (qId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Create quick lookup for questions
  const questionMap = useMemo(() => {
    const map = new Map<string, (typeof currentQuestions)[0]>();
    currentQuestions.forEach(q => map.set(q.id, q));
    return map;
  }, [currentQuestions]);

  // Questions needing revision (Incorrect + Unanswered)
  const revisionQuestions = useMemo(() => {
    return resultSummary.evaluatedQuestions.filter(q => q.isIncorrect || q.isUnanswered);
  }, [resultSummary.evaluatedQuestions]);

  // Filter strictly based on the evaluated question results
  const displayedEvaluations = useMemo(() => {
    return resultSummary.evaluatedQuestions.filter(evalQ => {
      if (filter === 'correct') return evalQ.isCorrect;
      if (filter === 'incorrect') return evalQ.isIncorrect;
      if (filter === 'unanswered') return evalQ.isUnanswered;
      if (filter === 'revision') return evalQ.isIncorrect || evalQ.isUnanswered;
      return true;
    });
  }, [resultSummary.evaluatedQuestions, filter]);

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-20 space-y-6">
      {/* Official Print/PDF Booklet Header (visible only when printing or saving as PDF) */}
      <div className="print-only border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-950 uppercase tracking-tight">
              {examConfig?.titleEn || 'Principal Examination'}
            </h1>
            <h2 className="text-sm font-devanagari text-slate-800">
              {examConfig?.titleHi || 'प्राचार्य भर्ती परीक्षा - पूर्ण व्याख्या सहित समाधान पुस्तिका'}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Official Solutions & Statutory Citations Booklet • CCS Rules • GFR 2017 • Education Administration
            </p>
          </div>
          <div className="text-right text-xs">
            <div className="font-bold text-slate-900 text-sm">
              Score: {resultSummary.totalScore} / {resultSummary.totalQuestions * (examConfig?.totalMarksPerQuestion || 2.5)}
            </div>
            <div className="text-slate-700">Percentage: {resultSummary.percentage}% • Accuracy: {resultSummary.accuracy}%</div>
            <div className="text-slate-500 text-[10px] mt-1">
              Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-300 flex items-center justify-between text-xs text-slate-700 font-medium">
          <span>Total Questions: {resultSummary.totalQuestions}</span>
          <span className="text-emerald-800 font-bold">Correct: {resultSummary.correctCount}</span>
          <span className="text-rose-800 font-bold">Incorrect: {resultSummary.incorrectCount} (-{resultSummary.negativeMarks})</span>
          <span>Unanswered: {resultSummary.unansweredCount}</span>
          <span>Marking Scheme: +{examConfig?.totalMarksPerQuestion || 2.5} / -{examConfig?.negativeMarksPerQuestion?.toFixed(2) || '0.83'}</span>
        </div>
      </div>

      {/* Practice Advisory Banner (hidden on print) */}
      <div className="no-print">
        <PracticeDisclaimerBanner compact={false} />
      </div>

      {/* Main Scorecard Hero (hidden on print) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden no-print">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 px-6 py-8 text-white text-center relative">
          <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-3 border border-white/20">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Mock Test Result / परीक्षा परिणाम
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 font-medium">
            {examConfig?.titleEn || 'Principal Exam'} • {examConfig?.titleHi || ''}
          </p>

          {/* Big Score Display */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight">
              {resultSummary.totalScore}
            </div>
            <div className="text-left text-xs sm:text-sm text-indigo-200 border-l border-indigo-500/50 pl-3">
              <div>out of <strong>{resultSummary.maxScore}</strong> marks</div>
              <div className="font-semibold text-white">{resultSummary.percentage}% Score</div>
            </div>
          </div>

          {/* Marking scheme formula confirmation */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[11px] text-indigo-200 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Marking Scheme: +2.5 per correct, -0.83 (-2.5/3) per incorrect, 0 unattempted</span>
          </div>
        </div>

        {/* Metric Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50 border-b border-slate-200 text-center p-4">
          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-semibold mb-0.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct / सही</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{resultSummary.correctCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">+{resultSummary.earnedMarks} marks</div>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-rose-600 text-xs font-semibold mb-0.5">
              <XCircle className="w-4 h-4" />
              <span>Incorrect / गलत</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{resultSummary.incorrectCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">-{resultSummary.negativeMarks} neg.</div>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-slate-600 text-xs font-semibold mb-0.5">
              <HelpCircle className="w-4 h-4" />
              <span>Unanswered / शेष</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{resultSummary.unansweredCount}</div>
            <div className="text-[11px] text-slate-400">0 marks</div>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1 text-blue-600 text-xs font-semibold mb-0.5">
              <Clock className="w-4 h-4" />
              <span>Time & Accuracy</span>
            </div>
            <div className="text-xl font-bold text-slate-800">{formatTime(resultSummary.timeTakenSeconds)}</div>
            <div className="text-[11px] text-slate-500 font-medium">Accuracy: {resultSummary.accuracy}%</div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="p-4 bg-white flex flex-wrap items-center justify-center gap-3 relative z-20 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDownloadPDF('all');
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all pointer-events-auto touch-manipulation relative z-20"
            title="Download completed 120-question solutions booklet with answers and statutory explanations"
          >
            <Download className="w-4 h-4 pointer-events-none" />
            <span className="pointer-events-none">Download Full Solutions PDF ({resultSummary.totalQuestions} Qs)</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRetake();
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs cursor-pointer pointer-events-auto touch-manipulation relative z-20"
          >
            <RotateCcw className="w-4 h-4 pointer-events-none" />
            <span className="pointer-events-none">Re-take This Test / पुनः प्रयास करें</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSwitchExamHome(e);
            }}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors pointer-events-auto touch-manipulation relative z-20"
          >
            <BookOpen className="w-4 h-4 pointer-events-none" />
            <span className="pointer-events-none">Switch Exam / Home</span>
          </button>
        </div>
      </div>

      {/* Revision Recommendations Callout (if errors exist) */}
      {revisionQuestions.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-900">
                {revisionQuestions.length} Questions Require Revision (पुनरावृत्ति की आवश्यकता)
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                You lost marks or missed {revisionQuestions.length} questions. Review statutory explanations below to strengthen conceptual clarity.
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilter('revision')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
          >
            Focus on Revision Items ({revisionQuestions.length})
          </button>
        </div>
      )}

      {/* Topic Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-indigo-600" />
              <span>विषयवार प्रदर्शन (Topic-wise Performance)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Each topic’s correct/incorrect counts match the detailed question solutions below.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {resultSummary.topics.length} Topics
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {resultSummary.topics.map(topic => {
            return (
              <div key={topic.topic} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-2">
                  <div>
                    <span className="font-semibold text-slate-800">{topic.topic}</span>
                    {topic.topicHi && (
                      <span className="block text-[11px] text-slate-500 font-devanagari">
                        {topic.topicHi}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 shrink-0 font-medium">
                    <span className="text-emerald-700 font-semibold">
                      {topic.correct}/{topic.total} Correct
                    </span>
                    {topic.incorrect > 0 && (
                      <span className="text-rose-600 text-[11px]">
                        ({topic.incorrect} incorrect)
                      </span>
                    )}
                    {topic.unanswered > 0 && (
                      <span className="text-slate-400 text-[11px]">
                        ({topic.unanswered} unattempted)
                      </span>
                    )}
                    <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {topic.percentage}% • {topic.score}/{topic.maxScore} marks
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${topic.total > 0 ? (topic.correct / topic.total) * 100 : 0}%` }}
                    title={`${topic.correct} Correct`}
                  ></div>
                  <div
                    className="bg-rose-400 h-full transition-all"
                    style={{ width: `${topic.total > 0 ? (topic.incorrect / topic.total) * 100 : 0}%` }}
                    title={`${topic.incorrect} Incorrect`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solutions & Detailed Explanations */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Solution Header & Filters */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Detailed Question Solutions & Explanations
            </h3>
            <p className="text-xs text-slate-500">
              विस्तृत उत्तर एवं विधिक व्याख्या (Both English & Hindi with official statutory citations)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({resultSummary.totalQuestions})
              </button>
              <button
                onClick={() => setFilter('correct')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filter === 'correct'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Correct ({resultSummary.correctCount})
              </button>
              <button
                onClick={() => setFilter('incorrect')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filter === 'incorrect'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Incorrect ({resultSummary.incorrectCount})
              </button>
              <button
                onClick={() => setFilter('unanswered')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filter === 'unanswered'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unanswered ({resultSummary.unansweredCount})
              </button>
              {revisionQuestions.length > 0 && (
                <button
                  onClick={() => setFilter('revision')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    filter === 'revision'
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Revision ({revisionQuestions.length})
                </button>
              )}
            </div>

            {/* Quick Print/PDF Button */}
            <button
              type="button"
              onClick={() => handleDownloadPDF(filter)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Print or export current question solutions to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Question Solutions List */}
        <div className="divide-y divide-slate-200">
          {displayedEvaluations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No questions found for the selected filter ({filter}).
            </div>
          ) : (
            displayedEvaluations.map((evalQ: EvaluatedQuestionResult) => {
              const q = questionMap.get(evalQ.questionId);
              if (!q) return null;

              const isExpanded = expandedQuestions[evalQ.questionId] !== false; // Default expanded

              const isPinned = isQuestionPinned(evalQ.questionId);

              return (
                <div key={evalQ.questionId} className="p-4 sm:p-6 transition-colors page-break-avoid border-b border-slate-100 last:border-b-0">
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {evalQ.questionNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {evalQ.topic}
                      </span>
                      {evalQ.topicHi && (
                        <span className="hidden sm:inline-block text-[11px] text-slate-500 font-devanagari">
                          ({evalQ.topicHi})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {evalQ.isCorrect ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Correct ({evalQ.displayMarksAwarded})
                        </span>
                      ) : evalQ.isIncorrect ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" /> Incorrect ({evalQ.displayMarksAwarded})
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                          Unanswered (0)
                        </span>
                      )}

                      {/* Bookmark (⭐) to Revision Bank */}
                      <button
                        type="button"
                        onClick={() => togglePinQuestion(evalQ.questionId)}
                        className={`no-print px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isPinned
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-2xs'
                            : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                        title={isPinned ? 'Pinned to My Revision (Click to remove)' : 'Pin to My Revision / रिवीज़न में जोड़ें'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
                        <span className="hidden sm:inline">{isPinned ? 'Pinned ⭐' : 'Pin ⭐'}</span>
                      </button>

                      <button
                        onClick={() => toggleExpand(evalQ.questionId)}
                        className="no-print p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
                        title={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="space-y-2 mb-4">
                    {(languageMode === 'en' || languageMode === 'both') && (
                      <p className="text-sm font-medium text-slate-900 leading-relaxed">
                        {q.questionTextEn}
                      </p>
                    )}
                    {(languageMode === 'hi' || languageMode === 'both') && (
                      <p className={`text-sm text-slate-800 font-devanagari leading-relaxed ${
                        languageMode === 'both' ? 'text-slate-700 pt-1' : ''
                      }`}>
                        {q.questionTextHi}
                      </p>
                    )}
                  </div>

                  {/* Options with Answer Highlight */}
                  {isExpanded && (
                    <div className="space-y-2 mb-4">
                      {q.optionsEn.map((optEn, optIdx) => {
                        const optHi = q.optionsHi[optIdx];
                        const isCorrectOption = optIdx === q.correctOptionIndex;
                        const isUserChoice = evalQ.userChoice === optIdx;

                        let borderClass = 'border-slate-200 bg-white';
                        let badge = null;

                        if (isCorrectOption) {
                          borderClass = 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-400/40';
                          badge = (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                              Correct Answer / सही उत्तर
                            </span>
                          );
                        } else if (isUserChoice && !isCorrectOption) {
                          borderClass = 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-400/40';
                          badge = (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                              Your Choice / आपका चयन (Incorrect)
                            </span>
                          );
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${borderClass}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2.5">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                                  isCorrectOption
                                    ? 'bg-emerald-600 text-white'
                                    : isUserChoice
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {optionLabels[optIdx]}
                                </span>
                                <div>
                                  {(languageMode === 'en' || languageMode === 'both') && (
                                    <div className="font-medium text-slate-800">{optEn}</div>
                                  )}
                                  {(languageMode === 'hi' || languageMode === 'both') && (
                                    <div className={`font-devanagari text-slate-700 ${
                                      languageMode === 'both' ? 'text-[11px] pt-0.5 text-slate-600' : ''
                                    }`}>
                                      {optHi}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {badge}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Statutory Legal Explanation Box */}
                  {isExpanded && (
                    <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl space-y-1.5 text-xs">
                      <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Statutory Explanation / विधिक व्याख्या</span>
                      </div>
                      {(languageMode === 'en' || languageMode === 'both') && (
                        <p className="text-indigo-900/90 leading-relaxed">
                          {q.explanationEn}
                        </p>
                      )}
                      {(languageMode === 'hi' || languageMode === 'both') && (
                        <p className="text-indigo-900/90 font-devanagari leading-relaxed pt-1 border-t border-indigo-200/50">
                          {q.explanationHi}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="no-print pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
          <button
            type="button"
            onClick={handleSwitchExamHome}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Switch Exam / Home Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownloadPDF('all')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Solutions PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
