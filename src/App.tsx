import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseModulesSection } from './components/CourseModulesSection';
import { ExpertSection } from './components/ExpertSection';
import { ScheduleSection } from './components/ScheduleSection';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessCelebrationModal } from './components/SuccessCelebrationModal';
import { AppsScriptModal } from './components/AppsScriptModal';
import { Footer } from './components/Footer';
import { SubmissionResult } from './types';

const STORAGE_KEY_WEBHOOK = 'mnk_class_apps_script_url';
export const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx23KUPBW5KKM4iNtNZ250XGbIMK6Tj2QoqMCytz8_MqROEH4Wto5wuYdNGPQdGlXSxng/exec';

export default function App() {
  const [appsScriptUrl, setAppsScriptUrl] = useState<string>(DEFAULT_APPS_SCRIPT_URL);
  const [selectedCourse, setSelectedCourse] = useState<string>('Trọn bộ combo 4 khóa học AI MNK - Class');
  const [isAppsScriptModalOpen, setIsAppsScriptModalOpen] = useState(false);
  const [celebrationResult, setCelebrationResult] = useState<SubmissionResult | null>(null);

  // Load saved Webhook URL from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEBHOOK);
      if (saved) {
        setAppsScriptUrl(saved);
      } else {
        setAppsScriptUrl(DEFAULT_APPS_SCRIPT_URL);
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  const handleSaveAppsScriptUrl = (url: string) => {
    setAppsScriptUrl(url);
    try {
      localStorage.setItem(STORAGE_KEY_WEBHOOK, url);
    } catch (e) {
      // Ignore
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCourse = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Top Navigation */}
      <Navbar
        onOpenAppsScriptModal={() => setIsAppsScriptModalOpen(true)}
        onScrollToForm={scrollToForm}
      />

      <main className="flex-1">
        {/* Hero Banner with Poster Aesthetic */}
        <HeroSection
          onScrollToForm={scrollToForm}
          onOpenAppsScriptModal={() => setIsAppsScriptModalOpen(true)}
        />

        {/* 4 Flagship Modules */}
        <CourseModulesSection
          onSelectCourseToRegister={handleSelectCourse}
        />

        {/* Chuyên Gia AI Ngô Tuyết Profile & Values */}
        <ExpertSection />

        {/* Zoom Schedule & 30-min Reminder */}
        <ScheduleSection />

        {/* Registration Form with Apps Script Webhook */}
        <RegistrationForm
          initialCourse={selectedCourse}
          appsScriptUrl={appsScriptUrl}
          onOpenAppsScriptModal={() => setIsAppsScriptModalOpen(true)}
          onSuccess={(result) => setCelebrationResult(result)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAppsScriptModal={() => setIsAppsScriptModalOpen(true)}
      />

      {/* Success Celebration Popup */}
      <SuccessCelebrationModal
        isOpen={Boolean(celebrationResult)}
        result={celebrationResult}
        onClose={() => setCelebrationResult(null)}
      />

      {/* Developer Apps Script Code & Setup Modal */}
      <AppsScriptModal
        isOpen={isAppsScriptModalOpen}
        appsScriptUrl={appsScriptUrl}
        onSaveUrl={handleSaveAppsScriptUrl}
        onClose={() => setIsAppsScriptModalOpen(false)}
      />

    </div>
  );
}
