export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  selectedCourse: string;
  occupation: string;
  expectations: string;
}

export interface SubmissionResult {
  success: boolean;
  ticketCode?: string;
  message: string;
  studentName?: string;
  zaloGroupUrl?: string;
  timestamp?: string;
}

export interface ShowcaseProduct {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  aspectRatio?: 'video' | 'portrait' | 'square';
}

export interface CourseModule {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  skills: string[];
  platforms?: string[];
  audience: string;
  iconType: 'code' | 'chatgpt' | 'video' | 'book';
  badgeColor: string;
  highlights: string[];
  showcaseProducts?: ShowcaseProduct[];
}
