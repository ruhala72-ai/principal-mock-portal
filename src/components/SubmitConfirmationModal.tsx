import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { AlertCircle, Clock, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export const SubmitConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirmSubmit
}) => {
  const { session, currentQuestions } = useQuiz();

  if (!isOpen || !session) return null;

  const total = currentQuestions.length;
  let answered = 0;
  let marked = 0;
  let unanswered = 0;

  currentQuestions.forEach(q => {
    const isAns = session.answers[q.id] !== undefined;
    const st = session.states[q.id];
    if (isAns) answered++;
    else unanswered++;

    if (st === 'marked_for_review' || st === 'answered_and_marked') {
      marked++;
    }
  });

  const minutesRemaining = Math.floor(session.timeRemainingSeconds / 60);
  const secondsRemaining = session.timeRemainingSeconds % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-indigo-700 to-blue-700 px-5 py-4 text-white">
          <h3 className="font-bold text-base flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-200" />
            Submit Mock Test / परीक्षा जमा पुष्टि
          </h3>
          <p className="text-xs text-indigo-100 mt-0.5">
            Please verify your attempt summary before final submission.
          </p>
        </div>

        <div className="p-5">
          {/* Time Remaining Pill */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs mb-4">
            <span className="text-slate-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-slate-500" />
              Time Remaining / शेष समय:
            </span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              {String(minutesRemaining).padStart(2, '0')}:{String(secondsRemaining).padStart(2, '0')}
            </span>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Total Questions</span>
              <span className="text-base font-bold text-slate-800">{total}</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-700 text-[11px] block font-medium">Answered (उत्तरित)</span>
              <span className="text-base font-bold text-emerald-800">{answered}</span>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
              <span className="text-purple-700 text-[11px] block font-medium">Marked for Review</span>
              <span className="text-base font-bold text-purple-800">{marked}</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-rose-700 text-[11px] block font-medium">Unanswered (अनुत्तरित)</span>
              <span className="text-base font-bold text-rose-800">{unanswered}</span>
            </div>
          </div>

          {unanswered > 0 && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                You have <strong>{unanswered} unanswered</strong> questions. Once submitted, you cannot resume or edit answers.
              </p>
            </div>
          )}

          <p className="text-xs text-slate-500 text-center mb-5">
            क्या आप वाकई परीक्षा समाप्त करना चाहते हैं?
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Resume Test
            </button>
            <button
              onClick={onConfirmSubmit}
              className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Yes, Submit Final
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
