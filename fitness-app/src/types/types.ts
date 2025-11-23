export interface Workout {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'hiit';
  duration: number; // in minutes
  calories: number;
  exercises: Exercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  rest?: number; // in seconds
  type: 'cardio' | 'strength' | 'flexibility';
}

export interface Activity {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  duration: number;
  calories: number;
  completed: boolean;
  type: 'cardio' | 'strength' | 'flexibility' | 'hiit';
}

export interface DailyActivity {
  date: string;
  workouts: Activity[];
  totalCalories: number;
  totalDuration: number;
  completedWorkouts: number;
}

export interface WeeklyProgress {
  week: string;
  days: {
    day: string;
    calories: number;
    duration: number;
    workouts: number;
  }[];
}

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserStats {
  totalWorkouts: number;
  totalCalories: number;
  totalMinutes: number;
  streak: number;
  favoriteWorkoutType: string;
}
