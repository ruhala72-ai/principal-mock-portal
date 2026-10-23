import React from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  GraduationCap,
  Globe,
  Database,
  HelpCircle,
  Home,
  BookOpen,
  Share2,
  Star
} from 'lucide-react';
import { LanguageMode, ExamType } from '../types/quiz';

interface Props {
  currentTab: 'home' | 'test' | 'admin' | 'review' | 'notes';
  setCurrentTab: (tab: 'home' | 'test' | 'admin' | 'review' | 'notes') => void;
  openPublishGuide: () => void;
  openRevisionModal?: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<Props> = ({
  currentTab,
  setCurrentTab,
  openPublishGuide,
  openRevisionModal,
  onNavigateHome
}) => {
  const {
    activeExam,
    setActiveExam,
    languageMode,
    setLanguageMode,
    session,
    pinnedQuestionIds
  } = useQuiz();

  const handleLanguageToggle = (e: React.MouseEvent, mode: LanguageMode) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguageMode(mode);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'instant' });
    onNavigateHome();
  };

  const handleNotesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentTab('notes');
  };

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentTab('admin');
  };

  const handleRevisionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (openRevisionModal) {
      openRevisionModal();
    }
  };

  const isExamInProgress = !!(session && !session.isSubmitted);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs pointer-events-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 pointer-events-auto">
        {/* Logo and Brand (Unconditionally navigates to Home) */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex items-center gap-2.5 text-left cursor-pointer select-none group border-0 bg-transparent p-0 pointer-events-auto touch-manipulation"
          title="Principal Exam Portal — Return to Home Dashboard"
          aria-label="Home Dashboard"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0 group-hover:scale-105 transition-transform pointer-events-auto">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                Principal Exam Portal
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                Bilingual
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              UPSC Principal & UPPCS Inter College Mock Tests
            </p>
          </div>
        </button>

        {/* Center / Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Exam switcher (when not inside exam) */}
          {!isExamInProgress && currentTab !== 'test' && (
            <div className="hidden xl:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveExam('upsc-principal');
                }}
                className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                  activeExam === 'upsc-principal'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                UPSC Principal
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveExam('up-aided-principal');
                }}
                className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                  activeExam === 'up-aided-principal' || activeExam === 'uppcs-principal'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                UP Aided Principal
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveExam('up-technical-principal');
                }}
                className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                  activeExam === 'up-technical-principal'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                UP Technical
              </button>
            </div>
          )}

          {/* Bilingual Language Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs pointer-events-auto">
            <button
              type="button"
              onClick={(e) => handleLanguageToggle(e, 'en')}
              title="English Only"
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                languageMode === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={(e) => handleLanguageToggle(e, 'hi')}
              title="हिन्दी केवल"
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                languageMode === 'hi'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={(e) => handleLanguageToggle(e, 'both')}
              title="Dual View / दोनों भाषाएँ"
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                languageMode === 'both'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dual
            </button>
          </div>

          {/* Navigation Items (Always visible with high z-index and touch-manipulation) */}
          <div className="flex items-center gap-1 sm:gap-1.5 ml-1 pointer-events-auto">
            {/* UNCONDITIONAL HOME ICON (🏠) */}
            <button
              type="button"
              onClick={handleHomeClick}
              className={`min-h-[38px] min-w-[38px] p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer pointer-events-auto touch-manipulation ${
                currentTab === 'home'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
              title="Home / मुख्य पृष्ठ"
              aria-label="Home"
            >
              <Home className="w-4 h-4 text-indigo-600 shrink-0 pointer-events-none" />
              <span className="hidden sm:inline pointer-events-none">Home</span>
            </button>

            {/* FULL-PAGE VISUAL SMART NOTES TAB (📖) */}
            <button
              type="button"
              onClick={handleNotesClick}
              className={`min-h-[38px] min-w-[38px] p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer pointer-events-auto touch-manipulation ${
                currentTab === 'notes'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
              title="Visual Smart Notes & Statutory Digests"
              aria-label="Visual Smart Notes"
            >
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 pointer-events-none" />
              <span className="hidden md:inline pointer-events-none">Visual Smart Notes</span>
            </button>

            {/* REVISION QUESTIONS BUTTON (⭐) */}
            {openRevisionModal && (
              <button
                type="button"
                onClick={handleRevisionClick}
                className={`min-h-[38px] p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer pointer-events-auto touch-manipulation ${
                  pinnedQuestionIds.length > 0
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                title="My Revision / Pinned Questions"
                aria-label="Revision Questions"
              >
                <Star className={`w-3.5 h-3.5 shrink-0 pointer-events-none ${pinnedQuestionIds.length > 0 ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
                <span className="hidden sm:inline pointer-events-none">Revision</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-900 pointer-events-none">
                  {pinnedQuestionIds.length}
                </span>
              </button>
            )}

            {/* QUESTION BANK ADMIN (when not in exam) */}
            {!isExamInProgress && (
              <button
                type="button"
                onClick={handleAdminClick}
                className={`min-h-[38px] p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer pointer-events-auto touch-manipulation ${
                  currentTab === 'admin'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
                title="Question Bank & Duplicate Manager"
                aria-label="Question Bank"
              >
                <Database className="w-4 h-4 shrink-0 pointer-events-none" />
                <span className="hidden lg:inline pointer-events-none">Question Bank</span>
              </button>
            )}

            {/* LIVE TEST BADGE (when active test is running) */}
            {isExamInProgress && (
              <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Live Test</span>
              </span>
            )}

            {/* PUBLISH GUIDE */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openPublishGuide();
              }}
              className="min-h-[38px] p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer pointer-events-auto touch-manipulation"
              title="Publish & Preview Guide"
              aria-label="Publish Guide"
            >
              <Share2 className="w-4 h-4 text-emerald-600 shrink-0 pointer-events-none" />
              <span className="hidden sm:inline text-emerald-700 font-semibold pointer-events-none">Publish Guide</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
