import React, { useState, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ExamType, LanguageMode } from '../types/quiz';
import {
  Star,
  X,
  Play,
  Trash2,
  BookOpen,
  Filter,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartPractice?: (examType: ExamType) => void;
}

export const RevisionQuestionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onStartPractice
}) => {
  const {
    pinnedQuestions,
    pinnedQuestionIds,
    togglePinQuestion,
    clearAllPinned,
    languageMode,
    startTest,
    activeExam
  } = useQuiz();

  const [examFilter, setExamFilter] = useState<'all' | ExamType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = pinnedQuestions.filter(q => {
    if (examFilter !== 'all' && q.examType !== examFilter) return false;
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      const matchText = (
        q.questionTextEn.toLowerCase().includes(qLower) ||
        q.questionTextHi.toLowerCase().includes(qLower) ||
        q.topic.toLowerCase().includes(qLower) ||
        (q.statuteOrScheme && q.statuteOrScheme.toLowerCase().includes(qLower)) ||
        (q.subtopic && q.subtopic.toLowerCase().includes(qLower))
      );
      if (!matchText) return false;
    }
    return true;
  });

  const handlePracticePinned = () => {
    if (filteredQuestions.length === 0) return;
    const targetExam = examFilter === 'all' ? (activeExam || 'upsc-principal') : examFilter;
    const count = Math.min(filteredQuestions.length, 60);
    const duration = Math.max(10, count);

    const res = startTest(targetExam, duration, count, true, {
      testTitle: `Revision Practice — ${count} Pinned Questions`,
      enforceZeroRepeat: false
    });

    if (res.started) {
      onClose();
      onStartPractice?.(targetExam);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  My Revision / Pinned Questions
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {pinnedQuestions.length} Saved
                </span>
              </div>
              <p className="text-xs text-slate-300 font-devanagari">
                कठिन एवं महत्वपूर्ण प्रश्न जिनका त्वरित पुनरावलोकन आवश्यक है
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Exam Filter tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setExamFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                examFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Exams ({pinnedQuestions.length})
            </button>
            <button
              onClick={() => setExamFilter('upsc-principal')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                examFilter === 'upsc-principal'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UPSC Principal
            </button>
            <button
              onClick={() => setExamFilter('up-aided-principal')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                examFilter === 'up-aided-principal'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UP Aided Principal
            </button>
          </div>

          {/* Practice & Clear buttons */}
          <div className="flex items-center gap-2">
            {filteredQuestions.length > 0 && (
              <button
                onClick={handlePracticePinned}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Practice Pinned ({filteredQuestions.length})</span>
              </button>
            )}

            {pinnedQuestions.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove all pinned questions from your revision bank?')) {
                    clearAllPinned();
                  }
                }}
                className="px-3 py-1.5 text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Clear all saved pinned questions"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search pinned questions by keyword, topic, or statute (e.g. GFR, CCS, RPwD, RTE)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs text-slate-800 placeholder-slate-400 outline-hidden bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Questions list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-500 mx-auto flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">
                {pinnedQuestions.length === 0
                  ? 'No Pinned Questions Yet / कोई पिन किया गया प्रश्न नहीं'
                  : 'No Pinned Questions Match Your Filter'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                During a mock test or solutions review, click the Bookmark (⭐) icon on any difficult question to save it to your personal revision list.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isExpanded = !!expandedIds[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300 space-y-3"
                >
                  {/* Top line metadata */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-800">
                        #{idx + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                        {q.topic}
                      </span>
                      {q.statuteOrScheme && (
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {q.statuteOrScheme}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePinQuestion(q.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-rose-50 text-amber-800 hover:text-rose-700 border border-amber-200 hover:border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove from revision list"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>Unpin</span>
                    </button>
                  </div>

                  {/* Question Stems */}
                  <div className="space-y-2 text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                    {(languageMode === 'en' || languageMode === 'both') && (
                      <p>{q.questionTextEn}</p>
                    )}
                    {(languageMode === 'hi' || languageMode === 'both') && (
                      <p className="text-slate-800 font-devanagari pt-1 border-t border-slate-100">
                        {q.questionTextHi}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.optionsEn.map((optEn, oIdx) => {
                      const isCorrect = oIdx === q.correctOptionIndex;
                      const optHi = q.optionsHi ? q.optionsHi[oIdx] : null;

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 font-bold text-[10px] ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {optionLabels[oIdx]}
                          </span>
                          <div className="space-y-0.5">
                            {(languageMode === 'en' || languageMode === 'both') && (
                              <span className="block">{optEn}</span>
                            )}
                            {(languageMode === 'hi' || languageMode === 'both') && optHi && (
                              <span className="block font-devanagari text-slate-600">
                                {optHi}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Toggle Explanation Accordion */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpand(q.id)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Explanation' : 'View Statutory Explanation / व्याख्या'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    {q.officialReference && (
                      <span className="text-[11px] text-slate-400">
                        Ref: {q.officialReference}
                      </span>
                    )}
                  </div>

                  {/* Expanded Explanation */}
                  {isExpanded && (
                    <div className="p-3.5 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-1.5 text-xs text-indigo-950">
                      <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Statutory Citation & Rule Explanation</span>
                      </div>
                      {(languageMode === 'en' || languageMode === 'both') && (
                        <p className="leading-relaxed">{q.explanationEn}</p>
                      )}
                      {(languageMode === 'hi' || languageMode === 'both') && (
                        <p className="font-devanagari leading-relaxed pt-1 border-t border-indigo-200/50">
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

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500 font-medium">
            Showing {filteredQuestions.length} of {pinnedQuestions.length} pinned questions
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
