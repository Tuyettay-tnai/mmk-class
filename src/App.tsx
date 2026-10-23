import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseModulesSection } from './components/CourseModulesSection';
import { ExpertSection } from './components/ExpertSection';
import { ScheduleSection } from './components/ScheduleSection';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessCelebrationModal } from './components/SuccessCelebrationModal';
import { Footer } from './components/Footer';
import { SubmissionResult } from './types';

const STORAGE_KEY_WEBHOOK = 'mnk_class_apps_script_url_v2';
export const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLoVS-oRP5sW49BGL9o8F_yiSYC5xFvg8yNydzCSb25YTtbcsK8ygPkvjsFs18xNhpXg/exec';

export default function App() {
  const [appsScriptUrl, setAppsScriptUrl] = useState<string>(DEFAULT_APPS_SCRIPT_URL);
  const [selectedCourse, setSelectedCourse] = useState<string>('Trọn bộ combo 4 khóa học AI MMK - CLASS');
  const [celebrationResult, setCelebrationResult] = useState<SubmissionResult | null>(null);

  // Load saved Webhook URL from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEBHOOK);
      if (saved && saved.startsWith('http')) {
        setAppsScriptUrl(saved);
      } else {
        setAppsScriptUrl(DEFAULT_APPS_SCRIPT_URL);
        localStorage.setItem(STORAGE_KEY_WEBHOOK, DEFAULT_APPS_SCRIPT_URL);
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

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
        onScrollToForm={scrollToForm}
      />

      <main className="flex-1">
        {/* Hero Banner with Poster Aesthetic */}
        <HeroSection
          onScrollToForm={scrollToForm}
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
          onSuccess={(result) => setCelebrationResult(result)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Success Celebration Popup */}
      <SuccessCelebrationModal
        isOpen={Boolean(celebrationResult)}
        result={celebrationResult}
        onClose={() => setCelebrationResult(null)}
      />

    </div>
  );
}
