export interface MeditationSession {
  id: string;
  title: string;
  duration: number; // in minutes
  description: string;
  category: 'calm' | 'sleep' | 'focus' | 'anxiety';
  audioFile: string;
  imageUrl: string;
}

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface UserProgress {
  totalMinutes: number;
  streak: number;
  sessionsCompleted: number;
  lastSessionDate?: string;
}
