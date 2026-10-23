import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ErrorBoundary } from './ErrorBoundary';
import {
  BookOpen,
  Workflow,
  Scale,
  Printer,
  Sparkles,
  ArrowLeft,
  Home,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight
} from 'lucide-react';

export type ModuleId = 'ccs-rules' | 'gfr-2017' | 'up-act-1921';

interface VisualSmartNotesProps {
  onBackToHome: () => void;
}

export const VisualSmartNotes: React.FC<VisualSmartNotesProps> = ({ onBackToHome }) => {
  const { languageMode } = useQuiz();
  const safeLang = languageMode || 'both';
  const [activeModule, setActiveModule] = useState<ModuleId>('ccs-rules');

  const modules = [
    {
      id: 'ccs-rules' as ModuleId,
      titleEn: 'CCS Rules (Conduct, CCA & Leave)',
      titleHi: 'केंद्रीय सिविल सेवा नियम (आचरण, सीसीए एवं अवकाश)',
      icon: Scale,
      tag: 'UPSC CRT Area 6 & 7'
    },
    {
      id: 'gfr-2017' as ModuleId,
      titleEn: 'GFR 2017 & GeM Public Procurement',
      titleHi: 'सामान्य वित्तीय नियमावली 2017 एवं GeM क्रय सीमाएं',
      icon: Workflow,
      tag: 'UPSC CRT Area 6 & UP Sec 3'
    },
    {
      id: 'up-act-1921' as ModuleId,
      titleEn: 'UP Intermediate Education Act 1921',
      titleHi: 'उत्तर प्रदेश इंटरमीडिएट शिक्षा अधिनियम 1921',
      icon: BookOpen,
      tag: 'UP Inter College Sec 3'
    }
  ];

  const safeModules = Array.isArray(modules) ? modules : [];

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error('Print error:', e);
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    onBackToHome();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 pointer-events-auto relative">
      {/* 1. STICKY TOP PROMINENT HEADER WITH LARGE BACK TO HOME BUTTON */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-3 sm:px-6 py-3 no-print pointer-events-auto">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleBack();
            }}
            className="px-4 sm:px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer pointer-events-auto touch-manipulation relative z-50"
            title="Return to Home Dashboard"
          >
            <ArrowLeft className="w-4 h-4 pointer-events-none" />
            <span className="pointer-events-none">← Back to Home / मुख्य पृष्ठ</span>
          </button>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 pointer-events-none">
              Visual Smart Notes
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePrint();
              }}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer pointer-events-auto touch-manipulation relative z-50"
              title="Print or Save Visual Smart Notes as PDF"
            >
              <Printer className="w-4 h-4 pointer-events-none" />
              <span className="pointer-events-none">Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-5 space-y-6">
        {/* Main Banner Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Permanent Full-Screen Digest
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">Bilingual English & हिन्दी</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Visual Smart Notes / सचित्र स्मार्ट नोट्स
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              High-yield administrative digests, interactive statutory flowcharts, and scenario case studies for UPSC Principal & UP Aided Inter College Principal examinations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap no-print">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Home Dashboard</span>
            </button>
          </div>
        </div>

        {/* Module Selector Segmented Tabs */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {safeModules.map(mod => {
            if (!mod || !mod.id) return null;
            const Icon = mod.icon || BookOpen;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveModule(mod.id);
                }}
                className={`p-3.5 rounded-xl text-left transition-all flex items-start gap-3 cursor-pointer pointer-events-auto touch-manipulation relative z-20 ${
                  isActive
                    ? 'bg-white shadow-xs border border-slate-200/80 text-indigo-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{mod.titleEn || 'Module'}</div>
                  <div className="text-[11px] text-slate-500 font-devanagari truncate">{mod.titleHi || ''}</div>
                  <span className="text-[10px] text-indigo-600 font-semibold mt-0.5 block">{mod.tag || ''}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Module 1: CCS Rules */}
        {activeModule === 'ccs-rules' && (
          <ErrorBoundary componentName="CCS Rules Module" onReset={handleBack}>
            <CCSRulesModule languageMode={safeLang} />
          </ErrorBoundary>
        )}

        {/* Module 2: GFR 2017 & GeM */}
        {activeModule === 'gfr-2017' && (
          <ErrorBoundary componentName="GFR 2017 Module" onReset={handleBack}>
            <GFRModule languageMode={safeLang} />
          </ErrorBoundary>
        )}

        {/* Module 3: UP Act 1921 */}
        {activeModule === 'up-act-1921' && (
          <ErrorBoundary componentName="UP Education Act Module" onReset={handleBack}>
            <UPActModule languageMode={safeLang} />
          </ErrorBoundary>
        )}

        {/* Bottom Prominent Return Button */}
        <div className="no-print pt-6 pb-4 flex items-center justify-between border-t border-slate-200">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleBack();
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer pointer-events-auto touch-manipulation relative z-20"
          >
            <ArrowLeft className="w-4 h-4 pointer-events-none" />
            <span className="pointer-events-none">← Back to Home / मुख्य पृष्ठ पर लौटें</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePrint();
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer pointer-events-auto touch-manipulation relative z-20"
          >
            <Printer className="w-4 h-4 pointer-events-none" />
            <span className="pointer-events-none">Print Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MODULE 1: CCS RULES (DEFENSIVELY GUARDED: RULE 3, 11, 14 PIPELINE)
// ============================================================================
const CCSRulesModule: React.FC<{ languageMode?: string }> = ({ languageMode = 'both' }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      titleEn: '1. Preliminary Fact-Finding',
      titleHi: '1. प्राथमिक तथ्य-जांच',
      statute: 'Vigilance Manual & DOPT Guidelines',
      descEn: 'Disciplinary Authority orders confidential preliminary inquiry or fact-finding report to verify prima facie merit of allegations before formal charge sheeting.',
      descHi: 'अनुशासनात्मक प्राधिकारी औपचारिक आरोप पत्र जारी करने से पूर्व आरोपों की प्रथम दृष्टया सत्यता जांचने के लिए गोपनीय तथ्य-अन्वेषण कराते हैं।'
    },
    {
      titleEn: '2. Rule 14 Charge Sheet (Major Penalty)',
      titleHi: '2. नियम 14 आरोप पत्र (दीर्घ शास्ति)',
      statute: 'CCS (CCA) Rules 1965, Rule 14(3)',
      descEn: 'Charge sheet issued with 4 Annexures: Annexure I (Articles of Charge), Annexure II (Imputations of Misconduct), Annexure III (Documents list), Annexure IV (Witnesses list). Charged Officer gets 15 days to reply.',
      descHi: 'चार अनुलग्नकों सहित आरोप पत्र जारी: अनुलग्नक I (आरोप), अनुलग्नक II (कदाचार का विवरण), अनुलग्नक III (दस्तावेज़ सूची), अनुलग्नक IV (गवाह सूची)। 15 दिन में उत्तर मांगा जाता है।'
    },
    {
      titleEn: '3. Appointment of IO & PO',
      titleHi: '3. जांच अधिकारी (IO) एवं प्रस्तुतकर्ता अधिकारी (PO) की नियुक्ति',
      statute: 'CCS (CCA) Rules 1965, Rule 14(5)',
      descEn: 'If Charged Officer denies charges, Disciplinary Authority appoints an independent Inquiry Officer (IO) to inquire and a Presenting Officer (PO) to present the case of the Disciplinary Authority.',
      descHi: 'आरोप अस्वीकार करने पर निष्पक्ष जांच अधिकारी (IO) एवं विभाग का पक्ष रखने हेतु प्रस्तुतकर्ता अधिकारी (PO) नियुक्त किए जाते हैं।'
    },
    {
      titleEn: '4. Regular Oral Inquiry Proceedings',
      titleHi: '4. नियमित मौखिक साक्ष्य एवं प्रतिपरीक्षण',
      statute: 'CCS (CCA) Rules 1965, Rule 14(14)-(18)',
      descEn: 'Preliminary hearing -> Inspection of listed documents -> Examination & cross-examination of State witnesses -> Defense statement & witnesses -> Written briefs by PO and Defense Assistant.',
      descHi: 'प्रारंभिक सुनवाई -> अभिलेखों का निरीक्षण -> सरकारी गवाहों का परीक्षण व जिरह -> बचाव पक्ष के गवाह -> प्रस्तुतकर्ता व बचाव सहायक द्वारा लिखित तर्कों का प्रस्तुतीकरण।'
    },
    {
      titleEn: '5. IO Report & Disciplinary Order',
      titleHi: '5. जांच रिपोर्ट एवं अंतिम दंडादेश',
      statute: 'CCS (CCA) Rules 1965, Rule 15',
      descEn: 'IO submits report with findings on each article. Copy sent to Charged Officer for 15-day representation. Disciplinary Authority passes a reasoned speaking order (Exoneration or Penalty under Rule 11).',
      descHi: 'जांच अधिकारी प्रत्येक आरोप पर निष्कर्ष रिपोर्ट देते हैं। रिपोर्ट कर्मचारी को 15 दिन के प्रत्यावेदन हेतु भेजी जाती है। अंततः प्राधिकारी सकारण आदेश पारित करते हैं।'
    }
  ];

  const safeSteps = Array.isArray(steps) && steps.length > 0 ? steps : [];
  const safeIndex = (activeStep >= 0 && activeStep < safeSteps.length) ? activeStep : 0;
  const currentStep = safeSteps[safeIndex] || {
    titleEn: 'Disciplinary Stage',
    titleHi: 'अनुशासनात्मक चरण',
    statute: 'CCS Rules',
    descEn: 'Statutory disciplinary procedure',
    descHi: 'विभागीय अनुशासनात्मक प्रक्रिया'
  };

  return (
    <div className="space-y-6">
      {/* Key Statutory Benchmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Conduct Rules 1964 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h3 className="font-bold text-sm text-slate-900">
              CCS (Conduct) Rules 1964
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-indigo-700 shrink-0">Rule 3:</span>
              <span>Maintain absolute integrity, devotion to duty, and avoid conduct unbecoming of a Government servant.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-indigo-700 shrink-0">Rule 5:</span>
              <span>Strict ban on political affiliations or canvassing in elections.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-indigo-700 shrink-0">Rule 13:</span>
              <span>Ceiling limits on accepting gifts from personal friends vs official contacts.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-indigo-700 shrink-0">Rule 18:</span>
              <span>Mandatory prior intimation / sanction for immovable property transactions.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Penalties Hierarchy */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h3 className="font-bold text-sm text-slate-900">
              CCS (CCA) Penalties (Rule 11)
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
              <span className="font-bold block text-emerald-800">Minor Penalties (Rule 16 procedure):</span>
              (i) Censure, (ii) Withholding of promotion, (iii) Recovery from pay for pecuniary loss, (iv) Withholding of increments without cumulative effect.
            </div>
            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-950">
              <span className="font-bold block text-rose-800">Major Penalties (Rule 14 procedure):</span>
              (v) Reduction to lower stage/grade, (vi) Compulsory retirement, (vii) Removal from service, (viii) Dismissal (disqualification for future govt post).
            </div>
          </div>
        </div>

        {/* Card 3: Leave Rules 1972 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h3 className="font-bold text-sm text-slate-900">
              CCS (Leave) Rules 1972
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li><strong>Earned Leave (EL):</strong> 30 days/yr (15 on 1 Jan, 15 on 1 Jul). Max accumulation: <strong>300 days</strong>.</li>
            <li><strong>Half Pay Leave (HPL):</strong> 20 days/yr (10 on 1 Jan, 10 on 1 Jul).</li>
            <li><strong>Maternity Leave:</strong> <strong>180 days</strong> with full salary (&lt; 2 surviving children).</li>
            <li><strong>Paternity Leave:</strong> <strong>15 days</strong> within 6 months of delivery.</li>
            <li><strong>Child Care Leave (CCL):</strong> <strong>730 days</strong> in entire service for female / single male employee (100% pay for first 365, 80% for next 365).</li>
          </ul>
        </div>
      </div>

      {/* Interactive Visual Flowchart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Interactive Visual Flowchart: Major Disciplinary Proceedings Pipeline (Rule 14)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              नियम 14 के अंतर्गत विभागीय अनुशासनात्मक कार्यवाही का चरणबद्ध विधिक प्रवाह
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200 self-start sm:self-auto">
            Rule 14 Procedure
          </span>
        </div>

        {/* Step Progression Bar */}
        {safeSteps.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2">
            {safeSteps.map((st, idx) => {
              const label = st?.titleEn
                ? (st.titleEn.includes('. ') ? st.titleEn.split('. ')[1] : st.titleEn)
                : `Stage ${idx + 1}`;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    safeIndex === idx
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold opacity-80">Stage {idx + 1}</div>
                  <div className="text-xs font-bold truncate mt-0.5">{label}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Stage Details Panel */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-bold text-sm text-indigo-950">
              {currentStep?.titleEn || 'Disciplinary Stage'}
            </h4>
            <span className="text-xs font-semibold px-2 py-0.5 bg-white rounded border border-indigo-200 text-indigo-700">
              {currentStep?.statute || 'Statute'}
            </span>
          </div>
          {(languageMode === 'en' || languageMode === 'both') && currentStep?.descEn && (
            <p className="text-xs sm:text-sm text-indigo-900/90 leading-relaxed">
              {currentStep.descEn}
            </p>
          )}
          {(languageMode === 'hi' || languageMode === 'both') && currentStep?.descHi && (
            <p className="text-xs sm:text-sm text-indigo-950 font-devanagari leading-relaxed pt-1.5 border-t border-indigo-200/50">
              {currentStep.descHi}
            </p>
          )}
        </div>
      </div>

      {/* Scenario-Based Practical Case Study */}
      <div className="bg-slate-900 rounded-2xl text-white p-6 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Real Examination Administrative Scenario #1 (CCS Rule 14 & Suspension)</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
          Case: A school Vice-Principal was placed under suspension under Rule 10(1) pending investigation. 95 days have passed, and no review of suspension was conducted by the Review Committee. Is the continued suspension legally valid?
        </h4>
        <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-emerald-400 block">
            Statutory Legal Solution:
          </span>
          <p className="text-slate-300 leading-relaxed">
            Under <strong>CCS (CCA) Rule 10(6) & 10(7)</strong>, an order of suspension made or deemed to have been made shall not be valid after a period of <strong>90 days</strong> unless it is extended after review by the Review Committee before expiry of 90 days. Because 95 days have elapsed without formal review, the continued suspension is <strong>legally invalid and void</strong>.
          </p>
          <p className="text-slate-300 font-devanagari leading-relaxed pt-1 border-t border-slate-700/60">
            नियम 10(6) व 10(7) के अनुसार 90 दिनों के भीतर समीक्षा समिति द्वारा समीक्षा न किए जाने पर निलंबन आदेश स्वतः निष्प्रभावी व अवैध हो जाता है।
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MODULE 2: GFR 2017 & GeM
// ============================================================================
const GFRModule: React.FC<{ languageMode?: string }> = ({ languageMode = 'both' }) => {
  return (
    <div className="space-y-6">
      {/* GeM Thresholds Visual Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                GFR 2017 Rule 149: Government e-Marketplace (GeM) Procurement Thresholds
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              सरकारी ई-मार्केटप्लेस (GeM) के माध्यम से वस्तुओं एवं सेवाओं की अनिवार्य खरीद सीमाएँ
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
            Mandatory GeM Procurement
          </span>
        </div>

        {/* 3 Threshold Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase">Tier 1: Up to ₹25,000</div>
            <div className="text-lg font-bold text-slate-900">Direct Purchase</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Allowed through any available seller on GeM meeting requisite quality, specification, and delivery period. No comparison required.
            </p>
            {(languageMode === 'hi' || languageMode === 'both') && (
              <div className="text-[11px] text-slate-500 font-devanagari pt-1 border-t border-slate-200">
                ₹25,000 तक GeM पर किसी भी उपलब्ध विक्रेता से सीधे क्रय किया जा सकता है।
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/70 space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">Tier 2: ₹25,000 to ₹5,00,000</div>
            <div className="text-lg font-bold text-indigo-950">L1 Comparison</div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Mandatory comparison among at least <strong>3 distinct manufacturers/sellers</strong> on GeM meeting specifications to select the Lowest Bidder (L1).
            </p>
            {(languageMode === 'hi' || languageMode === 'both') && (
              <div className="text-[11px] text-indigo-800 font-devanagari pt-1 border-t border-indigo-200">
                कम से कम 3 अलग-अलग निर्माताओं की तुलना करके न्यूनतम बोलीदाता (L1) का चयन अनिवार्य।
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/70 space-y-2">
            <div className="text-xs font-bold text-purple-600 uppercase">Tier 3: Above ₹5,00,000</div>
            <div className="text-lg font-bold text-purple-950">Mandatory Online Bidding</div>
            <p className="text-xs text-purple-900 leading-relaxed">
              Mandatory bidding or Reverse Auction (RA) through GeM tool across all registered vendors. Open tender competitive bidding.
            </p>
            {(languageMode === 'hi' || languageMode === 'both') && (
              <div className="text-[11px] text-purple-800 font-devanagari pt-1 border-t border-purple-200">
                ₹5,00,000 से अधिक पर GeM के माध्यम से ऑनलाइन ई-बिडिंग या रिवर्स ऑक्शन अनिवार्य है।
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Assets vs Consumables Registers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">Form GFR 22: Fixed Assets Register</h4>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Rule 211(ii)(a)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Maintained for permanent plant, machinery, furniture, computers, lab equipment. Must record location, cost, supplier, and annual physical verification date.
          </p>
          <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <strong>Statutory Rule 213:</strong> Physical verification of fixed assets must be conducted at least <strong>once every year</strong> by a designated officer other than the custodian.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900">Form GFR 23: Consumables Register</h4>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Rule 211(ii)(b)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Maintained for expendable stores like stationery, chemicals, printer cartridges, sports consumables, chalks. Must record receipt, issue, and balance stock.
          </p>
          <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <strong>Statutory Principle:</strong> Issue must be against signed requisition slip. No purchase of consumables can be sanctioned if adequate balance is in stock.
          </div>
        </div>
      </div>

      {/* Scenario-Based Practical Case Study */}
      <div className="bg-slate-900 rounded-2xl text-white p-6 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Real Examination Administrative Scenario #2 (GFR Rule 157 & Order Splitting)</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
          Case: A Principal splits a single annual procurement of lab science kits worth ₹85,000 into four separate purchase orders of ₹21,250 each to purchase directly without a Local Purchase Committee or GeM L1 comparison. Is this permissible?
        </h4>
        <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-rose-400 block">
            Statutory Legal Solution:
          </span>
          <p className="text-slate-300 leading-relaxed">
            Under <strong>GFR 2017 Rule 157</strong>, a demand for goods shall not be divided into smaller quantities to make piecemeal purchases to avoid the necessity of obtaining the sanction of higher authority or to bypass procurement methods (e.g., LPC under Rule 155 or GeM L1 comparison). Such splitting is a <strong>serious financial irregularity</strong> actionable under CCS (CCA) Rules.
          </p>
          <p className="text-slate-300 font-devanagari leading-relaxed pt-1 border-t border-slate-700/60">
            जीएफआर नियम 157 के अनुसार उच्च प्राधिकारी की स्वीकृति अथवा निविदा/तुलना प्रक्रिया से बचने हेतु मांग को टुकड़ों में विभाजित करना गंभीर वित्तीय अनियमितता है।
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MODULE 3: UP INTERMEDIATE EDUCATION ACT 1921
// ============================================================================
const UPActModule: React.FC<{ languageMode?: string }> = ({ languageMode = 'both' }) => {
  return (
    <div className="space-y-6">
      {/* Statutory Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Section 16G Suspension 60-Day Clock */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              Crucial 60-Day Rule
            </span>
            <span className="text-xs text-slate-400 font-bold">Sec 16G(7)</span>
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            DIOS Approval for Suspension
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            No order of suspension shall remain in force for more than <strong>60 days</strong> unless approved in writing by the District Inspector of Schools (DIOS). If not approved within 60 days, the suspension order <strong>automatically lapses</strong>.
          </p>
          {(languageMode === 'hi' || languageMode === 'both') && (
            <div className="text-[11px] text-slate-500 font-devanagari pt-1 border-t border-slate-100">
              प्रबंध समिति द्वारा निलंबित किए जाने पर जिला विद्यालय निरीक्षक (DIOS) द्वारा 60 दिनों के भीतर लिखित अनुमोदन आवश्यक है।
            </div>
          )}
        </div>

        {/* Section 16G Dismissal & Commission Approval */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
              Commission Approval
            </span>
            <span className="text-xs text-slate-400 font-bold">Sec 16G(3)</span>
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Termination / Dismissal
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            No Principal or Teacher can be dismissed, removed, or reduced in rank without prior approval of the UP Secondary Education Services Selection Board (Commission / UP Act 5 of 1982). Unapproved termination is void ab initio.
          </p>
          {(languageMode === 'hi' || languageMode === 'both') && (
            <div className="text-[11px] text-slate-500 font-devanagari pt-1 border-t border-slate-100">
              आयोग (चयन बोर्ड) के पूर्व अनुमोदन के बिना सेवा समाप्ति या पद अवनति का कोई भी आदेश पूर्णतः शून्य (अवैध) होगा।
            </div>
          )}
        </div>

        {/* Probation & Confirmation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Probation Law
            </span>
            <span className="text-xs text-slate-400 font-bold">Reg. 10 Ch. III</span>
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Probation Period & Confirmation
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Initial probation is <strong>1 year</strong>, extendable by Management for max <strong>1 additional year</strong> (total max 2 years). If not discharged before 2 years, the head or teacher is <strong>deemed confirmed</strong> in law.
          </p>
          {(languageMode === 'hi' || languageMode === 'both') && (
            <div className="text-[11px] text-slate-500 font-devanagari pt-1 border-t border-slate-100">
              परिवीक्षा अवधि 1 वर्ष, अधिकतम 1 वर्ष और बढ़ाई जा सकती है। 2 वर्ष पूर्ण होने पर स्वतः स्थायीकरण (Deemed Confirmed) माना जाता है।
            </div>
          )}
        </div>
      </div>

      {/* Scenario-Based Practical Case Study */}
      <div className="bg-slate-900 rounded-2xl text-white p-6 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Real Examination Administrative Scenario #3 (Section 16G(7) Suspension Lapse)</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
          Case: The Committee of Management of an aided Inter College placed the Principal under suspension on 1st January and forwarded papers to the DIOS on 5th January. The DIOS did not pass any order either approving or disapproving the suspension until 15th March (74 days). On 16th March, can the Principal resume duty and claim salary?
        </h4>
        <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-emerald-400 block">
            Statutory Legal Solution:
          </span>
          <p className="text-slate-300 leading-relaxed">
            Yes, under <strong>Section 16G(7) of the UP Intermediate Education Act 1921</strong>, no order of suspension shall remain in force for more than 60 days unless approved in writing by the Inspector. Upon the expiry of the 60th day (1st March), the suspension automatically lapsed. The Principal is entitled to <strong>resume full official duties</strong> and receive full salary from the 61st day onward as held by the Allahabad High Court Full Bench.
          </p>
          <p className="text-slate-300 font-devanagari leading-relaxed pt-1 border-t border-slate-700/60">
            60 दिन बीतने पर निलंबन आदेश स्वतः निरस्त हो गया। प्रधानाचार्य कार्यभार ग्रहण करने और पूर्ण वेतन प्राप्त करने के कानूनी रूप से हकदार हैं।
          </p>
        </div>
      </div>
    </div>
  );
};
