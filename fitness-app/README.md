# Fitness App - Expo React Native Template

A modern, energetic fitness tracking application built with Expo and React Native.

## Features

### 🎨 Design
- Modern UI inspired by Strava and Nike Training Club
- Energetic red/orange/white color palette
- Smooth animations with React Native Reanimated
- Animated SVG illustrations on onboarding

### 📱 Screens

#### Onboarding
- Three animated slides with custom SVG illustrations
- Smooth transitions with Reanimated
- Interactive dot pagination

#### Home Screen
- Daily activity overview
- Real-time stats cards (calories, minutes, streak, workouts)
- Today's scheduled workouts
- Quick stats dashboard
- Parallax header animation on scroll

#### Workouts
- Browse all available workouts
- Filter by type (All, Cardio, Strength, Flexibility, HIIT)
- Detailed workout view with exercise breakdown
- Animated list entries
- Mock workout builder

#### Progress
- Weekly progress charts (calories, time, workouts)
- Interactive metric selector
- Overall statistics dashboard
- Visual data representation with react-native-chart-kit

### 🏗️ Architecture

```
fitness-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── WorkoutCard.tsx
│   │   ├── ActivityItem.tsx
│   │   ├── ProgressChart.tsx
│   │   └── StatsCard.tsx
│   ├── data/            # Mock data
│   │   └── mockData.ts
│   ├── navigation/      # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/         # Main screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   └── WorkoutsScreen.tsx
│   ├── theme/          # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   └── types/          # TypeScript types
│       └── types.ts
├── App.tsx
├── babel.config.js
├── package.json
└── tsconfig.json
```

### 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **Animations**: React Native Reanimated 4.1
- **Charts**: React Native Chart Kit
- **Icons**: Expo Vector Icons (Ionicons)
- **Gradients**: Expo Linear Gradient
- **Gestures**: React Native Gesture Handler
- **SVG**: React Native SVG

### 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on platform:
```bash
npm run android  # Android
npm run ios      # iOS (requires macOS)
npm run web      # Web
```

### 📊 Mock Data

The app includes comprehensive mock data:
- 5 different workout types with exercises
- Daily activities and progress tracking
- Weekly progress statistics
- User stats (streak, total workouts, calories)

### 🎯 Key Features

- **No Database Required**: All data is mocked locally
- **Smooth Animations**: Reanimated for 60fps animations
- **Responsive Design**: Works on all screen sizes
- **Type Safe**: Full TypeScript support
- **Modern UI**: Follows latest design trends

### 📝 Notes

- All workouts and activities are mock data
- No backend or database integration
- Designed for demonstration and template purposes
- Ready to be extended with real data persistence

### 🎨 Color Palette

```typescript
Primary: #FF4444    // Vibrant Red
Secondary: #FF6B35  // Energetic Orange
Accent: #FF8C42     // Soft Orange
Background: #FFFFFF // Clean White
```

### 🔧 Customization

To customize the theme, edit files in `src/theme/`:
- `colors.ts` - Color palette
- `typography.ts` - Font styles
- `spacing.ts` - Spacing and sizing

### 📄 License

This is a template project for demonstration purposes.
