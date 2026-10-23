import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ExamType } from '../types/quiz';
import { EXAM_CONFIGS } from '../data/seedQuestions';
import { OFFICIAL_SYLLABUS_DATABASE } from '../data/syllabusDatabase';
import { AutoGenerationProgressModal } from './AutoGenerationProgressModal';
import { AutoGenerationProgress } from '../utils/autoMockPoolGenerator';
import {
  FileText,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  Play,
  Sliders,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  examType: ExamType;
  onClose: () => void;
  onConfirmStart: (examType: ExamType, targetCount: number, durationMinutes: number, isPracticeMode: boolean) => void;
  onOpenAdmin: () => void;
}

export const ExamInstructionsModal: React.FC<Props> = ({
  isOpen,
  examType,
  onClose,
  onConfirmStart,
  onOpenAdmin
}) => {
  const {
    questions,
    examConfigs,
    getUsageStats,
    resetExamUsage,
    autoGenerateAndLaunch120Test
  } = useQuiz();

  const [selectedLength, setSelectedLength] = useState<number>(120);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [autoProgress, setAutoProgress] = useState<AutoGenerationProgress | null>(null);

  if (!isOpen) return null;

  const targetExam: ExamType = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
  const config = examConfigs[targetExam] || EXAM_CONFIGS[targetExam];
  const syllabusDb = OFFICIAL_SYLLABUS_DATABASE[targetExam === 'upsc-principal' ? 'upsc-principal' : 'up-aided-principal'];

  const stats = getUsageStats(targetExam);
  const isSufficient = stats.eligibleRemaining >= selectedLength;

  const marksPerQ = config.totalMarksPerQuestion || 2.5;
  const maxMarks = (selectedLength * marksPerQ).toFixed(1);
  const duration = selectedLength; // standard 1 minute per question (120 mins for 120 questions)

  const handleStartFull = () => {
    onConfirmStart(targetExam, selectedLength, duration, false);
  };

  const handleAutoGenerateAndStartFull = async () => {
    setIsAutoGenerating(true);
    try {
      const result = await autoGenerateAndLaunch120Test(
        targetExam,
        selectedLength,
        (progress) => setAutoProgress(progress)
      );

      if (result.started) {
        setTimeout(() => {
          setIsAutoGenerating(false);
          onClose();
          onConfirmStart(targetExam, selectedLength, duration, false);
        }, 400);
      } else {
        setIsAutoGenerating(false);
      }
    } catch (e) {
      setIsAutoGenerating(false);
    }
  };

  const handleStartPracticeShort = () => {
    const practiceCount = Math.max(1, Math.min(stats.eligibleRemaining, selectedLength));
    onConfirmStart(targetExam, practiceCount, practiceCount, true);
  };

  const handleResetUsage = () => {
    resetExamUsage(targetExam);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  Pre-Exam Instructions & Syllabus Verification
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                  config.officialDoc.verificationStatus === 'Verified'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                }`}>
                  {config.officialDoc.verificationStatus}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-md">
                {config.titleEn}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          
          {/* Official Document Reference Card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-semibold text-slate-900">
                Recruiting Authority: <strong>{config.officialDoc.recruitingAuthority}</strong>
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                Advt: {config.officialDoc.advertisementNumber}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Post: <strong>{config.officialDoc.exactPostName}</strong> • Official Source:{' '}
              <a
                href={config.officialDoc.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline font-medium inline-flex items-center gap-0.5"
              >
                Notification Portal <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            {config.officialDoc.verificationStatus !== 'Verified' && (
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Pending Official Verification:</strong> The official written examination pattern for this post is under administrative review. The test configuration below operates as a practice simulation.
                </span>
              </div>
            )}
          </div>

          {/* Official Section / Unit Architecture Notice */}
          {targetExam === 'up-aided-principal' ? (
            <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-700" />
                  Prescribed 30 + 30 + 60 Section Distribution (12 Units):
                </span>
                <button
                  type="button"
                  onClick={() => setShowBlueprint(!showBlueprint)}
                  className="text-[11px] text-indigo-700 font-semibold hover:underline cursor-pointer"
                >
                  {showBlueprint ? 'Hide Blueprint' : 'View Section Blueprint'}
                </button>
              </div>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                • <strong>Section I (30 Qs):</strong> General Studies, History, Polity, Geography, Science & ICT (Units 1, 2, 3)<br />
                • <strong>Section II (30 Qs):</strong> Language Competence — General Hindi (15 Qs) & General English (15 Qs) (Units 4, 5)<br />
                • <strong>Section III (60 Qs):</strong> Educational Leadership, UP 1921 Act, Administration, Financial Rules & Schemes (Units 6 to 12)
              </p>

              {showBlueprint && (
                <div className="mt-2 pt-2 border-t border-indigo-200 text-[11px] text-slate-700 space-y-1 max-h-40 overflow-y-auto">
                  {syllabusDb?.sections.map(sec => (
                    <div key={sec.id} className="p-1.5 bg-white rounded border border-indigo-100">
                      <span className="font-bold text-slate-900">{sec.titleEn}</span> ({sec.prescribedQuestionCount} Qs)
                      <ul className="list-disc list-inside text-slate-600 pl-1 text-[10px]">
                        {sec.units.map(u => (
                          <li key={u.id}>{u.nameEn} ({u.expectedQuestionCount} Qs)</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  UPSC CRT Scheme: 8 Prescribed Syllabus Areas (120 Qs):
                </span>
                <button
                  type="button"
                  onClick={() => setShowBlueprint(!showBlueprint)}
                  className="text-[11px] text-indigo-700 font-semibold hover:underline cursor-pointer"
                >
                  {showBlueprint ? 'Hide Blueprint' : 'View Area Blueprint'}
                </button>
              </div>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                Covers GK & Contemporary Issues, Hindi & English Skills, Reasoning & Quant, Educational Policies & Evaluation, Management & Financial Administration, Office Procedure, Pedagogy in Education, and Digital Literacy.
              </p>

              {showBlueprint && (
                <div className="mt-2 pt-2 border-t border-indigo-200 text-[11px] text-slate-700 space-y-1 max-h-40 overflow-y-auto">
                  {config.topics.map(t => (
                    <div key={t.id} className="p-1.5 bg-white rounded border border-indigo-100 flex items-center justify-between">
                      <span className="font-medium text-slate-900">{t.nameEn}</span>
                      <span className="text-[10px] font-bold text-indigo-600">15 Questions</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 1. VISIBLE TEST-LENGTH SELECTOR (120, 130, 140, 150) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Select Full-Length Test Question Count:</span>
              </label>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Default: 120 Questions
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[120, 130, 140, 150].map(count => {
                const marks = (count * marksPerQ).toFixed(1);
                const isSelected = selectedLength === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedLength(count)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-base font-extrabold text-slate-900">
                      {count} Qs
                    </div>
                    <div className="text-[11px] font-bold text-indigo-600">
                      {marks} Marks
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {count} Mins
                    </div>
                    {count === 120 && (
                      <span className="inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                        Official Pattern
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Parameters Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Questions
              </span>
              <span className="text-lg font-extrabold text-slate-900">{selectedLength}</span>
              <span className="text-[10px] text-slate-500 block">MCQs</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Maximum Marks
              </span>
              <span className="text-lg font-extrabold text-indigo-600">{maxMarks}</span>
              <span className="text-[10px] text-slate-500 block">({selectedLength} × {marksPerQ})</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Duration
              </span>
              <span className="text-lg font-extrabold text-slate-900">{duration}</span>
              <span className="text-[10px] text-slate-500 block">Minutes (2h 00m)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Negative Marking
              </span>
              <span className="text-lg font-extrabold text-rose-600">-0.833</span>
              <span className="text-[10px] text-slate-500 block">One-third ({marksPerQ} / 3)</span>
            </div>
          </div>

          {/* Bank Availability Live Check */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">
                Question Bank Pre-Flight & Zero-Repeat Readiness:
              </span>
              <span className="font-semibold text-slate-600">
                {stats.approvedCount} in Bank • <strong className="text-emerald-700">{stats.eligibleRemaining} Unused</strong>
              </span>
            </div>

            {isSufficient ? (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    Zero-Repeat Full-Length Test Ready ({stats.maxFullLengthPossible} full tests available)
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    {stats.eligibleRemaining} distinct unused syllabus questions are eligible. Exactly <strong>{selectedLength}</strong> unique questions will be loaded with no repetitions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">
                      Insufficient Unused Questions for Zero-Repeat Full Test ({stats.eligibleRemaining} / {selectedLength})
                    </p>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                      You have previously taken {stats.usedCount} questions. Under the Absolute No-Repeat Policy, questions are not recycled automatically.
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAdmin();
                    }}
                    className="px-3 py-1.5 bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Open Admin & Question Generator
                  </button>
                  <button
                    type="button"
                    onClick={handleStartPracticeShort}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Practice with {stats.eligibleRemaining} Remaining Qs
                  </button>
                  <button
                    type="button"
                    onClick={handleResetUsage}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-rose-700 border border-rose-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reset Usage History
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* General Instructions */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Examination Rules & Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>
                <strong>Countdown Timer:</strong> Begins counting down immediately upon clicking &quot;Start Test&quot;.
              </li>
              <li>
                <strong>Marking Scheme:</strong> +2.5 marks for each correct response, -0.833 (2.5/3) deduction for each incorrect response, and 0 for unattempted.
              </li>
              <li>
                <strong>Bilingual Interface:</strong> Switch anytime between English, Hindi, or Dual mode during the examination.
              </li>
              <li>
                <strong>Question Palette & Section Filter:</strong> Navigate freely across questions and sections.
              </li>
              <li>
                <strong>Auto-Submission:</strong> The examination will automatically submit when the countdown reaches 00:00:00.
              </li>
            </ul>
          </div>

          {/* Acknowledgement Checkbox */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={e => setHasAcknowledged(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 mt-0.5 cursor-pointer"
              />
              <span className="text-xs text-slate-700 leading-snug">
                I have read and understood all the instructions, the selected test length ({selectedLength} questions • {maxMarks} marks), and the negative marking rules.
              </span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {isSufficient ? (
              <button
                type="button"
                disabled={!hasAcknowledged}
                onClick={handleStartFull}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Start Full-Length Mock Test ({selectedLength} Qs)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!hasAcknowledged || isAutoGenerating}
                onClick={handleAutoGenerateAndStartFull}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isAutoGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Auto-Generating ({autoProgress?.generatedCount || 0}/120)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate & Start Full Mock Test (120 Qs)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 1-Click Automated 120-Question Pool Generator Progress Modal */}
      <AutoGenerationProgressModal
        isOpen={isAutoGenerating}
        progress={autoProgress}
        examTitle={config.titleEn}
      />
    </div>
  );
};
