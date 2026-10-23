import React from 'react';
import { X, Globe, Smartphone, Cloud, Database, ExternalLink, Check, Copy, Code } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 my-auto animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Preview & Online Publishing Guide
              </h3>
              <p className="text-[11px] text-slate-500">
                How to preview on Android mobile & deploy for live students
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
          {/* Section 1: Android Mobile Preview */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>1. How to Preview on Android Mobile</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              This application has been built mobile-first with touch-friendly 48px+ targets, collapsible Question Palette drawer, and native Devanagari typography.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>In the AI Studio header, look for the <strong>Share</strong> or <strong>Open in New Tab</strong> icon.</li>
              <li>Open the link on your Android phone's Google Chrome or mobile browser.</li>
              <li>You can tap the browser menu and select <strong>"Add to Home screen"</strong> to run it as a standalone app-like experience.</li>
            </ul>
          </div>

          {/* Section 2: Online Publishing */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Cloud className="w-4 h-4 text-emerald-600" />
              <span>2. How to Publish Online for Students</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              You have several free and production-grade hosting choices:
            </p>
            
            <div className="space-y-2 pt-1">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block text-xs">Option A: Vercel / Netlify (Recommended for Quick Web Hosting)</span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  1. Push the code to a GitHub repository.<br />
                  2. Connect GitHub to Vercel or Netlify.<br />
                  3. Build command: <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">npm run build</code>, Output directory: <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">dist</code>.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block text-xs">Option B: Google Cloud Run / Docker</span>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Deploy as a containerized service with automatic scaling and custom domain mapping using Google Cloud Run.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Data Storage & Persistence Note */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-amber-900">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
              <Database className="w-4 h-4 text-amber-700" />
              <span>3. Data Storage & Backup Notice</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-800">
              In this working prototype, custom questions and test progress are safely preserved in your browser's <strong>Local Storage</strong>.
            </p>
            <p className="text-xs leading-relaxed text-amber-800">
              <strong>Best Practice:</strong> Use the <strong>"Export Question Bank"</strong> button in the Question Bank tab to save regular JSON backups of your questions. To enable multi-user central cloud synchronization across different student devices, a persistent database (Firebase Firestore or PostgreSQL) can be enabled.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
          >
            Got it / समझ लिया
          </button>
        </div>
      </div>
    </div>
  );
};
