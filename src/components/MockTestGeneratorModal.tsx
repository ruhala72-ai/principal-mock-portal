import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ExamType, DifficultyLevel, HistoryAuditReport } from '../types/quiz';
import { EXAM_CONFIGS } from '../data/seedQuestions';
import { OFFICIAL_SYLLABUS_DATABASE } from '../data/syllabusDatabase';
import { loadUsageRegistry } from '../utils/questionUsageRegistry';
import { HistoryAuditModal } from './HistoryAuditModal';
import { QuestionGeneratorModal } from './QuestionGeneratorModal';
import { AutoGenerationProgressModal } from './AutoGenerationProgressModal';
import { AutoGenerationProgress } from '../utils/autoMockPoolGenerator';
import {
  Sparkles,
  Sliders,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  X,
  RotateCcw,
  Plus,
  Play,
  Layers,
  BookOpen,
  Calendar,
  History,
  ShieldCheck,
  Zap,
  Info,
  RefreshCw
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (examType: ExamType) => void;
  onOpenAdmin: () => void;
  initialExam?: ExamType;
}

export const MockTestGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onStartExam,
  onOpenAdmin,
  initialExam = 'upsc-principal'
}) => {
  const {
    questions,
    activeExam,
    setActiveExam,
    examConfigs,
    startTest,
    autoGenerate120Pool,
    autoGenerateAndLaunch120Test,
    resetExamUsage,
    getUsageStats,
    importUsageHistory
  } = useQuiz();

  const [selectedExam, setSelectedExam] = useState<ExamType>(
    initialExam === 'uppcs-principal' ? 'up-aided-principal' : initialExam
  );
  const [activeMode, setActiveMode] = useState<'simulation' | 'custom'>('simulation');

  // Audit Report State
  const [auditReport, setAuditReport] = useState<HistoryAuditReport | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isQuestionGenModalOpen, setIsQuestionGenModalOpen] = useState(false);

  // Automated 120-Question Pool Generator State
  const [isAutoGenerating, setIsAutoGenerating] = useState<boolean>(false);
  const [autoProgress, setAutoProgress] = useState<AutoGenerationProgress | null>(null);

  // Custom Practice parameters
  const [customCount, setCustomCount] = useState<number>(30);
  const [customDuration, setCustomDuration] = useState<number>(30);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'standard' | 'difficult_focus' | 'balanced'>('standard');
  const [enforceZeroRepeat, setEnforceZeroRepeat] = useState<boolean>(true);

  // Full length test length (120 default, 130, 140, 150)
  const [simLength, setSimLength] = useState<number>(120);

  // Reset confirmation state
  const [isConfirmingReset, setIsConfirmingReset] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Registry usage stats
  const stats = useMemo(() => {
    return getUsageStats(selectedExam);
  }, [selectedExam, questions, getUsageStats, isOpen]);

  // Registry test history
  const registry = useMemo(() => {
    if (!isOpen) return null;
    return loadUsageRegistry();
  }, [isOpen, selectedExam]);

  const pastTests = useMemo(() => {
    if (!registry) return [];
    return registry.testHistory.filter(t => t.examType === selectedExam);
  }, [registry, selectedExam]);

  if (!isOpen) return null;

  const targetConfig = examConfigs[selectedExam] || EXAM_CONFIGS[selectedExam];
  const syllabusDb = OFFICIAL_SYLLABUS_DATABASE[selectedExam === 'upsc-principal' ? 'upsc-principal' : 'up-aided-principal'];

  const marksPerQ = targetConfig.totalMarksPerQuestion || 2.5;
  const simMaxMarks = (simLength * marksPerQ).toFixed(1);

  // Launch Simulation (One-Click Automatic 120-Question Generator)
  const handleLaunchSimulation = async () => {
    setErrorMessage(null);

    // If remaining eligible questions are fewer than the simulation target,
    // trigger the automated 4-chunk loop (30 bilingual questions per chunk)
    if (stats.eligibleRemaining < simLength) {
      setIsAutoGenerating(true);
      try {
        const result = await autoGenerateAndLaunch120Test(
          selectedExam,
          simLength,
          (progress) => setAutoProgress(progress)
        );

        if (result.started) {
          setTimeout(() => {
            setIsAutoGenerating(false);
            onClose();
            onStartExam(selectedExam);
          }, 400);
        } else {
          setIsAutoGenerating(false);
          setErrorMessage(result.warning || 'Failed to auto-generate 120-question mock test.');
        }
      } catch (e) {
        setIsAutoGenerating(false);
        setErrorMessage('Unexpected error during automated question generation.');
      }
      return;
    }

    const result = startTest(
      selectedExam,
      simLength,
      simLength,
      false, // Full simulation
      {
        difficultyPreset: 'standard',
        enforceZeroRepeat: true,
        testTitle: `${targetConfig.titleEn} — Full Mock Simulation #${stats.testsCreated + 1}`
      }
    );

    if (result.started) {
      onClose();
      onStartExam(selectedExam);
    } else {
      setErrorMessage(result.warning || 'Failed to generate mock test.');
    }
  };

  // Launch Custom Practice
  const handleLaunchCustom = () => {
    setErrorMessage(null);
    const effectiveCount = Math.min(customCount, enforceZeroRepeat ? stats.eligibleRemaining : stats.approvedCount);
    
    if (effectiveCount === 0) {
      setErrorMessage('No questions available with current filters. Please reset usage history or add questions in Admin.');
      return;
    }

    const result = startTest(
      selectedExam,
      customDuration,
      effectiveCount,
      true, // Practice mode
      {
        difficultyPreset: selectedDifficulty,
        enforceZeroRepeat,
        testTitle: `${targetConfig.titleEn} — Custom Practice (${effectiveCount} Qs)`
      }
    );

    if (result.started) {
      onClose();
      onStartExam(selectedExam);
    } else {
      setErrorMessage(result.warning || 'Failed to generate custom practice session.');
    }
  };

  const handleResetHistory = () => {
    resetExamUsage(selectedExam);
    setIsConfirmingReset(false);
    setErrorMessage(null);
  };

  const handleRunAudit = () => {
    const report = importUsageHistory();
    setAuditReport(report);
    setIsAuditModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  Unlimited Mock Test Engine
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Zero Repeat Enforced
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Exam Simulation & Practice Generator
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

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          
          {/* Exam Switcher Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => {
                setSelectedExam('upsc-principal');
                setActiveExam('upsc-principal');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedExam === 'upsc-principal'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>UPSC Principal CRT</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedExam('up-aided-principal');
                setActiveExam('up-aided-principal');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedExam === 'up-aided-principal' || selectedExam === 'uppcs-principal'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>UP Inter College Principal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedExam('up-technical-principal');
                setActiveExam('up-technical-principal');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedExam === 'up-technical-principal'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>UP Technical (Pending)</span>
            </button>
          </div>

          {/* Zero-Repeat Live Status Metrics */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero-Repeat Question Bank Status:</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionGenModalOpen(true)}
                  className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Expand question bank with verified statutory questions"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Generate & Import Questions</span>
                </button>
                <button
                  type="button"
                  onClick={handleRunAudit}
                  className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Audit and sync stored practice test history into zero-repeat registry"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Audit & Sync Stored History</span>
                </button>
                <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                  {stats.testsCreated} Mock Tests Generated
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total In Bank</span>
                <span className="text-xl font-extrabold text-slate-900">{stats.totalInBank}</span>
                <span className="text-[10px] text-slate-500 block">{stats.approvedCount} Approved ({stats.pendingCount} Pending)</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Previously Used</span>
                <span className="text-xl font-extrabold text-slate-700">{stats.usedCount}</span>
                <span className="text-[10px] text-slate-500 block">Excluded from next</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unused Eligible</span>
                <span className="text-xl font-extrabold text-emerald-600">{stats.eligibleRemaining}</span>
                <span className="text-[10px] text-emerald-700 font-medium block">100% Unique</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Zero-Repeat Tests</span>
                <span className="text-xl font-extrabold text-indigo-600">{stats.maxFullLengthPossible}</span>
                <span className="text-[10px] text-indigo-700 font-medium block">Full 120-Q Available</span>
              </div>
            </div>

            {/* Visual utilization bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Bank Exhaustion Progress</span>
                <span>{stats.approvedCount > 0 ? Math.round((stats.usedCount / stats.approvedCount) * 100) : 0}% used</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                  style={{
                    width: `${stats.approvedCount > 0 ? Math.min(100, Math.round((stats.usedCount / stats.approvedCount) * 100)) : 0}%`
                  }}
                />
              </div>
            </div>

            {/* Honest Count Reconciliation Footnote */}
            <div className="text-[11px] text-slate-600 font-medium pt-0.5 flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>{stats.reconciliationSummary}</span>
              </span>
            </div>

            {/* Low question advisory & quick action buttons */}
            {!stats.canCreateNext120Test && (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-amber-900 text-xs">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">
                      Zero-Repeat Question Depletion Warning ({stats.eligibleRemaining} / 120 questions remaining)
                    </p>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                      You have used {stats.usedCount} questions in previous tests. To prevent repetition, a full 120-question test requires at least 120 unused questions. Choose one of the options below:
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      setIsAutoGenerating(true);
                      try {
                        await autoGenerate120Pool(selectedExam, (p) => setAutoProgress(p));
                        setTimeout(() => setIsAutoGenerating(false), 400);
                      } catch (e) {
                        setIsAutoGenerating(false);
                      }
                    }}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Generate 120 Questions (4 Chunks)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQuestionGenModalOpen(true)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Generate & Import Questions</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMode('custom');
                      setCustomCount(Math.min(30, stats.eligibleRemaining));
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Practice with Remaining {stats.eligibleRemaining} Qs
                  </button>
                  <button
                    type="button"
                    onClick={handleRunAudit}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <History className="w-3.5 h-3.5 inline mr-1" />
                    Audit & Sync Stored History
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConfirmingReset(true)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-rose-700 border border-rose-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                    Reset Usage History
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Error notice if generation failed */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Reset Confirmation Dialog */}
          {isConfirmingReset && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-2.5">
              <p className="font-bold text-rose-900">
                Confirm Resetting Question Usage History?
              </p>
              <p className="text-rose-800 leading-relaxed text-[11px]">
                This will clear the record of previously served questions for <strong>{targetConfig.titleEn}</strong>. All {stats.approvedCount} approved questions in the bank will immediately become eligible again.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleResetHistory}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg cursor-pointer"
                >
                  Yes, Reset Usage History
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingReset(false)}
                  className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Mode Tabs: Full-Length Simulation vs Custom Practice */}
          <div className="space-y-4">
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveMode('simulation')}
                className={`pb-2 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                  activeMode === 'simulation'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Full-Length Examination Simulation
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('custom')}
                className={`pb-2 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                  activeMode === 'custom'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Custom Practice Mode
              </button>
            </div>

            {/* TAB A: FULL SIMULATION */}
            {activeMode === 'simulation' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-200 text-xs space-y-1.5">
                  <span className="font-bold text-indigo-900 block">
                    Official Statutory Examination Scheme:
                  </span>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    • <strong>Exam:</strong> {targetConfig.titleEn}<br />
                    • <strong>Marking:</strong> +2.5 marks for correct, -0.833 (-⅓) deduction for wrong answer, 0 for unattempted.<br />
                    • <strong>Duration:</strong> 120 Minutes (2 Hours).<br />
                    • <strong>Zero Repeat:</strong> Questions are selected across official syllabus sections without repeating any previously taken questions.
                  </p>
                </div>

                {/* Length selector */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 flex items-center justify-between text-xs">
                    <span>Target Question Count:</span>
                    <span className="text-slate-500 font-normal">Default: 120 Questions</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[120, 130, 140, 150].map(cnt => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setSimLength(cnt)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          simLength === cnt
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-extrabold">{cnt} Qs</div>
                        <div className="text-[10px] text-indigo-600 font-semibold">{cnt * 2.5} Marks</div>
                        <div className="text-[9px] text-slate-400 font-mono">{cnt} Mins</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isAutoGenerating}
                  onClick={handleLaunchSimulation}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAutoGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Auto-Generating 120-Question Pool ({autoProgress?.generatedCount || 0}/120)...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Generate Full-Length Mock Test #{stats.testsCreated + 1} ({simLength} Qs • {simMaxMarks} Marks)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB B: CUSTOM PRACTICE MODE */}
            {activeMode === 'custom' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Question count */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 text-xs">Question Count:</label>
                    <select
                      value={customCount}
                      onChange={e => {
                        const cnt = Number(e.target.value);
                        setCustomCount(cnt);
                        setCustomDuration(cnt); // auto duration
                      }}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                    >
                      {[15, 30, 45, 60, 90, 120].map(c => (
                        <option key={c} value={c}>{c} Questions ({c * 2.5} Marks)</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 text-xs">Duration (Minutes):</label>
                    <select
                      value={customDuration}
                      onChange={e => setCustomDuration(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                    >
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                      <option value={90}>90 Minutes</option>
                      <option value={120}>120 Minutes (Standard)</option>
                    </select>
                  </div>

                  {/* Difficulty Preset */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 text-xs">Difficulty Distribution:</label>
                    <select
                      value={selectedDifficulty}
                      onChange={e => setSelectedDifficulty(e.target.value as any)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                    >
                      <option value="standard">Standard Exam Balance (20% Med, 50% Hard, 30% V.Hard)</option>
                      <option value="difficult_focus">High Challenge Focus (Difficult & Very Difficult)</option>
                      <option value="balanced">Equal Distribution</option>
                    </select>
                  </div>

                  {/* Zero-Repeat Toggle */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 text-xs">Zero-Repeat Policy:</label>
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">Exclude used questions:</span>
                      <input
                        type="checkbox"
                        checked={enforceZeroRepeat}
                        onChange={e => setEnforceZeroRepeat(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLaunchCustom}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Custom Practice ({customCount} Questions • {customDuration} Mins)</span>
                </button>
              </div>
            )}
          </div>

          {/* Past Generated Tests History */}
          {pastTests.length > 0 && (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <History className="w-4 h-4 text-slate-500" />
                  <span>Generated Test History ({pastTests.length} tests)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsConfirmingReset(true)}
                  className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  Clear History
                </button>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-1.5">
                {pastTests.map((t, idx) => (
                  <div
                    key={t.testId || idx}
                    className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] flex items-center justify-between text-slate-700"
                  >
                    <div>
                      <span className="font-semibold text-slate-900">{t.testTitle}</span>
                      <span className="text-slate-400 ml-2">
                        {new Date(t.generatedAt).toLocaleDateString()} {new Date(t.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                      {t.questionCount} Questions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            <span>Zero-Repeat is tracked persistently across browser sessions.</span>
          </div>
        </div>

      </div>

      {/* 1-Click Automated 120-Question Pool Generator Progress Modal */}
      <AutoGenerationProgressModal
        isOpen={isAutoGenerating}
        progress={autoProgress}
        examTitle={targetConfig.titleEn}
      />

      {/* History Audit Report Modal */}
      <HistoryAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        report={auditReport}
        onReRunAudit={handleRunAudit}
      />

      {/* Verified Question Generator & Expansion Modal */}
      <QuestionGeneratorModal
        isOpen={isQuestionGenModalOpen}
        onClose={() => setIsQuestionGenModalOpen(false)}
        initialExam={selectedExam}
      />
    </div>
  );
};
