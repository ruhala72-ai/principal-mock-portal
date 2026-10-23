import React, { useState } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { ExamEngine } from './components/ExamEngine';
import { ResultAnalytics } from './components/ResultAnalytics';
import { QuestionBankAdmin } from './components/QuestionBankAdmin';
import { PublishGuideModal } from './components/PublishGuideModal';
import { VisualSmartNotes } from './components/VisualSmartNotes';
import { RevisionQuestionsModal } from './components/RevisionQuestionsModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ExamType } from './types/quiz';
import { safeStorage } from './utils/safeStorage';

const MainAppContent: React.FC = () => {
  const { session, startTest, clearActiveSession } = useQuiz();

  const [currentTab, setCurrentTab] = useState<'home' | 'test' | 'admin' | 'review' | 'notes'>(() => {
    try {
      const saved = safeStorage.getItem('principal_active_exam_session_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.questionIds) && parsed.questionIds.length > 0) {
          return parsed.isSubmitted ? 'review' : 'test';
        }
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);

  // Reliable unconditional Home navigation, clearing any stuck session state & scrolling to top
  const handleGoHome = () => {
    try {
      clearActiveSession();
    } catch (e) {
      console.error('Error clearing active session:', e);
    }
    try {
      safeStorage.removeItem('principal_active_exam_session_v3');
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentTab('home');
  };

  // Immediate full-screen Visual Smart Notes navigation
  const handleOpenNotes = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentTab('notes');
  };

  const handleStartExam = (examType: ExamType) => {
    try {
      if (!session || session.examType !== (examType === 'uppcs-principal' ? 'up-aided-principal' : examType)) {
        const res = startTest(examType);
        if (!res.started) {
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCurrentTab('test');
    } catch (e) {
      console.error('Error starting exam, falling back to home:', e);
      handleGoHome();
    }
  };

  const handleTestSubmitted = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentTab('review');
  };

  const handleRetakeTest = () => {
    try {
      if (session) {
        const res = startTest(session.examType, session.durationMinutes, session.targetQuestionCount, session.isPracticeMode);
        if (res.started) {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setCurrentTab('test');
        } else {
          handleGoHome();
        }
      } else {
        handleGoHome();
      }
    } catch (e) {
      console.error('Error retaking test, falling back to home:', e);
      handleGoHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans pointer-events-auto relative">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openPublishGuide={() => setIsPublishGuideOpen(true)}
        openRevisionModal={() => setIsRevisionOpen(true)}
        onNavigateHome={handleGoHome}
      />

      <main className="flex-1 pointer-events-auto relative z-10">
        <ErrorBoundary
          componentName={`Tab: ${currentTab}`}
          onReset={handleGoHome}
        >
          {currentTab === 'home' && (
            <HomeHero
              onStartExam={handleStartExam}
              onOpenAdmin={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setCurrentTab('admin');
              }}
              onOpenNotes={handleOpenNotes}
              onOpenRevision={() => setIsRevisionOpen(true)}
            />
          )}

          {currentTab === 'test' && (
            <ExamEngine onTestSubmitted={handleTestSubmitted} />
          )}

          {currentTab === 'review' && (
            <ResultAnalytics
              onRetake={handleRetakeTest}
              onGoHome={handleGoHome}
            />
          )}

          {/* PERMANENT FULL-SCREEN VISUAL SMART NOTES VIEW */}
          {currentTab === 'notes' && (
            <VisualSmartNotes onBackToHome={handleGoHome} />
          )}

          {currentTab === 'admin' && (
            <QuestionBankAdmin />
          )}
        </ErrorBoundary>
      </main>

      {/* Persistent Pinned / Revision Questions Modal */}
      <RevisionQuestionsModal
        isOpen={isRevisionOpen}
        onClose={() => setIsRevisionOpen(false)}
        onStartPractice={() => {
          setIsRevisionOpen(false);
          window.scrollTo({ top: 0, behavior: 'instant' });
          setCurrentTab('test');
        }}
      />

      {/* Deployment & Publish Guide Modal */}
      <PublishGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary
      componentName="Application Root"
      onReset={() => {
        try {
          safeStorage.removeItem('principal_active_exam_session_v3');
          window.location.reload();
        } catch {
          // ignore
        }
      }}
    >
      <QuizProvider>
        <MainAppContent />
      </QuizProvider>
    </ErrorBoundary>
  );
}
