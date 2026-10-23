import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { EXAM_CONFIGS } from '../data/seedQuestions';
import { PracticeDisclaimerBanner } from './PracticeDisclaimerBanner';
import { QuestionPaletteModal } from './QuestionPaletteModal';
import { SubmitConfirmationModal } from './SubmitConfirmationModal';
import {
  Clock,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Star
} from 'lucide-react';

interface Props {
  onTestSubmitted: () => void;
}

export const ExamEngine: React.FC<Props> = ({ onTestSubmitted }) => {
  const {
    session,
    currentQuestions,
    currentQuestion,
    currentQuestionState,
    languageMode,
    setLanguageMode,
    examConfigs,
    selectOption,
    clearOption,
    toggleMarkForReview,
    saveAndNext,
    previousQuestion,
    submitTest,
    togglePinQuestion,
    isQuestionPinned
  } = useQuiz();

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  if (!session || !currentQuestion) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No Active Exam Session</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          Please select an exam section and start a new mock test.
        </p>
      </div>
    );
  }

  const targetExam = session.examType === 'uppcs-principal' ? 'up-aided-principal' : session.examType;
  const examConfig = examConfigs[targetExam] || EXAM_CONFIGS[targetExam];
  const currentIndex = session.currentQuestionIndex;
  const totalQuestions = currentQuestions.length;
  const currentSelectedOption = session.answers[currentQuestion.id];
  const answeredCount = Object.values(session.answers).filter(val => val !== undefined && val !== null).length;
  const isPinned = isQuestionPinned(currentQuestion.id);

  // Time format
  const hours = Math.floor(session.timeRemainingSeconds / 3600);
  const minutes = Math.floor((session.timeRemainingSeconds % 3600) / 60);
  const seconds = session.timeRemainingSeconds % 60;
  const isTimeCritical = session.timeRemainingSeconds < 300; // < 5 mins

  const handleFinalSubmit = () => {
    setIsSubmitModalOpen(false);
    submitTest();
    onTestSubmitted();
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] bg-slate-50">
      {/* 1. Practice Questions Advisory Bar */}
      <PracticeDisclaimerBanner compact={true} />

      {/* 2. Exam Sub-Header: Timer, Exam Name, Palette Toggle */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 flex items-center justify-between sticky top-[57px] z-20 shadow-xs">
        {/* Left: Exam Badge & Question Count */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md text-xs font-semibold truncate max-w-[140px] sm:max-w-none">
            {examConfig.titleEn}
          </span>
          {session.isPracticeMode && (
            <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-[10px] font-bold">
              Practice Mode ({totalQuestions} Qs)
            </span>
          )}
          {/* Active Session Counter: strictly displays 0 / 120 at test launch */}
          <span 
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-2xs"
            title="Questions Attempted / Total Questions"
            data-testid="session-counter"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Attempted: {answeredCount} / {totalQuestions}</span>
          </span>
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md" title="Current Question Position">
            Q {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Center: Real-time Countdown Timer */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs sm:text-sm font-bold border transition-colors ${
          isTimeCritical
            ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
            : 'bg-slate-50 text-slate-800 border-slate-300'
        }`}>
          <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-slate-500'}`} />
          <span>
            {hours > 0 ? `${String(hours).padStart(2, '0')}:` : ''}
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Palette Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors"
          >
            <LayoutGrid className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Question Palette</span>
            <span className="sm:hidden">Palette</span>
          </button>
        </div>
      </div>

      {/* 3. Main Question Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6 pb-24">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Question Header & Tags */}
          <div className="px-4 sm:px-6 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700 text-sm">
                Question {currentIndex + 1}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                {currentQuestion.topic}
              </span>
              <span className={`px-2 py-0.5 rounded font-medium border ${
                currentQuestion.difficulty === 'Hard'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : currentQuestion.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-medium flex-wrap">
              <span className="text-emerald-700 font-semibold">
                +{examConfig.totalMarksPerQuestion} Marks
              </span>
              <span>•</span>
              <span className="text-rose-600 font-semibold">
                -{examConfig.negativeMarksPerQuestion.toFixed(2)} Neg. (-⅓)
              </span>

              {/* Bookmark (⭐) for Persistent Revision Bank */}
              <button
                type="button"
                onClick={() => togglePinQuestion(currentQuestion.id)}
                className={`ml-1 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isPinned
                    ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
                title={isPinned ? 'Pinned to My Revision (Click to remove)' : 'Pin to My Revision / रिवीज़न सूची में जोड़ें'}
              >
                <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
                <span>{isPinned ? 'Pinned ⭐' : 'Pin ⭐'}</span>
              </button>
            </div>
          </div>

          {/* Question Stem */}
          <div className="p-4 sm:p-6 space-y-3">
            {/* English View */}
            {(languageMode === 'en' || languageMode === 'both') && (
              <div className="text-slate-900 text-sm sm:text-base font-medium leading-relaxed">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  English
                </span>
                {currentQuestion.questionTextEn}
              </div>
            )}

            {/* Hindi View */}
            {(languageMode === 'hi' || languageMode === 'both') && (
              <div className={`text-slate-900 text-sm sm:text-base font-normal leading-relaxed ${
                languageMode === 'both' ? 'pt-3 border-t border-slate-100 font-devanagari text-slate-800' : ''
              }`}>
                {languageMode === 'both' && (
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    हिन्दी अनुवाद
                  </span>
                )}
                {currentQuestion.questionTextHi}
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="px-4 sm:px-6 pb-6 pt-1 space-y-2.5">
            {optionLabels.map((label, optIdx) => {
              const isSelected = currentSelectedOption === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => selectOption(optIdx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                  }`}
                >
                  {/* Radio Bubble */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs transition-colors ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-slate-600 bg-white'
                  }`}>
                    {label}
                  </div>

                  {/* Option Content */}
                  <div className="flex-1 space-y-1">
                    {(languageMode === 'en' || languageMode === 'both') && (
                      <div className={`text-xs sm:text-sm ${isSelected ? 'font-semibold text-indigo-950' : 'text-slate-800'}`}>
                        {currentQuestion.optionsEn[optIdx]}
                      </div>
                    )}
                    {(languageMode === 'hi' || languageMode === 'both') && (
                      <div className={`text-xs sm:text-sm font-devanagari ${
                        isSelected ? 'font-medium text-indigo-900' : 'text-slate-700'
                      } ${languageMode === 'both' ? 'text-slate-600 pt-0.5' : ''}`}>
                        {currentQuestion.optionsHi[optIdx]}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Question State Indicator */}
          <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Status:</span>
              <span className={`font-semibold capitalize ${
                currentQuestionState === 'answered'
                  ? 'text-emerald-600'
                  : currentQuestionState === 'marked_for_review' || currentQuestionState === 'answered_and_marked'
                  ? 'text-purple-600'
                  : 'text-slate-600'
              }`}>
                {currentQuestionState.replace(/_/g, ' ')}
              </span>
            </div>
            {currentSelectedOption !== undefined && (
              <span className="text-emerald-600 font-medium">
                Option {optionLabels[currentSelectedOption]} Selected
              </span>
            )}
          </div>
        </div>
      </main>

      {/* 4. Sticky Bottom Action Footer (Optimized for Android Thumb Touch) */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 sm:px-6 py-2 sm:py-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Mark for review & Clear response */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMarkForReview}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                currentQuestionState === 'marked_for_review' || currentQuestionState === 'answered_and_marked'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
              }`}
              title="Mark or Unmark for Review"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">
                {currentQuestionState === 'marked_for_review' || currentQuestionState === 'answered_and_marked'
                  ? 'Unmark Review'
                  : 'Mark for Review'}
              </span>
            </button>

            {/* Persistent Revision Star Button */}
            <button
              onClick={() => togglePinQuestion(currentQuestion.id)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                isPinned
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
              title={isPinned ? 'Pinned to My Revision (Click to remove)' : 'Pin to My Revision / रिवीज़न में जोड़ें'}
            >
              <Star className={`w-4 h-4 ${isPinned ? 'fill-amber-400 text-amber-500' : 'text-amber-600'}`} />
              <span className="hidden sm:inline">{isPinned ? 'Pinned ⭐' : 'Pin ⭐'}</span>
            </button>

            {currentSelectedOption !== undefined && (
              <button
                onClick={clearOption}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center gap-1.5 transition-colors"
                title="Clear selected option"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Right: Prev, Save & Next, Final Submit */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              className="px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              onClick={saveAndNext}
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center gap-1"
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Save & Review' : 'Save & Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuestionPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSubmitClick={() => setIsSubmitModalOpen(true)}
      />

      <SubmitConfirmationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleFinalSubmit}
      />
    </div>
  );
};
