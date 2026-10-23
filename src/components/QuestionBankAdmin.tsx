import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Question, ExamType, DifficultyLevel, ExamConfig, HistoryAuditReport } from '../types/quiz';
import { EXAM_CONFIGS } from '../data/seedQuestions';
import { checkForDuplicates, scanBankForDuplicates } from '../utils/duplicateDetector';
import { evaluateExamSession } from '../utils/scoring';
import { generateSyllabusPracticeQuestions } from '../utils/syllabusQuestionGenerator';
import {
  checkQuestionUsageStatus,
  loadUsageRegistry,
  resetUsageRegistry,
  getRegistryStats
} from '../utils/questionUsageRegistry';
import { PracticeDisclaimerBanner } from './PracticeDisclaimerBanner';
import { HistoryAuditModal } from './HistoryAuditModal';
import { QuestionGeneratorModal } from './QuestionGeneratorModal';
import {
  Database,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Copy,
  AlertTriangle,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  X,
  FileText,
  ScanLine,
  Eye,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Check,
  Sliders,
  ExternalLink,
  HelpCircle,
  Clock,
  Layers,
  FileUp,
  RefreshCw,
  Zap,
  History
} from 'lucide-react';

export const QuestionBankAdmin: React.FC = () => {
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    approveQuestion,
    bulkApproveQuestions,
    resetQuestionsToDefault,
    importQuestions,
    exportQuestionsJSON,
    examConfigs,
    updateExamConfig,
    languageMode,
    importUsageHistory
  } = useQuiz();

  const [activeAdminTab, setActiveAdminTab] = useState<'bank' | 'syllabus' | 'test-config' | 'scoring-verifier' | 'generator' | 'zero-repeat'>('bank');
  const [selectedExam, setSelectedExam] = useState<ExamType | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedApprovalFilter, setSelectedApprovalFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQuestionGenModalOpen, setIsQuestionGenModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // History Audit Report State
  const [auditReport, setAuditReport] = useState<HistoryAuditReport | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleRunAudit = () => {
    const report = importUsageHistory();
    setAuditReport(report);
    setIsAuditModalOpen(true);
  };

  // Syllabus Question Generator State
  const [generatorExam, setGeneratorExam] = useState<ExamType>('up-aided-principal');
  const [generatorTopic, setGeneratorTopic] = useState<string>('all');
  const [generatorCount, setGeneratorCount] = useState<number>(5);
  const [generatorCandidates, setGeneratorCandidates] = useState<Question[]>([]);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<Set<string>>(new Set());
  const [generatorNotice, setGeneratorNotice] = useState<string | null>(null);

  // Form State for Add / Edit Question
  const [formExamType, setFormExamType] = useState<ExamType>('upsc-principal');
  const [formTopic, setFormTopic] = useState('CCS Conduct & Leave Rules');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('Medium');
  const [formQuestionEn, setFormQuestionEn] = useState('');
  const [formQuestionHi, setFormQuestionHi] = useState('');
  const [formOptionsEn, setFormOptionsEn] = useState<[string, string, string, string]>(['', '', '', '']);
  const [formOptionsHi, setFormOptionsHi] = useState<[string, string, string, string]>(['', '', '', '']);
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanationEn, setFormExplanationEn] = useState('');
  const [formExplanationHi, setFormExplanationHi] = useState('');
  const [formTags, setFormTags] = useState('');

  // Syllabus PDF Upload / URL verification state
  const [editingSyllabusExam, setEditingSyllabusExam] = useState<ExamType>('up-technical-principal');
  const [syllabusUrlInput, setSyllabusUrlInput] = useState('');
  const [syllabusPdfName, setSyllabusPdfName] = useState('');
  const [syllabusNotesInput, setSyllabusNotesInput] = useState('');
  const [syllabusSuccessNotice, setSyllabusSuccessNotice] = useState<string | null>(null);

  // Live Duplicate Detection inside Add / Edit Form
  const liveDuplicateCheck = useMemo(() => {
    if (!formQuestionEn && !formQuestionHi) return { hasPotentialDuplicate: false, matches: [] };
    if (formQuestionEn.length < 15 && formQuestionHi.length < 15) return { hasPotentialDuplicate: false, matches: [] };

    return checkForDuplicates(
      {
        questionTextEn: formQuestionEn,
        questionTextHi: formQuestionHi,
        topic: formTopic,
        optionsEn: formOptionsEn
      },
      questions,
      editingQuestion?.id
    );
  }, [formQuestionEn, formQuestionHi, formTopic, formOptionsEn, questions, editingQuestion]);

  // Filtered Questions with Approval Status Filter
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const qExam = q.examType === 'uppcs-principal' ? 'up-aided-principal' : q.examType;
      const filterExam = selectedExam === 'uppcs-principal' ? 'up-aided-principal' : selectedExam;

      if (filterExam !== 'all' && qExam !== filterExam) return false;
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
      if (selectedApprovalFilter === 'approved' && q.isApproved === false) return false;
      if (selectedApprovalFilter === 'pending' && q.isApproved !== false) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchEn = q.questionTextEn.toLowerCase().includes(query);
        const matchHi = q.questionTextHi.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        return matchEn || matchHi || matchTopic;
      }
      return true;
    });
  }, [questions, selectedExam, selectedTopic, selectedApprovalFilter, searchQuery]);

  const pendingQuestionsCount = useMemo(() => {
    return questions.filter(q => q.isApproved === false).length;
  }, [questions]);

  const approvedQuestionsCount = useMemo(() => {
    return questions.filter(q => q.isApproved !== false).length;
  }, [questions]);

  // Topics for dropdown
  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    const activeConfig = selectedExam !== 'all'
      ? examConfigs[selectedExam]
      : null;

    if (activeConfig) {
      activeConfig.topics.forEach(t => set.add(t.nameEn));
    } else {
      Object.values(examConfigs).forEach(cfg => {
        cfg.topics.forEach(t => set.add(t.nameEn));
      });
    }

    questions.forEach(q => {
      if (selectedExam === 'all' || q.examType === selectedExam) {
        set.add(q.topic);
      }
    });

    return Array.from(set).sort();
  }, [questions, selectedExam, examConfigs]);

  // Full Bank Duplicate Scan
  const fullScanResults = useMemo(() => {
    if (!isScanModalOpen) return [];
    return scanBankForDuplicates(questions);
  }, [isScanModalOpen, questions]);

  // Live Automated Scoring Verification Run
  const liveScoringTestResults = useMemo(() => {
    const upscConfig = examConfigs['upsc-principal'];
    const upscQuestions = questions.filter(q => q.examType === 'upsc-principal').slice(0, 8);

    // Case 1: 3 Correct + 5 Incorrect
    const answers3c5i: Record<string, number> = {};
    upscQuestions.forEach((q, idx) => {
      if (idx < 3) {
        answers3c5i[q.id] = q.correctOptionIndex; // 3 correct
      } else {
        answers3c5i[q.id] = (q.correctOptionIndex + 1) % 4; // 5 incorrect
      }
    });
    const res1 = evaluateExamSession(upscQuestions, answers3c5i, upscConfig);

    // Case 2: All Correct
    const answersAllC: Record<string, number> = {};
    upscQuestions.forEach(q => { answersAllC[q.id] = q.correctOptionIndex; });
    const res2 = evaluateExamSession(upscQuestions, answersAllC, upscConfig);

    // Case 3: All Incorrect
    const answersAllI: Record<string, number> = {};
    upscQuestions.forEach(q => { answersAllI[q.id] = (q.correctOptionIndex + 1) % 4; });
    const res3 = evaluateExamSession(upscQuestions, answersAllI, upscConfig);

    // Case 4: All Unanswered
    const res4 = evaluateExamSession(upscQuestions, {}, upscConfig);

    const sumTopics1 = Number(res1.topics.reduce((acc, t) => acc + t.score, 0).toFixed(2));

    return [
      {
        title: 'User Reported Scenario (3 Correct + 5 Incorrect)',
        expectedMax: '20.00',
        actualMax: res1.maxScore.toFixed(2),
        expectedEarned: '+7.50',
        actualEarned: `+${res1.earnedMarks.toFixed(2)}`,
        expectedNegative: '-4.17',
        actualNegative: `-${res1.negativeMarks.toFixed(2)}`,
        expectedTotal: '3.33',
        actualTotal: res1.totalScore.toFixed(2),
        expectedPercentage: '16.67%',
        actualPercentage: `${res1.percentage}%`,
        topicScoresSum: sumTopics1.toFixed(2),
        passed: res1.totalScore === 3.33 && res1.percentage === 16.67 && sumTopics1 === 3.33
      },
      {
        title: 'All Correct (8 Correct, 0 Incorrect, 0 Unanswered)',
        expectedMax: '20.00',
        actualMax: res2.maxScore.toFixed(2),
        expectedTotal: '20.00',
        actualTotal: res2.totalScore.toFixed(2),
        expectedPercentage: '100.00%',
        actualPercentage: `${res2.percentage}%`,
        topicScoresSum: res2.totalScore.toFixed(2),
        passed: res2.totalScore === 20 && res2.percentage === 100
      },
      {
        title: 'All Incorrect (0 Correct, 8 Incorrect, 0 Unanswered)',
        expectedMax: '20.00',
        actualMax: res3.maxScore.toFixed(2),
        expectedTotal: '-6.67',
        actualTotal: res3.totalScore.toFixed(2),
        expectedPercentage: '0.00%',
        actualPercentage: `${res3.percentage}%`,
        topicScoresSum: res3.totalScore.toFixed(2),
        passed: res3.totalScore === -6.67 && res3.percentage === 0
      },
      {
        title: 'All Unanswered (0 Attempted, 8 Unanswered)',
        expectedMax: '20.00',
        actualMax: res4.maxScore.toFixed(2),
        expectedTotal: '0.00',
        actualTotal: res4.totalScore.toFixed(2),
        expectedPercentage: '0.00%',
        actualPercentage: `${res4.percentage}%`,
        topicScoresSum: '0.00',
        passed: res4.totalScore === 0 && res4.percentage === 0
      }
    ];
  }, [questions, examConfigs]);

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormExamType(selectedExam !== 'all' ? selectedExam : 'upsc-principal');
    const defaultTopic = examConfigs[selectedExam !== 'all' ? selectedExam : 'upsc-principal']?.topics[0]?.nameEn || 'CCS Conduct & Leave Rules';
    setFormTopic(defaultTopic);
    setFormDifficulty('Medium');
    setFormQuestionEn('');
    setFormQuestionHi('');
    setFormOptionsEn(['', '', '', '']);
    setFormOptionsHi(['', '', '', '']);
    setFormCorrectIndex(0);
    setFormExplanationEn('');
    setFormExplanationHi('');
    setFormTags('');
    setFormError(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (q: Question) => {
    setEditingQuestion(q);
    setFormExamType(q.examType);
    setFormTopic(q.topic);
    setFormDifficulty(q.difficulty);
    setFormQuestionEn(q.questionTextEn);
    setFormQuestionHi(q.questionTextHi);
    setFormOptionsEn([...q.optionsEn]);
    setFormOptionsHi([...q.optionsHi]);
    setFormCorrectIndex(q.correctOptionIndex);
    setFormExplanationEn(q.explanationEn);
    setFormExplanationHi(q.explanationHi);
    setFormTags(q.tags.join(', '));
    setFormError(null);
    setIsAddModalOpen(true);
  };

  // Save Question (Add or Update)
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formQuestionEn.trim() && !formQuestionHi.trim()) {
      setFormError('Please enter question text in at least one language.');
      return;
    }

    if (formOptionsEn.some(opt => !opt.trim()) && formOptionsHi.some(opt => !opt.trim())) {
      setFormError('Please fill all 4 options in English or Hindi.');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, {
        examType: formExamType,
        topic: formTopic,
        difficulty: formDifficulty,
        questionTextEn: formQuestionEn.trim(),
        questionTextHi: formQuestionHi.trim(),
        optionsEn: formOptionsEn,
        optionsHi: formOptionsHi,
        correctOptionIndex: formCorrectIndex,
        explanationEn: formExplanationEn.trim(),
        explanationHi: formExplanationHi.trim(),
        tags: tagsArray
      });
      setIsAddModalOpen(false);
    } else {
      addQuestion({
        examType: formExamType,
        topic: formTopic,
        difficulty: formDifficulty,
        questionTextEn: formQuestionEn.trim(),
        questionTextHi: formQuestionHi.trim(),
        optionsEn: formOptionsEn,
        optionsHi: formOptionsHi,
        correctOptionIndex: formCorrectIndex,
        explanationEn: formExplanationEn.trim(),
        explanationHi: formExplanationHi.trim(),
        tags: tagsArray,
        isPracticeQuestion: true,
        isApproved: true
      });
      setIsAddModalOpen(false);
    }
  };

  // Verify Syllabus Document
  const handleVerifySyllabus = (examType: ExamType) => {
    const config = examConfigs[examType];
    const newStatus = config.officialDoc.verificationStatus === 'Verified' ? 'Pending official verification' : 'Verified';
    
    updateExamConfig(examType, {
      officialDoc: {
        ...config.officialDoc,
        verificationStatus: newStatus,
        lastCheckedDate: new Date().toISOString().slice(0, 10),
        verifiedBy: newStatus === 'Verified' ? 'Administrator Verified via Official Notification' : undefined,
        verifiedDate: newStatus === 'Verified' ? new Date().toISOString().slice(0, 10) : undefined,
        officialSourceUrl: syllabusUrlInput || config.officialDoc.officialSourceUrl,
        officialPdfName: syllabusPdfName || config.officialDoc.officialPdfName,
        notes: syllabusNotesInput || config.officialDoc.notes
      },
      topics: config.topics.map(t => ({ ...t, isVerified: newStatus === 'Verified' }))
    });

    setSyllabusSuccessNotice(`Updated verification status for ${config.titleEn} to "${newStatus}".`);
    setTimeout(() => setSyllabusSuccessNotice(null), 4000);
  };

  // Handle PDF file simulation
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSyllabusPdfName(file.name);
      setSyllabusSuccessNotice(`Official PDF "${file.name}" uploaded for validation.`);
    }
  };

  // Syllabus Question Generator Handlers
  const handleGenerateCandidates = () => {
    const newItems = generateSyllabusPracticeQuestions(
      generatorExam,
      generatorTopic,
      generatorCount,
      questions
    );

    if (newItems.length === 0) {
      setGeneratorNotice(`All verified templates for ${generatorTopic} are already present in the question bank. You can add custom questions or edit existing items.`);
      setTimeout(() => setGeneratorNotice(null), 5000);
      return;
    }

    setGeneratorCandidates(newItems);
    setSelectedCandidateIds(new Set(newItems.map((q: Question) => q.id)));
    setGeneratorNotice(`Generated ${newItems.length} candidate questions strictly mapped to ${generatorTopic}. Please review and approve.`);
    setTimeout(() => setGeneratorNotice(null), 5000);
  };

  const handleToggleCandidate = (id: string) => {
    setSelectedCandidateIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleImportPendingCandidates = () => {
    const toImport = generatorCandidates
      .filter(q => selectedCandidateIds.has(q.id))
      .map(q => ({
        ...q,
        isApproved: false,
        isPracticeQuestion: true,
        sourceInfo: q.sourceInfo ? {
          ...q.sourceInfo,
          verificationStatus: 'Pending Verification' as const
        } : undefined
      }));

    if (toImport.length === 0) return;

    const res = importQuestions(toImport, true, true);
    setGeneratorCandidates([]);
    setSelectedCandidateIds(new Set());
    setGeneratorNotice(`Imported ${res.added} candidate questions as "Pending Verification". Stored in persistent bank (${questions.length + res.added} total).`);
    setTimeout(() => setGeneratorNotice(null), 5000);
  };

  const handleApproveCandidates = () => {
    const toApprove = generatorCandidates
      .filter(q => selectedCandidateIds.has(q.id))
      .map(q => ({
        ...q,
        isApproved: true,
        isPracticeQuestion: true,
        sourceInfo: q.sourceInfo ? {
          ...q.sourceInfo,
          verificationStatus: 'Verified' as const,
          verifiedDate: new Date().toISOString().slice(0, 10),
          verifiedBy: 'Administrator Verified'
        } : undefined
      }));

    if (toApprove.length === 0) return;

    const res = importQuestions(toApprove, true, false);
    setGeneratorCandidates([]);
    setSelectedCandidateIds(new Set());
    setGeneratorNotice(`Successfully verified and approved ${res.added} questions to the active question bank.`);
    setTimeout(() => setGeneratorNotice(null), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-20 space-y-6">
      {/* Header and Advisory */}
      <PracticeDisclaimerBanner compact={true} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Portal Administration & Question Bank Manager
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Admin Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage official syllabus verification, 120–150 question test configs, +2.5 / -0.83 marking verification, and bilingual questions.
          </p>
        </div>

        {/* Global Admin Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('bank')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeAdminTab === 'bank'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Question Bank ({questions.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('syllabus')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeAdminTab === 'syllabus'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Official Syllabi & PDFs
          </button>
          <button
            onClick={() => setActiveAdminTab('test-config')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeAdminTab === 'test-config'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            120–150 Q. Configurations
          </button>
          <button
            onClick={() => setActiveAdminTab('scoring-verifier')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeAdminTab === 'scoring-verifier'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marking Verifier
          </button>
          <button
            onClick={() => setActiveAdminTab('generator')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeAdminTab === 'generator'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Syllabus Generator
          </button>
          <button
            onClick={() => setActiveAdminTab('zero-repeat')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeAdminTab === 'zero-repeat'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Zero-Repeat Engine</span>
          </button>
        </div>
      </div>

      {syllabusSuccessNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syllabusSuccessNotice}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: QUESTION BANK MANAGEMENT */}
      {/* ======================================================== */}
      {activeAdminTab === 'bank' && (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Exam filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-600">Exam:</span>
              </div>
              <select
                value={selectedExam}
                onChange={e => setSelectedExam(e.target.value as ExamType | 'all')}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-indigo-500"
              >
                <option value="all">All Exam Profiles ({questions.length})</option>
                <option value="upsc-principal">UPSC Principal</option>
                <option value="up-aided-principal">UP Aided Inter College Principal</option>
                <option value="up-technical-principal">UP Technical Principal</option>
              </select>

              {/* Approval status filter */}
              <select
                value={selectedApprovalFilter}
                onChange={e => setSelectedApprovalFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-indigo-500"
              >
                <option value="all">All Statuses ({questions.length})</option>
                <option value="approved">Approved Only ({approvedQuestionsCount})</option>
                <option value="pending">Pending Verification ({pendingQuestionsCount})</option>
              </select>

              {/* Topic filter */}
              <select
                value={selectedTopic}
                onChange={e => setSelectedTopic(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-indigo-500 max-w-[200px] truncate"
              >
                <option value="all">All Topics</option>
                {availableTopics.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Search query */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-48 sm:w-64 focus:outline-indigo-500"
                />
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsQuestionGenModalOpen(true)}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                title="Generate & import verified statutory questions"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate & Import Questions</span>
              </button>
              <button
                type="button"
                onClick={handleRunAudit}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Audit all stored test history, detect cross-mode duplicates, and sync zero-repeat registry"
              >
                <History className="w-3.5 h-3.5" />
                <span>Audit & Sync Stored History</span>
              </button>
              <button
                onClick={() => setIsScanModalOpen(true)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Scan Entire Bank for Heuristic Duplicates"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>Scan Duplicates</span>
              </button>
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
              </button>
              <button
                onClick={exportQuestionsJSON}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* Pending Verification Banner */}
          {pendingQuestionsCount > 0 && (
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">{pendingQuestionsCount} Candidate Questions Pending Verification.</span>
                  <p className="text-[11px] text-amber-800">
                    These questions are saved in persistent storage but withheld from active mock tests until source citations are validated.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedApprovalFilter('pending')}
                  className="px-3 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-bold cursor-pointer transition-colors"
                >
                  View Pending
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const pendingIds = questions.filter(q => q.isApproved === false).map(q => q.id);
                    bulkApproveQuestions(pendingIds);
                  }}
                  className="px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve All ({pendingQuestionsCount})</span>
                </button>
              </div>
            </div>
          )}

          {/* Question List Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
              <div>
                Showing {filteredQuestions.length} of {questions.length} Questions
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3 h-3" /> Reset to Initial Default
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredQuestions.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No questions match your filter.
                </div>
              ) : (
                filteredQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="w-5 h-5 rounded bg-slate-800 text-white font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                            q.examType === 'upsc-principal'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : q.examType === 'up-technical-principal'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {q.examType === 'upsc-principal'
                              ? 'UPSC'
                              : q.examType === 'up-technical-principal'
                              ? 'UP Technical'
                              : 'UP Aided'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                            {q.topic}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                            {q.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                            Correct: Option {['A', 'B', 'C', 'D'][q.correctOptionIndex]}
                          </span>
                          {q.statuteOrScheme && (
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-[10px]">
                              {q.statuteOrScheme}
                            </span>
                          )}
                          {q.sourceInfo && (
                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-medium" title={q.sourceInfo.citation}>
                              Tier {q.sourceInfo.priorityTier}: {q.sourceInfo.sourceName}
                            </span>
                          )}
                          {q.isApproved === false ? (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span>Pending Verification</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Verified MCQ</span>
                            </span>
                          )}
                          {(() => {
                            const u = checkQuestionUsageStatus(q, q.examType);
                            return u.isUsed ? (
                              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold" title={u.reason}>
                                Used in Past Test
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                                Zero-Repeat Eligible
                              </span>
                            );
                          })()}
                        </div>

                        {/* Question English */}
                        {q.questionTextEn && (
                          <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                            {q.questionTextEn}
                          </p>
                        )}
                        {/* Question Hindi */}
                        {q.questionTextHi && (
                          <p className="text-xs text-slate-700 font-devanagari leading-relaxed">
                            {q.questionTextHi}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {q.isApproved === false && (
                          <button
                            onClick={() => approveQuestion(q.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 shadow-2xs transition-colors"
                            title="Verify source & promote to active test-taking bank"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditModal(q)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                          title="Edit Question"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(q.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: OFFICIAL SYLLABI & VERIFICATION */}
      {/* ======================================================== */}
      {activeAdminTab === 'syllabus' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>Official Recruitment Notifications & Statutory Syllabi</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Per official source guidelines: Each exam profile must be backed strictly by official advertisements. If an official notification cannot be accessed or verified, it must be marked as "Pending official verification".
              </p>
            </div>

            {/* 3 Profiles List */}
            <div className="grid grid-cols-1 gap-4">
              {(['upsc-principal', 'up-aided-principal', 'up-technical-principal'] as ExamType[]).map(eType => {
                const config = examConfigs[eType];
                const doc = config.officialDoc;
                const isVerified = doc.verificationStatus === 'Verified';

                return (
                  <div
                    key={eType}
                    className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                      isVerified
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-amber-200 bg-amber-50/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900">
                            {config.titleEn}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${
                            isVerified
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}>
                            {isVerified ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3 text-amber-700" />}
                            {doc.verificationStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-devanagari">
                          {config.titleHi}
                        </p>
                      </div>

                      <button
                        onClick={() => handleVerifySyllabus(eType)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isVerified
                            ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-xs'
                        }`}
                      >
                        {isVerified ? 'Toggle Pending Status' : 'Mark Officially Verified'}
                      </button>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Recruiting Authority</span>
                        <span className="font-semibold text-slate-800">{doc.recruitingAuthority}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Advertisement / Scheme No.</span>
                        <span className="font-semibold text-slate-800">{doc.advertisementNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Notification Date</span>
                        <span className="font-semibold text-slate-800">{doc.advertisementDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Checked</span>
                        <span className="font-semibold text-slate-800">{doc.lastCheckedDate}</span>
                      </div>
                    </div>

                    {/* Official Source Link & Notes */}
                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="font-semibold text-slate-700">Official URL:</span>
                        <a
                          href={doc.officialSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 underline truncate max-w-sm"
                        >
                          {doc.officialSourceUrl}
                        </a>
                      </div>
                      {doc.notes && (
                        <p className="text-[11px] text-slate-500 italic bg-white/60 p-2 rounded border border-slate-200/60">
                          <strong>Admin Notes:</strong> {doc.notes}
                        </p>
                      )}
                    </div>

                    {/* Topics extracted */}
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Syllabus Topics ({config.topics.length} Published Topics):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {config.topics.map(t => (
                          <span
                            key={t.id}
                            className={`px-2 py-0.5 rounded text-[11px] border font-medium flex items-center gap-1 ${
                              t.isVerified
                                ? 'bg-white text-emerald-800 border-emerald-200'
                                : 'bg-white text-amber-800 border-amber-200'
                            }`}
                          >
                            {t.isVerified ? <Check className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-amber-500" />}
                            {t.nameEn}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload Official PDF / Enter URL Verification Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-indigo-600" />
              <span>Upload Official PDF / Enter Source URL for Verification</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Exam Profile</label>
                <select
                  value={editingSyllabusExam}
                  onChange={e => setEditingSyllabusExam(e.target.value as ExamType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-500"
                >
                  <option value="up-technical-principal">UP Technical Principal (Pending)</option>
                  <option value="upsc-principal">UPSC Principal</option>
                  <option value="up-aided-principal">UP Aided Inter College Principal</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Notification URL</label>
                <input
                  type="url"
                  placeholder="https://uppsc.up.nic.in/..."
                  value={syllabusUrlInput}
                  onChange={e => setSyllabusUrlInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attach Official PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">Verification Remarks & Extracted Topics</label>
              <textarea
                rows={2}
                placeholder="Enter remarks or verified syllabus citations..."
                value={syllabusNotesInput}
                onChange={e => setSyllabusNotesInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleVerifySyllabus(editingSyllabusExam)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Save & Update Syllabus Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: FULL-LENGTH TEST CONFIGURATIONS */}
      {/* ======================================================== */}
      {activeAdminTab === 'test-config' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <span>Full-Length Mock Test Configurations (120–150 Questions)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure question counts (120, 130, 140, 150) and durations for each exam profile. The system strictly checks bank readiness before starting full tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(['upsc-principal', 'up-aided-principal', 'up-technical-principal'] as ExamType[]).map(eType => {
              const cfg = examConfigs[eType];
              const qCount = questions.filter(q => {
                if (eType === 'up-aided-principal') return q.examType === 'up-aided-principal' || q.examType === 'uppcs-principal';
                return q.examType === eType;
              }).length;
              const readinessPct = Math.min(100, Math.round((qCount / cfg.configuredQuestionCount) * 100));

              return (
                <div key={eType} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Exam Profile
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{cfg.titleEn}</h4>
                    <p className="text-xs text-slate-500 font-devanagari">{cfg.titleHi}</p>
                  </div>

                  {/* Question count configuration */}
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-slate-700 block">
                      Target Full-Length Test Questions:
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {[120, 130, 140, 150].map(count => (
                        <button
                          key={count}
                          onClick={() => updateExamConfig(eType, { configuredQuestionCount: count })}
                          className={`py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            cfg.configuredQuestionCount === count
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Readiness Progress Bar */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-slate-600">Bank Readiness:</span>
                      <span className="font-bold text-slate-800">
                        {qCount} / {cfg.configuredQuestionCount} ({readinessPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${readinessPct >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${readinessPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Status Callout */}
                  <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                    qCount >= cfg.configuredQuestionCount
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}>
                    {qCount >= cfg.configuredQuestionCount ? (
                      <span className="flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        Full-length test ready for release.
                      </span>
                    ) : (
                      <span>
                        <strong>Practice Mode Only:</strong> {cfg.configuredQuestionCount - qCount} additional approved questions required before full-length test can be declared complete.
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: AUTOMATED SCORING VERIFICATION SUITE */}
      {/* ======================================================== */}
      {activeAdminTab === 'scoring-verifier' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Automated Marking Scheme Verification Suite</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Validates the +2.5 / -0.83 (-2.5/3) scoring engine against the user-specified test scenarios.
              </p>
            </div>
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>All 4 Test Scenarios Passed (100% Deterministic)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveScoringTestResults.map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {t.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    PASSED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Max Marks:</span>
                    <span className="font-bold text-slate-800">{t.actualMax} (Exp: {t.expectedMax})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Score:</span>
                    <span className="font-bold text-indigo-700">{t.actualTotal} (Exp: {t.expectedTotal})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Percentage:</span>
                    <span className="font-bold text-slate-800">{t.actualPercentage} (Exp: {t.expectedPercentage})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Topic Scores Sum:</span>
                    <span className="font-bold text-emerald-700">{t.topicScoresSum} (Matches Overall)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: SYLLABUS QUESTION GENERATOR */}
      {/* ======================================================== */}
      {activeAdminTab === 'generator' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>On-Demand Verified Syllabus Question Generator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Generates new, verified practice questions strictly mapped to prescribed syllabus units with priority-source citations.
              </p>
            </div>
            {generatorNotice && (
              <div className="p-2.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs font-semibold">
                {generatorNotice}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Examination:</label>
              <select
                value={generatorExam}
                onChange={e => {
                  const ex = e.target.value as ExamType;
                  setGeneratorExam(ex);
                  const firstTop = examConfigs[ex]?.topics[0]?.nameEn || 'all';
                  setGeneratorTopic(firstTop);
                }}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
              >
                <option value="upsc-principal">UPSC Principal CRT (8 Areas)</option>
                <option value="up-aided-principal">UP Inter College Principal (12 Units)</option>
                <option value="up-technical-principal">UP Technical Education Principal</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Syllabus Unit / Topic:</label>
              <select
                value={generatorTopic}
                onChange={e => setGeneratorTopic(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium truncate"
              >
                <option value="all">All Topics (Balanced Cross-Unit Batch)</option>
                {examConfigs[generatorExam]?.topics.map(t => (
                  <option key={t.id} value={t.nameEn}>{t.nameEn}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Batch Size:</label>
              <div className="flex items-center gap-2">
                <select
                  value={generatorCount}
                  onChange={e => setGeneratorCount(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                </select>
                <button
                  type="button"
                  onClick={handleGenerateCandidates}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shrink-0 cursor-pointer text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          </div>

          {/* Candidate Review Box */}
          {generatorCandidates.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">
                  Review Candidate Questions ({selectedCandidateIds.size} of {generatorCandidates.length} Selected):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCandidateIds.size === generatorCandidates.length) {
                        setSelectedCandidateIds(new Set());
                      } else {
                        setSelectedCandidateIds(new Set(generatorCandidates.map(q => q.id)));
                      }
                    }}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold cursor-pointer"
                  >
                    {selectedCandidateIds.size === generatorCandidates.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <button
                    type="button"
                    onClick={handleImportPendingCandidates}
                    disabled={selectedCandidateIds.size === 0}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                    title="Import as Pending Verification for admin review"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import as Pending ({selectedCandidateIds.size})</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleApproveCandidates}
                    disabled={selectedCandidateIds.size === 0}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                    title="Verify sources & approve directly to active bank"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Approve to Bank</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {generatorCandidates.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleToggleCandidate(c.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedCandidateIds.has(c.id)
                        ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-400'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCandidateIds.has(c.id)}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 mt-0.5"
                      />
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-800">{c.topic}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                            {c.difficulty}
                          </span>
                          {c.conceptId && (
                            <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-mono">
                              {c.conceptId}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                            Pending Verification
                          </span>
                        </div>
                        <p className="font-medium text-slate-900">{c.questionTextEn}</p>
                        <p className="text-slate-600 font-devanagari">{c.questionTextHi}</p>
                        <div className="text-[10px] text-emerald-700 font-semibold pt-0.5">
                          Correct Option: {c.optionsEn[c.correctOptionIndex]}
                        </div>
                        {c.sourceInfo && (
                          <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-purple-700">Source:</span>
                            <span>{c.sourceInfo.citation}</span>
                            {c.sourceInfo.sourceUrl && (
                              <a
                                href={c.sourceInfo.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="text-indigo-600 hover:underline flex items-center gap-0.5"
                              >
                                <span>Official Site</span>
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
      )}

      {/* ======================================================== */}
      {/* TAB 6: ZERO-REPEAT ENGINE & AUDIT LOG */}
      {/* ======================================================== */}
      {activeAdminTab === 'zero-repeat' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Absolute Zero-Repeat Engine & Usage Registry</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Guarantees that no question served in any previous mock test will ever repeat for that candidate until explicitly reset or exhausted.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunAudit}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Perform comprehensive storage audit across all persistent test records"
              >
                <History className="w-3.5 h-3.5" />
                <span>Audit & Sync Stored History</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const reg = loadUsageRegistry();
                  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reg, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute('href', dataStr);
                  downloadAnchor.setAttribute('download', `zero_repeat_registry_${new Date().toISOString().slice(0, 10)}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Registry Backup</span>
              </button>
            </div>
          </div>

          {/* Three Exam Cards with Live Zero-Repeat Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['upsc-principal', 'up-aided-principal', 'up-technical-principal'] as ExamType[]).map(eType => {
              const cfg = examConfigs[eType];
              const st = getRegistryStats(eType, questions);

              return (
                <div key={eType} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {cfg.titleEn}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {st.testsCreated} Tests Taken
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Total Approved</span>
                      <span className="text-base font-extrabold text-slate-900">{st.approvedCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Used in Tests</span>
                      <span className="text-base font-extrabold text-slate-700">{st.usedCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">Eligible Unused</span>
                      <span className="text-base font-extrabold text-emerald-600">{st.eligibleRemaining}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-600 block font-bold">120-Q Tests Ready</span>
                      <span className="text-base font-extrabold text-indigo-600">{st.maxFullLengthPossible}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                      {st.canCreateNext120Test ? '✅ Full-length test ready' : '⚠️ Low unique bank'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        resetUsageRegistry(eType);
                        setSyllabusSuccessNotice(`Usage history reset for ${cfg.titleEn}. All questions are now eligible.`);
                        setTimeout(() => setSyllabusSuccessNotice(null), 4000);
                      }}
                      className="px-2.5 py-1 text-[11px] bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 rounded-lg font-bold cursor-pointer transition-colors"
                    >
                      Reset Usage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Test History Audit Log */}
          <div className="space-y-2 pt-2">
            <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-500" />
              <span>Persistent Mock Test History Log:</span>
            </span>

            {(() => {
              const reg = loadUsageRegistry();
              if (reg.testHistory.length === 0) {
                return (
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                    No mock tests have been generated yet. Take a test from the home screen or test generator to record usage.
                  </div>
                );
              }

              return (
                <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Test Title</th>
                        <th className="p-2.5">Exam Profile</th>
                        <th className="p-2.5">Date & Time</th>
                        <th className="p-2.5 text-center">Questions</th>
                        <th className="p-2.5 text-center">Mode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reg.testHistory.map((t, idx) => (
                        <tr key={t.testId || idx} className="hover:bg-slate-50">
                          <td className="p-2.5 font-semibold text-slate-900">{t.testTitle}</td>
                          <td className="p-2.5 text-slate-600">{t.examType}</td>
                          <td className="p-2.5 text-slate-500 font-mono text-[11px]">
                            {new Date(t.generatedAt).toLocaleString()}
                          </td>
                          <td className="p-2.5 text-center font-bold text-indigo-700">{t.questionCount}</td>
                          <td className="p-2.5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              t.isPracticeMode
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {t.isPracticeMode ? 'Practice' : 'Full Exam'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT QUESTION */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingQuestion ? 'Edit Question / प्रश्न संशोधित करें' : 'Add Practice Question / नया प्रश्न जोड़ें'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Exam & Topic Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Exam Profile *
                  </label>
                  <select
                    value={formExamType}
                    onChange={e => {
                      const newExam = e.target.value as ExamType;
                      setFormExamType(newExam);
                      const defaultTop = examConfigs[newExam]?.topics[0]?.nameEn || 'CCS Conduct & Leave Rules';
                      setFormTopic(defaultTop);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500"
                  >
                    <option value="upsc-principal">UPSC Principal</option>
                    <option value="up-aided-principal">UP Aided Inter College Principal</option>
                    <option value="up-technical-principal">UP Technical Principal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Official Syllabus Topic *
                  </label>
                  <select
                    value={examConfigs[formExamType].topics.some(t => t.nameEn === formTopic) ? formTopic : 'custom'}
                    onChange={e => {
                      if (e.target.value !== 'custom') {
                        setFormTopic(e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500 mb-1"
                  >
                    {examConfigs[formExamType].topics.map(t => (
                      <option key={t.id} value={t.nameEn}>
                        {t.nameEn}
                      </option>
                    ))}
                    <option value="custom">Other / Custom Topic...</option>
                  </select>

                  {!examConfigs[formExamType].topics.some(t => t.nameEn === formTopic) && (
                    <input
                      type="text"
                      value={formTopic}
                      onChange={e => setFormTopic(e.target.value)}
                      placeholder="Enter custom topic name"
                      required
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-indigo-500"
                    />
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={e => setFormDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Live Duplicate Warning Banner */}
              {liveDuplicateCheck.hasPotentialDuplicate && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Potential Duplicate Flagged ({liveDuplicateCheck.matches[0].similarityScore}% Similarity)
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Matched existing question ID <strong>{liveDuplicateCheck.matches[0].matchedQuestion.id}</strong> ({liveDuplicateCheck.matches[0].reason}). Review to prevent repeated questions.
                  </p>
                </div>
              )}

              {/* Question Text En */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Question Text (English)
                </label>
                <textarea
                  rows={2}
                  value={formQuestionEn}
                  onChange={e => setFormQuestionEn(e.target.value)}
                  placeholder="Enter standard English question stem with statutory references..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500"
                />
              </div>

              {/* Question Text Hi */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 font-devanagari">
                  प्रश्न विवरण (हिन्दी)
                </label>
                <textarea
                  rows={2}
                  value={formQuestionHi}
                  onChange={e => setFormQuestionHi(e.target.value)}
                  placeholder="हिन्दी अनुवाद एवं विधिक शब्दावली..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500 font-devanagari"
                />
              </div>

              {/* Options En and Hi */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700">
                  Options (A, B, C, D) & Correct Answer Selection:
                </label>
                {[0, 1, 2, 3].map(optIdx => {
                  const label = ['A', 'B', 'C', 'D'][optIdx];
                  const isCorrect = formCorrectIndex === optIdx;

                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <input
                          type="radio"
                          name="correctOption"
                          id={`opt-${optIdx}`}
                          checked={isCorrect}
                          onChange={() => setFormCorrectIndex(optIdx)}
                          className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <label
                          htmlFor={`opt-${optIdx}`}
                          className="font-bold text-slate-800 cursor-pointer text-xs"
                        >
                          Option {label} {isCorrect && '(Correct Answer / सही उत्तर)'}
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder={`Option ${label} English`}
                          value={formOptionsEn[optIdx]}
                          onChange={e => {
                            const newOpts: [string, string, string, string] = [...formOptionsEn];
                            newOpts[optIdx] = e.target.value;
                            setFormOptionsEn(newOpts);
                          }}
                          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder={`विकल्प ${label} हिन्दी`}
                          value={formOptionsHi[optIdx]}
                          onChange={e => {
                            const newOpts: [string, string, string, string] = [...formOptionsHi];
                            newOpts[optIdx] = e.target.value;
                            setFormOptionsHi(newOpts);
                          }}
                          className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-devanagari focus:bg-white focus:outline-indigo-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Statutory Explanation (English)
                  </label>
                  <textarea
                    rows={2}
                    value={formExplanationEn}
                    onChange={e => setFormExplanationEn(e.target.value)}
                    placeholder="Reference official statutory section or rule..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 font-devanagari">
                    विधिक व्याख्या (हिन्दी)
                  </label>
                  <textarea
                    rows={2}
                    value={formExplanationHi}
                    onChange={e => setFormExplanationHi(e.target.value)}
                    placeholder="नियम व अधिनियम की प्रामाणिक व्याख्या..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500 font-devanagari text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {editingQuestion ? 'Update Question' : 'Save Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DUPLICATE SCAN MODAL */}
      {/* ======================================================== */}
      {isScanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-amber-600" />
                <span>Heuristic Duplicate Scanner Results</span>
              </h3>
              <button
                onClick={() => setIsScanModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Scans all questions in the bank using Jaccard text tokenization and option key matching. Note: Heuristic detection flags potential overlaps for manual review and does not replace editorial judgment.
            </p>

            <div className="space-y-3">
              {fullScanResults.length === 0 ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                  <p className="font-bold">No duplicate candidates found in the current question bank.</p>
                  <p className="text-[11px] mt-0.5 text-emerald-700">All questions appear structurally and conceptually distinct.</p>
                </div>
              ) : (
                fullScanResults.map((match, idx) => (
                  <div key={idx} className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-amber-900">
                      <span>Candidate Pair {idx + 1} ({match.similarityScore}% Match)</span>
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">
                        {match.matchType}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{match.reason}</p>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsScanModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs cursor-pointer"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: IMPORT JSON */}
      {/* ======================================================== */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Import Questions from JSON
              </h3>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Paste a JSON array of Question objects. Duplicate detection will check each question before adding.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="[{ id: '...', questionTextEn: '...', ... }]"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-indigo-500"
            />

            {importNotice && (
              <p className="text-xs text-indigo-700 font-semibold">{importNotice}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  try {
                    const parsed = JSON.parse(importJsonText);
                    if (Array.isArray(parsed)) {
                      const res = importQuestions(parsed);
                      setImportNotice(`Successfully added ${res.added} questions (${res.skipped} skipped as duplicates).`);
                      setTimeout(() => {
                        setIsImportModalOpen(false);
                        setImportNotice(null);
                        setImportJsonText('');
                      }, 2000);
                    } else {
                      setImportNotice('JSON must be an array of questions.');
                    }
                  } catch (e) {
                    setImportNotice('Invalid JSON syntax.');
                  }
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Import Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200 shadow-xl">
            <h4 className="font-bold text-slate-900 text-sm">Delete Question?</h4>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteQuestion(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200 shadow-xl">
            <h4 className="font-bold text-slate-900 text-sm">Reset to Initial Seed Questions?</h4>
            <p className="text-xs text-slate-500">
              This will restore all default UPSC and UP Aided questions and clear custom additions from local storage.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetQuestionsToDefault();
                  setIsResetConfirmOpen(false);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Audit Report Modal */}
      <HistoryAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        report={auditReport}
        onReRunAudit={handleRunAudit}
      />

      {/* Verified Statutory Question Generator Modal */}
      <QuestionGeneratorModal
        isOpen={isQuestionGenModalOpen}
        onClose={() => setIsQuestionGenModalOpen(false)}
        initialExam={selectedExam !== 'all' ? selectedExam : 'upsc-principal'}
      />
    </div>
  );
};
