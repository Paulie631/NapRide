# NapRoute

A specialized route planning and navigation application designed for parents who want to help their children nap while driving.

## Project Structure

```
NapRoute/
├── src/
│   ├── screens/          # UI screens (NapSetupScreen, NavigationScreen, SavedRoutesScreen)
│   ├── services/         # Business logic layer (LocationService, NapRouteService, etc.)
│   ├── repositories/     # Data layer (NapRouteRepository, RouteHistoryRepository)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and helpers
│   ├── components/      # Reusable UI components
│   └── navigation/      # Navigation configuration
├── android/             # Android native code
├── ios/                 # iOS native code
└── App.tsx             # Root component
```

## Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment set up
  - For iOS: Xcode, CocoaPods
  - For Android: Android Studio, JDK

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Install iOS pods (macOS only):
```bash
cd ios && pod install && cd ..
```

## Running the App

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Development

### Running Tests
```bash
npm test
# or
yarn test
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## Features

- Duration-based route calculation (15-180 minutes)
- Circular return routes and destination routes
- Route preferences (scenic, quiet, highway)
- Turn-by-turn navigation
- Save and manage favorite routes
- Route history tracking
- Nap end warnings and route extensions

## Tech Stack

- React Native 0.73
- TypeScript
- React Navigation
- React Native Maps
- AsyncStorage
- Geolocation Service

## License

Private - All rights reserved
