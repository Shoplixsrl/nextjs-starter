# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**IMPORTANT**: Use `npm` as the package manager for all development commands.

### Development
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm install` - Install dependencies

### Build
- `npm run build` - Build for production (expo export)
- `npm run prebuild` - Generate native iOS/Android projects

### Testing
No test setup detected. Consider adding tests with Jest.

## Architecture

### Stack
- **Framework**: Expo SDK 52 with Expo Router
- **React Native**: Version 0.76.5
- **Language**: TypeScript with strict mode
- **React**: Version 18.3.1
- **Navigation**: Expo Router 4.0 (file-based routing)
- **Animations**: React Native Reanimated 3.16
- **UI Libraries**: Expo Linear Gradient, Expo Blur, Expo AV
- **Storage**: AsyncStorage (no database)

### Project Structure
- `/app` - Expo Router screens (file-based routing)
  - `_layout.tsx` - Root layout configuration
  - `index.tsx` - Home screen (meditation list)
  - `onboarding.tsx` - Onboarding flow
  - `/meditation/[id].tsx` - Individual meditation session
- `/components` - Reusable components
  - `BreathingCircle.tsx` - Animated breathing guide
  - `MeditationTimer.tsx` - Timer display
  - `GradientButton.tsx` - Custom button with gradient
- `/constants` - Theme and design tokens
  - `Colors.ts` - Color palette (pastel lilac/blue)
  - `Theme.ts` - Spacing, typography, shadows
- `/data` - Mock JSON data (no database)
  - `meditations.json` - Meditation sessions
  - `onboarding.json` - Onboarding slides
- `/types` - TypeScript type definitions
  - `index.ts` - Shared types
- `/assets` - Images, icons, sounds

### Key Configuration
- **Path Alias**: `@/*` maps to `./*` in TypeScript
- **Expo Router**: File-based navigation with Stack layout
- **Reanimated**: Configured in `babel.config.js` with plugin
- **Color Palette**: Pastel lilac (#E6E6FA) and blue (#B0E0E6) theme
- **No Database**: All data stored in JSON files

### Design System

#### Color Palette (Calming Pastels)
- Primary Lilac: `#E6E6FA` (Lavender)
- Primary Blue: `#B0E0E6` (Powder Blue)
- Purple: `#D8BFD8` (Thistle)
- Sky: `#87CEEB` (Sky Blue)
- Gradients: morning, evening, calm

#### Typography
- Sizes: xs(12), sm(14), md(16), lg(20), xl(24), xxl(32), xxxl(48)
- Weights: light(300), regular(400), medium(500), semibold(600), bold(700)

#### Spacing
- xs(4), sm(8), md(16), lg(24), xl(32), xxl(48)

### Development Workflow

1. **Screens**: Add new screens in `/app` directory (file-based routing)
2. **Components**: Create reusable components in `/components`
3. **Animations**: Use Reanimated for smooth 60fps animations
4. **Mock Data**: Update JSON files in `/data` directory
5. **Styling**: Use inline StyleSheet, reference Theme constants
6. **Navigation**: Use `router.push()`, `router.back()`, `router.replace()`

### Features

#### Onboarding
- 3 animated slides with emoji illustrations
- Fade-in animations using Reanimated
- Horizontal FlatList with pagination dots
- Skip button and progress tracking
- Stores completion in AsyncStorage

#### Home Screen
- List of meditation sessions from JSON
- Gradient cards with category-based colors
- Duration badges
- Staggered fade-in animations
- Navigation to meditation sessions

#### Meditation Session
- Breathing circle animation (4s inhale, 2s hold, 4s exhale, 2s hold)
- Countdown timer
- Play/pause controls
- Blur overlay effect when active
- Haptic feedback on interactions
- Mock audio playback (Expo AV)
- Completion celebration screen

### Animations

All animations use React Native Reanimated for performance:
- **Breathing Circle**: Scale and opacity with timing curves
- **Fade In/Out**: FadeIn, FadeOut components
- **Slide In**: SlideInRight for onboarding
- **Blur**: Animated blur overlay during meditation
- **Spring**: Button and interaction animations

### Audio

Configured with Expo AV but uses placeholder URLs:
1. Add audio files to `assets/sounds/`
2. Update paths in `data/meditations.json`
3. Load with `require()` instead of remote URLs

### Data Structure

#### MeditationSession
- id, title, duration (minutes)
- description, category
- audioFile, imageUrl

#### OnboardingSlide
- id, title, description, emoji

### Build Requirements

**IMPORTANT**: Must run `npm run build` successfully before committing changes (per project requirements).

### Styling Philosophy

- Extremely calm UI inspired by Calm and Headspace apps
- Pastel color palette for relaxation
- Generous whitespace and padding
- Soft shadows and blur effects
- Smooth, slow animations
- Minimal text, maximum clarity

### Notes

- **No Backend**: Entirely client-side with mock data
- **Cross-Platform**: Runs on iOS, Android, and Web
- **TypeScript**: Strict mode enabled
- **Assets**: Placeholder icons/images need replacement for production
- **Expo Go**: Can run in Expo Go app during development
