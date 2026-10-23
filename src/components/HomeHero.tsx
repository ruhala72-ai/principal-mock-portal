import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ExamType } from '../types/quiz';
import { safeStorage } from '../utils/safeStorage';
import { PracticeDisclaimerBanner } from './PracticeDisclaimerBanner';
import { ExamInstructionsModal } from './ExamInstructionsModal';
import { MockTestGeneratorModal } from './MockTestGeneratorModal';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  FileText,
  ShieldAlert,
  ChevronRight,
  Database,
  AlertTriangle,
  ExternalLink,
  Sliders,
  Check,
  Zap,
  ShieldCheck,
  X,
  Star
} from 'lucide-react';

interface Props {
  onStartExam: (examType: ExamType) => void;
  onOpenAdmin: () => void;
  onOpenNotes?: () => void;
  onOpenRevision?: () => void;
}

export const HomeHero: React.FC<Props> = ({
  onStartExam,
  onOpenAdmin,
  onOpenNotes,
  onOpenRevision
}) => {
  const {
    questions,
    activeExam,
    setActiveExam,
    examConfigs,
    startTest,
    autoGenerateAndLaunch120Test,
    getUsageStats,
    session,
    pinnedQuestionIds,
    clearActiveSession
  } = useQuiz();

  const handleResetSessionAndSwitchExam = () => {
    try {
      clearActiveSession();
    } catch (e) {
      console.error(e);
    }
    try {
      safeStorage.removeItem('principal_active_exam_session_v3');
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const [selectedLength, setSelectedLength] = useState<number>(120);
  const [instructionsExam, setInstructionsExam] = useState<ExamType | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [startWarning, setStartWarning] = useState<string | null>(null);

  const upscStats = getUsageStats('upsc-principal');
  const upAidedStats = getUsageStats('up-aided-principal');

  const handleInitiateExam = (examType: ExamType) => {
    setStartWarning(null);
    setActiveExam(examType);
    setInstructionsExam(examType);
  };

  const handleConfirmStart = async (
    examType: ExamType,
    targetCount: number,
    durationMinutes: number,
    isPracticeMode: boolean
  ) => {
    setStartWarning(null);
    const target = examType === 'uppcs-principal' ? 'up-aided-principal' : examType;
    if (session && !session.isSubmitted && session.examType === target && session.targetQuestionCount === 120 && session.questionIds.length === 120) {
      setInstructionsExam(null);
      onStartExam(examType);
      return;
    }
    const result = startTest(examType, durationMinutes, targetCount, isPracticeMode);
    if (result.started) {
      setInstructionsExam(null);
      onStartExam(examType);
    } else {
      if (!isPracticeMode && targetCount >= 120) {
        const autoRes = await autoGenerateAndLaunch120Test(examType, durationMinutes);
        if (autoRes.started) {
          setInstructionsExam(null);
          onStartExam(examType);
          return;
        }
      }
      setStartWarning(result.warning || 'Failed to start test due to question bank shortage.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8">
      {startWarning && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center justify-between gap-3 shadow-xs">
          <span>{startWarning}</span>
          <button
            onClick={() => setStartWarning(null)}
            className="text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Active Session Recovery / Switch Exam Banner */}
      {session && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2.5 text-indigo-950">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse shrink-0"></span>
            <div>
              <span className="font-bold block sm:inline">Active Mock Test Session: </span>
              <span className="text-indigo-800">{session.testTitle || session.examType} ({session.questionIds.length} Questions)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onStartExam(session.examType);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-xs relative z-20 pointer-events-auto touch-manipulation"
            >
              Resume Test
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleResetSessionAndSwitchExam();
              }}
              className="px-4 py-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl font-semibold cursor-pointer transition-colors relative z-20 pointer-events-auto touch-manipulation"
            >
              Switch Exam / Clear Session
            </button>
          </div>
        </div>
      )}

      {/* 1. Explicit Practice Advisory Banner */}
      <PracticeDisclaimerBanner compact={false} />

      {/* 2. Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bilingual Examination Simulation • Official Recruitment Standards</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Principal & Vice Principal <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
            Mock Test Portal
          </span>
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Comprehensive preparation portal based strictly on verified statutory syllabus notifications for <strong>UPSC Principal</strong>, <strong>UP Aided Inter College Principal</strong>, and <strong>UP Technical Education Principal</strong>.
        </p>

        {/* Global Test Length Selector */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-600 font-semibold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            Configured Full-Length Target:
          </span>
          {[120, 130, 140, 150].map(len => (
            <button
              key={len}
              onClick={() => setSelectedLength(len)}
              className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                selectedLength === len
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
              }`}
            >
              {len} Questions ({len * 2.5} Marks)
            </button>
          ))}
        </div>
      </div>

      {/* Quick Revision & Visual Smart Notes Action Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-5xl mx-auto w-full relative z-20 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onOpenRevision) onOpenRevision();
          }}
          className="relative z-20 pointer-events-auto touch-manipulation p-4 rounded-2xl bg-amber-50/90 hover:bg-amber-100 active:bg-amber-200 border-2 border-amber-200 hover:border-amber-400 text-left transition-all flex items-center justify-between gap-3 shadow-xs cursor-pointer group select-none"
          title="Open My Revision / Pinned Questions"
        >
          <div className="flex items-center gap-3 pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-200">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-amber-950">My Revision / Pinned Questions</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                  {pinnedQuestionIds.length} Saved
                </span>
              </div>
              <p className="text-xs text-amber-800/80 mt-0.5">
                Revise difficult statutory questions bookmarked during your tests
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-600 group-hover:translate-x-0.5 transition-transform shrink-0 pointer-events-none" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onOpenNotes) onOpenNotes();
          }}
          className="relative z-20 pointer-events-auto touch-manipulation p-4 rounded-2xl bg-indigo-50/90 hover:bg-indigo-100 active:bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-400 text-left transition-all flex items-center justify-between gap-3 shadow-xs cursor-pointer group select-none"
          title="Open Visual Smart Notes"
        >
          <div className="flex items-center gap-3 pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-indigo-950 block">Visual Smart Notes</span>
              <p className="text-xs text-indigo-800/80 mt-0.5">
                Scenario digests & interactive flowcharts for CCS, GFR & UP Act
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-0.5 transition-transform shrink-0 pointer-events-none" />
        </button>
      </div>

      {/* PROMINENT ZERO-REPEAT & UNLIMITED MOCK TEST GENERATOR BANNER */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-800/40 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Zap className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">
                Unlimited Mock Test Generator & Zero-Repeat Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Active & Persistent
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-1 leading-relaxed max-w-xl">
              Create endless custom or full-length mock tests. The portal permanently tracks previously served questions so you never see the same question repeated.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsGeneratorOpen(true)}
            className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-slate-950" />
            <span>Open Test Generator & Zero-Repeat Status</span>
          </button>
        </div>
      </div>

      {/* 3. Three Exam Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: UPSC Principal */}
        <div className={`rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
          activeExam === 'upsc-principal'
            ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100 ring-2 ring-indigo-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2.5">
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-200">
                UPSC Advt 07/2022
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Syllabus Verified
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              UPSC Principal / Vice Principal
            </h2>
            <p className="text-xs font-devanagari text-slate-600 mt-0.5">
              संघ लोक सेवा आयोग प्राचार्य / उप-प्राचार्य
            </p>

            {/* Zero-Repeat Bank status */}
            <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-700 space-y-1 border border-slate-200">
              <div className="flex items-center justify-between">
                <span><strong>Bank:</strong> {upscStats.approvedCount} Approved</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {upscStats.eligibleRemaining} Unused
                </span>
              </div>
              <div className="text-[10px] text-indigo-700 font-bold flex items-center justify-between pt-0.5">
                <span>⚡ Zero-Repeat Tests Ready:</span>
                <span>{upscStats.maxFullLengthPossible} full tests</span>
              </div>
            </div>

            {/* Syllabus Topics */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">CCS Conduct 1964 & Leave Rules 1972</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">General Financial Rules (GFR 2017) & GeM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">RTE Act 2009 & POCSO Act 2012</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">NEP 2020 & School Leadership</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2.5 font-medium">
              <span>Marking: +2.5 / -0.83 (-⅓)</span>
              <span>120 Mins</span>
            </div>
            <button
              onClick={() => handleInitiateExam('upsc-principal')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              <span>Start UPSC Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: UP Aided Inter College Principal */}
        <div className={`rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
          activeExam === 'up-aided-principal' || activeExam === 'uppcs-principal'
            ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100 ring-2 ring-indigo-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2.5">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                UPSESSB Advt 01/2011
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Syllabus Verified
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              UP Aided Inter College Principal
            </h2>
            <p className="text-xs font-devanagari text-slate-600 mt-0.5">
              उप्र अशासकीय सहायता प्राप्त इंटर कॉलेज
            </p>

            {/* Zero-Repeat Bank status */}
            <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-700 space-y-1 border border-slate-200">
              <div className="flex items-center justify-between">
                <span><strong>Bank:</strong> {upAidedStats.approvedCount} Approved</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {upAidedStats.eligibleRemaining} Unused
                </span>
              </div>
              <div className="text-[10px] text-emerald-800 font-bold flex items-center justify-between pt-0.5">
                <span>⚡ Zero-Repeat Tests Ready:</span>
                <span>{upAidedStats.maxFullLengthPossible} full tests</span>
              </div>
            </div>

            {/* Syllabus Topics */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">UP Intermediate Education Act 1921</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Payment of Salaries Act 1971 & Joint A/c</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">UPSESSB Act 1982 Section 18 Ad-hoc</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Scholar Register & Financial Handbook</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2.5 font-medium">
              <span>Marking: +2.5 / -0.83 (-⅓)</span>
              <span>120 Mins</span>
            </div>
            <button
              onClick={() => handleInitiateExam('up-aided-principal')}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-200 transition-all cursor-pointer"
            >
              <span>Start UP Aided Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: UP Technical Education Principal */}
        <div className={`rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
          activeExam === 'up-technical-principal'
            ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100 ring-2 ring-indigo-500/20'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2.5">
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[11px] border border-amber-200">
                UPPSC A-7/E-1/2021
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-700" /> Pending Verification
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              UP Technical Education Principal
            </h2>
            <p className="text-xs font-devanagari text-slate-600 mt-0.5">
              उप्र प्राविधिक शिक्षा (पॉलिटेक्निक) प्रधानाचार्य
            </p>

            <div className="mt-2.5 p-2 bg-amber-50/60 rounded-lg text-[11px] text-amber-900 space-y-0.5 border border-amber-200">
              <div><strong>Authority:</strong> UP Public Service Commission</div>
              <div><strong>Status:</strong> Pending official syllabus PDF verification</div>
            </div>

            {/* Syllabus Topics */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">AICTE Norms & Technical Governance (Pending)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">UP Polytechnic Institutional Admin (Pending)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">Technical Institutional Budget (Pending)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">NBA Accreditation & Industry Linkages</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2.5 font-medium">
              <span>Marking: +2.5 / -0.83 (-⅓)</span>
              <span>120 Mins</span>
            </div>
            <button
              onClick={() => handleInitiateExam('up-technical-principal')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-slate-200 transition-all cursor-pointer"
            >
              <span>Verify / Start Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Portal Key Capabilities */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <span>Real Examination Simulation Features (परीक्षा पोर्टल विशेषताएं)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              NTA / UPSC Question Palette
            </div>
            <p className="text-slate-600 leading-relaxed">
              Color-coded navigation palette (Answered, Not Answered, Not Visited, Marked for Review) with instant jump.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Strict Marking Scheme Engine
            </div>
            <p className="text-slate-600 leading-relaxed">
              +2.5 marks for correct, -0.83 (-2.5/3) deduction for incorrect, 0 for unattempted. Exact fractional balance.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              Question Bank & Duplicate Check
            </div>
            <p className="text-slate-600 leading-relaxed">
              Add your own questions with live heuristic duplicate detection, export/import JSON and manage question banks.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Admin & Management Quick Access */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-100 rounded-xl border border-slate-200 gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-800 block">Manage Official Syllabi & Question Banks</span>
            <span className="text-slate-500">Upload official PDF notifications, verify syllabus topics, configure 120–150 question tests</span>
          </div>
        </div>
        <button
          onClick={onOpenAdmin}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-semibold shrink-0 cursor-pointer"
        >
          Open Admin & Syllabus Manager
        </button>
      </div>

      {/* Pre-Exam Instructions & Configuration Modal */}
      {instructionsExam && (
        <ExamInstructionsModal
          isOpen={!!instructionsExam}
          examType={instructionsExam}
          onClose={() => setInstructionsExam(null)}
          onConfirmStart={handleConfirmStart}
          onOpenAdmin={onOpenAdmin}
        />
      )}

      {/* Unlimited Mock Test Generator & Zero-Repeat Modal */}
      <MockTestGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onStartExam={onStartExam}
        onOpenAdmin={onOpenAdmin}
        initialExam={activeExam}
      />
    </div>
  );
};
