# FoodCost AI - Mobile App

React Native + Expo mobile application for the FoodCost AI platform.

## Features

- ✅ **Dashboard** with real-time KPIs
- ✅ **AI Insights** for cost optimization
- ✅ **Quick Actions** for common tasks
- ✅ **Camera Integration** for waste logging
- ✅ **Offline-First** architecture
- ✅ **Push Notifications** for alerts

## Tech Stack

- **React Native** 0.81
- **Expo** 54
- **TypeScript**
- **Expo Router** for navigation
- **Expo Linear Gradient** for modern UI

## Getting Started

### Prerequisites
- Node.js >= 20
- Bun or npm
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
cd mobile
bun install
```

### Running the App

```bash
# Start development server
bun start

# Run on iOS (Mac only)
bun run ios

# Run on Android
bun run android

# Run on web
bun run web
```

### Building for Production

```bash
# Build for iOS
bun run build:ios

# Build for Android
bun run build:android
```

## Project Structure

```
/app
  /(tabs)          # Tab-based navigation
    index.tsx      # Dashboard
    insights.tsx   # AI Insights
    waste.tsx      # Waste Tracking
    inventory.tsx  # Inventory
    profile.tsx    # User Profile
  _layout.tsx      # Root layout
```

## Features Roadmap

- [x] Dashboard with stats
- [x] AI Insights display
- [ ] Camera-based waste logging
- [ ] Barcode scanning for inventory
- [ ] Offline data sync
- [ ] Push notifications
- [ ] Biometric authentication

## API Integration

The mobile app connects to the Next.js backend API at:
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

Configure the API URL in `app/config.ts`

---

**Part of the FoodCost AI Platform**
