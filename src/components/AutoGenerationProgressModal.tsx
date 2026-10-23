import React from 'react';
import { AutoGenerationProgress } from '../utils/autoMockPoolGenerator';
import { Sparkles, CheckCircle2, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  progress: AutoGenerationProgress | null;
  examTitle?: string;
}

export const AutoGenerationProgressModal: React.FC<Props> = ({
  isOpen,
  progress,
  examTitle = 'UPSC Principal & Vice Principal CRT'
}) => {
  if (!isOpen || !progress) return null;

  const {
    currentChunk,
    totalChunks,
    generatedCount,
    targetCount,
    progressPercent,
    statusMessage
  } = progress;

  const isComplete = progressPercent >= 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
            {isComplete ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            ) : (
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-100" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                1-Click Auto Generator
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Zero-Repeat Verified
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              {isComplete ? 'Mock Test Pool Ready!' : 'Synthesizing 120-Question Pool'}
            </h3>
          </div>
        </div>

        {/* Exam Title */}
        <p className="text-xs text-slate-600">
          Preparing authentic, zero-repeat bilingual MCQs for <strong>{examTitle}</strong> according to the official prescribed syllabus.
        </p>

        {/* Progress Display Bar */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              {statusMessage || `Auto-generating unique question pool: ${generatedCount}/${targetCount} complete`}
            </span>
            <span className="font-mono font-bold text-indigo-600 text-sm">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Step Badges (Chunks 1 - 4) */}
          <div className="grid grid-cols-4 gap-1.5 pt-2 text-center text-[10px]">
            {[1, 2, 3, 4].map(chunkNum => {
              const chunkDone = currentChunk >= chunkNum;
              const isCurrent = currentChunk === chunkNum && !isComplete;
              return (
                <div
                  key={chunkNum}
                  className={`p-1.5 rounded-lg border font-semibold transition-all ${
                    chunkDone
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : isCurrent
                      ? 'bg-indigo-50 text-indigo-900 border-indigo-300 animate-pulse'
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}
                >
                  <div>Chunk {chunkNum}</div>
                  <div className="text-[9px] font-normal">{chunkNum * 30} Qs</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info footer */}
        <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            {isComplete
              ? 'Questions stored in persistent local storage. Launching CBT exam simulation with official marking (+2.5, -0.833)...'
              : 'Each question is validated with primary statutory citations, bilingual Devanagari Hindi text, and zero-repeat fingerprint registration.'}
          </span>
        </div>

      </div>
    </div>
  );
};
