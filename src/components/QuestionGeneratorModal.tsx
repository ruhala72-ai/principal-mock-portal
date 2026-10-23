import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Question, ExamType, TopicRegistryStat } from '../types/quiz';
import { generateSyllabusPracticeQuestions } from '../utils/syllabusQuestionGenerator';
import {
  checkQuestionUsageStatus,
  loadUsageRegistry,
  getRegistryStats,
  getTopicWiseRegistryStats
} from '../utils/questionUsageRegistry';
import { OFFICIAL_SYLLABUS_DATABASE } from '../data/syllabusDatabase';
import { AutoGenerationProgressModal } from './AutoGenerationProgressModal';
import { AutoGenerationProgress } from '../utils/autoMockPoolGenerator';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Layers,
  ShieldCheck,
  Check,
  Plus,
  RefreshCw,
  Info,
  Scale,
  FileCheck,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Zap
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialExam?: ExamType;
}

export const QuestionGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialExam = 'upsc-principal'
}) => {
  const {
    questions,
    examConfigs,
    importQuestions,
    approveQuestion,
    autoGenerate120Pool
  } = useQuiz();

  const [selectedExam, setSelectedExam] = useState<ExamType>(
    initialExam === 'uppcs-principal' ? 'up-aided-principal' : initialExam
  );
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [topicSearchTerm, setTopicSearchTerm] = useState<string>('');
  const [showAuditTable, setShowAuditTable] = useState<boolean>(true);
  const [expandedTopicRows, setExpandedTopicRows] = useState<Set<string>>(new Set());
  const [batchCount, setBatchCount] = useState<number>(5);
  const [candidateList, setCandidateList] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'warning' | 'info'; text: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAutoGenerating, setIsAutoGenerating] = useState<boolean>(false);
  const [autoProgress, setAutoProgress] = useState<AutoGenerationProgress | null>(null);

  const handleAutoGenerate120 = async () => {
    setIsAutoGenerating(true);
    setStatusMessage(null);
    try {
      const res = await autoGenerate120Pool(selectedExam, (p) => setAutoProgress(p));
      setTimeout(() => {
        setIsAutoGenerating(false);
        setStatusMessage({
          type: 'success',
          text: `Auto-generation complete: 120 verified bilingual questions across all official syllabus topics successfully synthesized and persisted! Eligible unique unused pool is now ${res.totalEligible}.`
        });
      }, 400);
    } catch (e) {
      setIsAutoGenerating(false);
      setStatusMessage({
        type: 'warning',
        text: 'Failed to auto-generate 120 questions.'
      });
    }
  };

  // Topic-wise registry stats for selected exam (all 8 areas)
  const topicStats = useMemo(() => {
    return getTopicWiseRegistryStats(selectedExam, questions);
  }, [selectedExam, questions]);

  // Available topics for selected exam
  const availableTopics = useMemo(() => {
    const cfg = examConfigs[selectedExam];
    return cfg ? cfg.topics.map(t => t.nameEn) : [];
  }, [selectedExam, examConfigs]);

  // Subtopics for currently selected topic
  const availableSubtopics = useMemo(() => {
    if (selectedTopic === 'all') return [];
    const syllabus = OFFICIAL_SYLLABUS_DATABASE[selectedExam];
    const unit = syllabus?.sections?.[0]?.units.find(u =>
      u.nameEn.toLowerCase() === selectedTopic.toLowerCase()
    );
    return unit ? unit.subtopics : [];
  }, [selectedExam, selectedTopic]);

  // Filtered topic stats based on topicSearchTerm
  const filteredTopicStats = useMemo(() => {
    if (!topicSearchTerm.trim()) return topicStats;
    const query = topicSearchTerm.toLowerCase();
    return topicStats.filter(st => {
      const matchTopic = st.topicNameEn.toLowerCase().includes(query) || st.topicNameHi.toLowerCase().includes(query);
      const matchSub = st.subtopics.some(s => s.nameEn.toLowerCase().includes(query) || s.nameHi.toLowerCase().includes(query));
      return matchTopic || matchSub;
    });
  }, [topicStats, topicSearchTerm]);

  // Live registry stats for selected exam
  const currentExamStats = useMemo(() => {
    return getRegistryStats(selectedExam, questions);
  }, [selectedExam, questions]);

  const toggleTopicRow = (topicId: string) => {
    setExpandedTopicRows(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  // Handle generation of candidates
  const handleGenerate = () => {
    setIsGenerating(true);
    setStatusMessage(null);

    try {
      const generated = generateSyllabusPracticeQuestions(
        selectedExam,
        selectedTopic,
        batchCount,
        questions,
        selectedSubtopic !== 'all' ? selectedSubtopic : undefined
      );

      if (generated.length === 0) {
        setStatusMessage({
          type: 'warning',
          text: `All verified statutory templates for this syllabus topic are already present in the question bank. Choose another topic or exam profile.`
        });
        setCandidateList([]);
        setSelectedIds(new Set());
      } else {
        // Run duplicate and usage verification on every candidate
        const reg = loadUsageRegistry();
        const verifiedCandidates = generated.map(q => {
          const usage = checkQuestionUsageStatus(q, selectedExam, reg);
          return {
            ...q,
            isZeroRepeatEligible: !usage.isUsed,
            duplicateReason: usage.reason
          };
        });

        setCandidateList(verifiedCandidates);
        setSelectedIds(new Set(verifiedCandidates.map(q => q.id)));
        setStatusMessage({
          type: 'info',
          text: `Generated ${verifiedCandidates.length} candidate questions grounded in official statutory frameworks. Review sources and choose import mode.`
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'warning',
        text: `Generation error: ${err?.message || 'Failed to generate questions.'}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === candidateList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(candidateList.map(q => q.id)));
    }
  };

  // Import as Pending Verification (Requirement 5)
  const handleImportPending = () => {
    const selected = candidateList.filter(q => selectedIds.has(q.id));
    if (selected.length === 0) return;

    const result = importQuestions(selected, true, true);
    setStatusMessage({
      type: 'success',
      text: `Successfully imported ${result.added} questions as "Pending Verification". Stored in persistent bank (${questions.length + result.added} total). They remain queued for review and will not appear in tests until approved.`
    });
    setCandidateList([]);
    setSelectedIds(new Set());
  };

  // Verify Sources & Approve to Test Bank
  const handleVerifyAndApprove = () => {
    const selected = candidateList.filter(q => selectedIds.has(q.id));
    if (selected.length === 0) return;

    const approvedList = selected.map(q => ({
      ...q,
      isApproved: true,
      sourceInfo: q.sourceInfo ? {
        ...q.sourceInfo,
        verificationStatus: 'Verified' as const,
        verifiedDate: new Date().toISOString().slice(0, 10),
        verifiedBy: 'Administrator Verified'
      } : undefined
    }));

    const result = importQuestions(approvedList, true, false);
    setStatusMessage({
      type: 'success',
      text: `Successfully verified and approved ${result.added} questions directly into the active question bank! Bank expanded to ${questions.length + result.added} questions.`
    });
    setCandidateList([]);
    setSelectedIds(new Set());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  Question Bank Expansion
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Statutory Grounding Enforced
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Generate & Import Syllabus Questions
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

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          
          {/* Statutory Grounding & Environment Notice */}
          <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200 text-indigo-950 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <Scale className="w-4 h-4 text-indigo-600" />
              <span>Primary Statutory Sources & Sandbox Environment Notice:</span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              Questions are synthesized directly from primary statutory authorities: <strong>UPSC CRT Combined Recruitment Scheme</strong>, <strong>UP Intermediate Education Act 1921 & Regulations</strong>, <strong>AICTE Act 1987 & Approval Process Handbooks</strong>, <strong>BTEUP Act 1962</strong>, <strong>CCS (Conduct & Leave) Rules 1964</strong>, and <strong>GFR 2017</strong>.
              Live external search APIs are sandboxed in this environment to prevent fabricated or hallucinated citations.
            </p>
          </div>

          {/* Exam Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              1. Select Target Examination Category:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedExam('upsc-principal');
                  setSelectedTopic('all');
                  setCandidateList([]);
                }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedExam === 'upsc-principal'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">UPSC Principal CRT</span>
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-[10px] text-slate-500 font-normal">
                  8 Prescribed Areas (GK, Hindi, English, Reasoning, Quant, Policy, Admin, Pedagogy)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedExam('up-aided-principal');
                  setSelectedTopic('all');
                  setSelectedSubtopic('all');
                  setCandidateList([]);
                }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedExam === 'up-aided-principal'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">UP Inter College Principal</span>
                  <Layers className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-[10px] text-slate-500 font-normal">
                  12 Prescribed Units (Act 1921, UPSESSB, Service Rules)
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedExam('up-technical-principal');
                  setSelectedTopic('all');
                  setSelectedSubtopic('all');
                  setCandidateList([]);
                }}
                className={`p-3 rounded-xl border text-left font-semibold transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedExam === 'up-technical-principal'
                    ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">UP Technical Education</span>
                  <FileCheck className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-[10px] text-slate-500 font-normal">
                  Polytechnic Principal (AICTE & BTEUP Norms)
                </span>
              </button>
            </div>
          </div>

          {/* Topic & Batch Controls */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  Official Syllabus Area / Subject Domain:
                </label>
                <select
                  value={selectedTopic}
                  onChange={e => {
                    setSelectedTopic(e.target.value);
                    setSelectedSubtopic('all');
                  }}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 truncate"
                >
                  <option value="all">All Topics (Balanced Cross-Unit Batch)</option>
                  {topicStats.map(st => (
                    <option key={st.topicId} value={st.topicNameEn}>
                      {st.unitNumber ? `Area ${st.unitNumber}: ` : ''}{st.topicNameEn} ({st.approvedCount} Approved • {st.eligibleRemaining} Unused Unique)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  Batch Size:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={batchCount}
                    onChange={e => setBatchCount(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                  >
                    <option value={1}>1 Question</option>
                    <option value={3}>3 Questions</option>
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                    <option value={20}>20 Questions</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating || isAutoGenerating}
                    className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-lg shrink-0 cursor-pointer text-xs flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGenerating ? 'Generating...' : 'Generate Batch'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAutoGenerate120}
                    disabled={isAutoGenerating || isGenerating}
                    className="px-3.5 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-lg shrink-0 cursor-pointer text-xs flex items-center gap-1.5 shadow-xs transition-all"
                    title="Synthesize 4 consecutive chunks of 30 bilingual questions until at least 120 questions are accumulated"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Auto 120 Qs</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Operational Subtopic Selection if specific area is selected */}
            {selectedTopic !== 'all' && availableSubtopics.length > 0 && (
              <div className="pt-1">
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  Target Specific Subtopic / Operational Module (Optional):
                </label>
                <select
                  value={selectedSubtopic}
                  onChange={e => setSelectedSubtopic(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                >
                  <option value="all">All Subtopics in this Area (Balanced Subtopic Coverage)</option>
                  {availableSubtopics.map(sub => (
                    <option key={sub.id} value={sub.nameEn}>
                      {sub.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Official Syllabus Coverage Audit & Independent Topic Status Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-xs sm:text-sm">
                  Official Syllabus Coverage Audit ({selectedExam === 'upsc-principal' ? '8 Prescribed Areas' : 'Prescribed Units'})
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Real-time Database Reconciled
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    value={topicSearchTerm}
                    onChange={e => setTopicSearchTerm(e.target.value)}
                    placeholder="Search 8 areas or subtopics..."
                    className="pl-8 pr-2.5 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 w-48 sm:w-60"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuditTable(prev => !prev)}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>{showAuditTable ? 'Hide Audit' : 'Show Audit'}</span>
                  {showAuditTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {showAuditTable && (
              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="p-2.5">Syllabus Area / Subject</th>
                      <th className="p-2.5 text-center">Target</th>
                      <th className="p-2.5 text-center">Approved</th>
                      <th className="p-2.5 text-center">Pending</th>
                      <th className="p-2.5 text-center">Used in Tests</th>
                      <th className="p-2.5 text-center">Unused Unique</th>
                      <th className="p-2.5 text-center">Missing Gap</th>
                      <th className="p-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTopicStats.map(st => {
                      const isExpanded = expandedTopicRows.has(st.topicId);
                      const isSelected = selectedTopic === st.topicNameEn;

                      return (
                        <React.Fragment key={st.topicId}>
                          <tr
                            className={`hover:bg-slate-50 transition-colors ${
                              isSelected ? 'bg-indigo-50/60 font-semibold' : ''
                            }`}
                          >
                            <td className="p-2.5">
                              <div className="flex items-start gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => toggleTopicRow(st.topicId)}
                                  className="mt-0.5 text-slate-400 hover:text-indigo-600 cursor-pointer"
                                  title="View subtopics"
                                >
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                                    <span>{st.unitNumber ? `Area ${st.unitNumber}: ` : ''}{st.topicNameEn}</span>
                                    {st.deficitOrGapCount === 0 && (
                                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        Full Target
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-devanagari">
                                    {st.topicNameHi}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-2.5 text-center font-bold text-slate-600">
                              {st.expectedQuestionCount}
                            </td>
                            <td className="p-2.5 text-center font-bold text-slate-900">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                                {st.approvedCount}
                              </span>
                            </td>
                            <td className="p-2.5 text-center font-bold">
                              {st.pendingCount > 0 ? (
                                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                  {st.pendingCount}
                                </span>
                              ) : (
                                <span className="text-slate-400">0</span>
                              )}
                            </td>
                            <td className="p-2.5 text-center font-bold text-slate-600">
                              {st.usedCount}
                            </td>
                            <td className="p-2.5 text-center font-bold">
                              <span className={`px-2 py-0.5 rounded ${
                                st.eligibleRemaining > 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {st.eligibleRemaining}
                              </span>
                            </td>
                            <td className="p-2.5 text-center font-bold">
                              {st.deficitOrGapCount > 0 ? (
                                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                                  -{st.deficitOrGapCount} Qs
                                </span>
                              ) : (
                                <span className="text-emerald-600">0</span>
                              )}
                            </td>
                            <td className="p-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedTopic(st.topicNameEn);
                                  setSelectedSubtopic('all');
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200'
                                }`}
                              >
                                {isSelected ? 'Selected' : 'Select'}
                              </button>
                            </td>
                          </tr>

                          {/* Subtopics Accordion */}
                          {isExpanded && st.subtopics.length > 0 && (
                            <tr className="bg-slate-50/80">
                              <td colSpan={8} className="p-3 pl-8">
                                <div className="space-y-1.5">
                                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                                    Prescribed Operational Subtopics & Question Coverage:
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {st.subtopics.map(sub => (
                                      <div
                                        key={sub.id}
                                        onClick={() => {
                                          setSelectedTopic(st.topicNameEn);
                                          setSelectedSubtopic(sub.nameEn);
                                        }}
                                        className={`p-2 rounded-lg border text-[11px] cursor-pointer transition-colors ${
                                          selectedTopic === st.topicNameEn && selectedSubtopic === sub.nameEn
                                            ? 'bg-indigo-100/70 border-indigo-300 text-indigo-900 font-semibold'
                                            : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                                        }`}
                                      >
                                        <div className="font-semibold text-slate-900 truncate">
                                          {sub.nameEn}
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-devanagari truncate">
                                          {sub.nameHi}
                                        </div>
                                        <div className="pt-1 flex items-center justify-between text-[10px]">
                                          <span className="text-slate-600 font-medium">
                                            {sub.approvedCount} in Bank
                                          </span>
                                          <span className="text-emerald-700 font-bold">
                                            {sub.unusedCount} Unused
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Live Status Badge & Metrics with Reconciliation Explanation */}
          <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-xl text-xs flex-wrap gap-2 border border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900">Live Bank Reconciliation:</span>
              <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">
                {currentExamStats.approvedCount} Active Approved
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                {currentExamStats.pendingCount} Pending Review
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                {currentExamStats.eligibleRemaining} Unused Unique Eligible
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                {currentExamStats.usedCount} Used in Tests
              </span>
            </div>
            <div className="w-full text-[11px] text-slate-600 font-medium leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
              <strong className="text-slate-800">Database Reconciliation Breakdown: </strong>
              {currentExamStats.reconciliationSummary}
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : statusMessage.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-indigo-50 border-indigo-300 text-indigo-900'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : statusMessage.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Generated Candidates Review List */}
          {candidateList.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    Candidate Questions Generated ({selectedIds.size} of {candidateList.length} Selected)
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
                  >
                    {selectedIds.size === candidateList.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                {/* Import Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleImportPending}
                    disabled={selectedIds.size === 0}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors"
                    title="Import as Pending Verification for admin review"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import as Pending ({selectedIds.size})</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyAndApprove}
                    disabled={selectedIds.size === 0}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors"
                    title="Approve directly to active question bank"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Approve to Bank</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Question Cards */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {candidateList.map((q, idx) => (
                  <div
                    key={q.id}
                    onClick={() => handleToggleSelect(q.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedIds.has(q.id)
                        ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-400'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(q.id)}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 mt-1 cursor-pointer"
                      />

                      <div className="space-y-2 flex-1">
                        {/* Tags & Metadata */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="w-5 h-5 rounded bg-slate-800 text-white font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                            {q.topic}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                            {q.difficulty}
                          </span>
                          {q.conceptId && (
                            <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-mono">
                              {q.conceptId}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                            Pending Verification
                          </span>
                        </div>

                        {/* Stems */}
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm leading-relaxed">
                          {q.questionTextEn}
                        </p>
                        <p className="text-slate-700 text-xs font-devanagari leading-relaxed">
                          {q.questionTextHi}
                        </p>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                          {q.optionsEn.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 ${
                                oIdx === q.correctOptionIndex
                                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold'
                                  : 'bg-slate-50 text-slate-600'
                              }`}
                            >
                              <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                                {['A', 'B', 'C', 'D'][oIdx]}
                              </span>
                              <span className="truncate">{opt}</span>
                            </div>
                          ))}
                        </div>

                        {/* Primary Source Reference Box */}
                        {q.sourceInfo && (
                          <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-purple-700">
                                Primary Source (Tier {q.sourceInfo.priorityTier}):
                              </span>
                              <span>{q.sourceInfo.citation}</span>
                            </div>
                            {q.sourceInfo.sourceUrl && (
                              <a
                                href={q.sourceInfo.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                              >
                                <span>Official Portal</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>
            Total in Bank: <strong className="text-slate-800">{questions.length}</strong> questions
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* 1-Click Automated 120-Question Pool Generator Progress Modal */}
      <AutoGenerationProgressModal
        isOpen={isAutoGenerating}
        progress={autoProgress}
        examTitle={examConfigs[selectedExam]?.titleEn}
      />
    </div>
  );
};
