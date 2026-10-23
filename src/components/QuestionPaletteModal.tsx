import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { QuestionState } from '../types/quiz';
import { X, CheckCircle2, Bookmark, EyeOff, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitClick: () => void;
}

export const QuestionPaletteModal: React.FC<Props> = ({ isOpen, onClose, onSubmitClick }) => {
  const {
    session,
    currentQuestions,
    jumpToQuestion,
    isQuestionPinned
  } = useQuiz();

  if (!isOpen || !session) return null;

  // Compute status counts
  let answeredCount = 0;
  let notAnsweredCount = 0;
  let notVisitedCount = 0;
  let markedCount = 0;
  let answeredAndMarkedCount = 0;

  currentQuestions.forEach(q => {
    const state = session.states[q.id] || 'not_visited';
    if (state === 'answered') answeredCount++;
    else if (state === 'not_answered') notAnsweredCount++;
    else if (state === 'not_visited') notVisitedCount++;
    else if (state === 'marked_for_review') markedCount++;
    else if (state === 'answered_and_marked') answeredAndMarkedCount++;
  });

  const getStatusBadgeStyle = (state: QuestionState, isCurrent: boolean) => {
    let base = 'w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer relative ';

    if (isCurrent) {
      base += 'ring-3 ring-indigo-500 ring-offset-2 scale-105 z-10 ';
    }

    switch (state) {
      case 'answered':
        return base + 'bg-emerald-600 text-white shadow-xs';
      case 'not_answered':
        return base + 'bg-rose-500 text-white shadow-xs';
      case 'marked_for_review':
        return base + 'bg-purple-600 text-white shadow-xs';
      case 'answered_and_marked':
        return base + 'bg-purple-700 text-white shadow-xs';
      case 'not_visited':
      default:
        return base + 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end md:items-center md:justify-center p-0 md:p-4">
      {/* Drawer on mobile, centered modal on desktop */}
      <div 
        className="w-full max-w-md h-[88vh] md:h-auto md:max-h-[90vh] bg-white rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Question Palette / प्रश्न तालिका
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Attempted: {answeredCount} / {currentQuestions.length} • Total {currentQuestions.length} Questions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-4 py-3 bg-white border-b border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {answeredCount}
            </span>
            <span>Answered / उत्तरित</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {notAnsweredCount}
            </span>
            <span>Not Answered / अनुत्तरित</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {markedCount}
            </span>
            <span>Marked for Review / समीक्षा</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-purple-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 relative">
              {answeredAndMarkedCount}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
            </span>
            <span>Ans & Marked / उत्तरित व समीक्षा</span>
          </div>

          <div className="flex items-center gap-1.5 col-span-2">
            <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
              {notVisitedCount}
            </span>
            <span>Not Visited / अभी तक नहीं देखा गया</span>
          </div>
        </div>

        {/* Question Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
            {currentQuestions.map((q, idx) => {
              const state = session.states[q.id] || 'not_visited';
              const isCurrent = session.currentQuestionIndex === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    jumpToQuestion(idx);
                    onClose();
                  }}
                  className={getStatusBadgeStyle(state, isCurrent)}
                  title={`Question ${idx + 1}: ${state}${isQuestionPinned(q.id) ? ' (Pinned ⭐)' : ''}`}
                >
                  <span>{idx + 1}</span>
                  {isQuestionPinned(q.id) && (
                    <span className="absolute -top-1.5 -left-1 text-[11px] text-amber-300 font-bold leading-none drop-shadow-xs select-none">
                      ★
                    </span>
                  )}
                  {state === 'answered_and_marked' && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 rounded-xl text-xs font-semibold"
          >
            Back to Question
          </button>
          <button
            onClick={() => {
              onClose();
              onSubmitClick();
            }}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            Submit Test / जमा करें
          </button>
        </div>
      </div>
    </div>
  );
};
