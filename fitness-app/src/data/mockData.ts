import { Workout, Activity, DailyActivity, WeeklyProgress, OnboardingSlide, UserStats } from '../types/types';

export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Morning Cardio Blast',
    type: 'cardio',
    duration: 30,
    calories: 300,
    difficulty: 'intermediate',
    description: 'High-intensity cardio to kickstart your day',
    exercises: [
      { id: 'e1', name: 'Jumping Jacks', duration: 60, type: 'cardio', rest: 30 },
      { id: 'e2', name: 'High Knees', duration: 60, type: 'cardio', rest: 30 },
      { id: 'e3', name: 'Burpees', duration: 45, type: 'cardio', rest: 45 },
      { id: 'e4', name: 'Mountain Climbers', duration: 60, type: 'cardio', rest: 30 },
    ],
  },
  {
    id: '2',
    name: 'Upper Body Strength',
    type: 'strength',
    duration: 45,
    calories: 250,
    difficulty: 'advanced',
    description: 'Build upper body strength and muscle',
    exercises: [
      { id: 'e5', name: 'Push-ups', sets: 4, reps: 15, type: 'strength', rest: 60 },
      { id: 'e6', name: 'Pull-ups', sets: 3, reps: 10, type: 'strength', rest: 90 },
      { id: 'e7', name: 'Dips', sets: 3, reps: 12, type: 'strength', rest: 60 },
      { id: 'e8', name: 'Plank', duration: 60, type: 'strength', rest: 30 },
    ],
  },
  {
    id: '3',
    name: 'HIIT Power Session',
    type: 'hiit',
    duration: 20,
    calories: 280,
    difficulty: 'advanced',
    description: 'Maximum effort, maximum results',
    exercises: [
      { id: 'e9', name: 'Sprint in Place', duration: 30, type: 'cardio', rest: 15 },
      { id: 'e10', name: 'Jump Squats', duration: 30, type: 'strength', rest: 15 },
      { id: 'e11', name: 'Boxing Punches', duration: 30, type: 'cardio', rest: 15 },
      { id: 'e12', name: 'Plank Jacks', duration: 30, type: 'strength', rest: 15 },
    ],
  },
  {
    id: '4',
    name: 'Flexibility Flow',
    type: 'flexibility',
    duration: 25,
    calories: 80,
    difficulty: 'beginner',
    description: 'Improve flexibility and mobility',
    exercises: [
      { id: 'e13', name: 'Standing Forward Fold', duration: 60, type: 'flexibility', rest: 15 },
      { id: 'e14', name: 'Cobra Stretch', duration: 45, type: 'flexibility', rest: 15 },
      { id: 'e15', name: 'Pigeon Pose', duration: 60, type: 'flexibility', rest: 15 },
      { id: 'e16', name: "Child's Pose", duration: 90, type: 'flexibility', rest: 0 },
    ],
  },
  {
    id: '5',
    name: 'Core Crusher',
    type: 'strength',
    duration: 15,
    calories: 150,
    difficulty: 'intermediate',
    description: 'Strengthen your core muscles',
    exercises: [
      { id: 'e17', name: 'Crunches', sets: 3, reps: 20, type: 'strength', rest: 30 },
      { id: 'e18', name: 'Russian Twists', sets: 3, reps: 30, type: 'strength', rest: 30 },
      { id: 'e19', name: 'Leg Raises', sets: 3, reps: 15, type: 'strength', rest: 30 },
      { id: 'e20', name: 'Side Plank', duration: 45, type: 'strength', rest: 30 },
    ],
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    workoutId: '1',
    workoutName: 'Morning Cardio Blast',
    date: new Date().toISOString(),
    duration: 30,
    calories: 300,
    completed: true,
    type: 'cardio',
  },
  {
    id: 'a2',
    workoutId: '5',
    workoutName: 'Core Crusher',
    date: new Date().toISOString(),
    duration: 15,
    calories: 150,
    completed: false,
    type: 'strength',
  },
  {
    id: 'a3',
    workoutId: '2',
    workoutName: 'Upper Body Strength',
    date: new Date(Date.now() - 86400000).toISOString(),
    duration: 45,
    calories: 250,
    completed: true,
    type: 'strength',
  },
];

export const mockDailyActivity: DailyActivity = {
  date: new Date().toISOString(),
  workouts: mockActivities.filter(a => a.date === new Date().toISOString()),
  totalCalories: 450,
  totalDuration: 45,
  completedWorkouts: 1,
};

export const mockWeeklyProgress: WeeklyProgress = {
  week: 'Current Week',
  days: [
    { day: 'Mon', calories: 520, duration: 60, workouts: 2 },
    { day: 'Tue', calories: 380, duration: 45, workouts: 2 },
    { day: 'Wed', calories: 600, duration: 75, workouts: 3 },
    { day: 'Thu', calories: 290, duration: 30, workouts: 1 },
    { day: 'Fri', calories: 550, duration: 70, workouts: 2 },
    { day: 'Sat', calories: 420, duration: 50, workouts: 2 },
    { day: 'Sun', calories: 200, duration: 25, workouts: 1 },
  ],
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Track Your Fitness',
    description: 'Monitor your daily workouts and progress with detailed analytics',
    icon: 'activity',
  },
  {
    id: '2',
    title: 'Custom Workouts',
    description: 'Create personalized workout plans that fit your goals and schedule',
    icon: 'dumbbell',
  },
  {
    id: '3',
    title: 'Stay Motivated',
    description: 'Build streaks, hit milestones, and achieve your fitness goals',
    icon: 'flame',
  },
];

export const mockUserStats: UserStats = {
  totalWorkouts: 47,
  totalCalories: 12450,
  totalMinutes: 1580,
  streak: 7,
  favoriteWorkoutType: 'HIIT',
};
