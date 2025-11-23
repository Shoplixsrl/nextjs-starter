# Monorepo Setup for MenuAI

This guide explains how to convert this project into a monorepo structure with React Native mobile app.

## Current Structure
```
nextjs-starter/
├── app/          # Next.js app
├── components/   # UI components
├── lib/          # Shared utilities
└── ...
```

## Target Monorepo Structure
```
menuai-monorepo/
├── apps/
│   ├── web/              # Next.js web app (current)
│   └── mobile/           # React Native + Expo app
├── packages/
│   ├── ui/              # Shared UI components
│   ├── api-client/      # API client for both platforms
│   ├── types/           # Shared TypeScript types
│   └── utils/           # Shared utilities
├── turbo.json           # Turborepo configuration
└── package.json         # Root package.json
```

## Steps to Convert

### 1. Install Turborepo

```bash
bun add -D turbo
```

### 2. Create Root Structure

```bash
mkdir -p apps/web apps/mobile packages/ui packages/api-client packages/types packages/utils
```

### 3. Move Current App to apps/web

```bash
# Move all current files to apps/web
mv app apps/web/
mv components apps/web/
mv lib apps/web/
mv public apps/web/
# ... move all other Next.js files
```

### 4. Create Root package.json

```json
{
  "name": "menuai-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
```

### 5. Create turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "outputs": [".next/**", "!.next/cache/**", "build/**"],
      "dependsOn": ["^build"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### 6. Initialize React Native App

```bash
cd apps
bunx create-expo-app mobile --template blank-typescript
cd mobile
```

### 7. Install Mobile Dependencies

```bash
cd apps/mobile
bun add @react-navigation/native @react-navigation/stack
bun add expo-camera expo-barcode-scanner
bun add react-native-screens react-native-safe-area-context
bun add @react-native-async-storage/async-storage
```

### 8. Create Shared Packages

#### packages/types/package.json
```json
{
  "name": "@menuai/types",
  "version": "0.0.1",
  "main": "index.ts",
  "types": "index.ts"
}
```

#### packages/api-client/package.json
```json
{
  "name": "@menuai/api-client",
  "version": "0.0.1",
  "main": "index.ts",
  "dependencies": {
    "@menuai/types": "*"
  }
}
```

### 9. Update Web App package.json

```json
{
  "name": "@menuai/web",
  "dependencies": {
    "@menuai/types": "*",
    "@menuai/api-client": "*",
    "@menuai/ui": "*"
  }
}
```

### 10. Update Mobile App package.json

```json
{
  "name": "@menuai/mobile",
  "dependencies": {
    "@menuai/types": "*",
    "@menuai/api-client": "*"
  }
}
```

## Mobile App Features

### Core Features
1. **QR Code Scanner**
   - Scan restaurant QR codes
   - View menus instantly
   - Offline caching

2. **Menu Creator**
   - Create menus on-the-go
   - Voice-to-text menu entry
   - Photo capture for dishes

3. **Restaurant Management**
   - Manage multiple restaurants
   - Update menus in real-time
   - Push notifications

4. **Analytics**
   - Real-time scan tracking
   - Revenue insights
   - Customer preferences

### Tech Stack
- **Framework**: React Native + Expo
- **Navigation**: React Navigation
- **State**: Zustand or React Query
- **API**: Shared API client
- **Camera**: Expo Camera
- **Storage**: AsyncStorage

## Running the Monorepo

```bash
# Install all dependencies
bun install

# Run all apps in dev mode
bun dev

# Run only web
bun dev --filter=@menuai/web

# Run only mobile
bun dev --filter=@menuai/mobile

# Build all
bun build

# Build specific app
bun build --filter=@menuai/web
```

## Benefits of Monorepo

1. **Code Sharing**: Share types, utilities, and API clients
2. **Consistency**: Same linting, testing, and build tools
3. **Efficiency**: Install dependencies once, build in parallel
4. **Type Safety**: End-to-end type safety across platforms
5. **Easier Refactoring**: Change shared code in one place

## Next Steps

1. Complete the monorepo migration
2. Implement React Native mobile app
3. Set up CI/CD for both platforms
4. Add E2E testing with Detox
5. Publish to App Store and Google Play
