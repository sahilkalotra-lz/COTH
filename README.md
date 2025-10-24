# COTH - React Native App

A comprehensive React Native 0.82.x application with TypeScript, featuring offline-first architecture, multi-language support, theme management, and analytics tracking.

## Features

- ✅ **Offline-First Architecture** with WatermelonDB and SQLite
- ✅ **Multi-Language Support** (English, French, Spanish)
- ✅ **Theme Management** (Light/Dark/System)
- ✅ **Font Size Control** (Small/Medium/Large/Extra Large)
- ✅ **Analytics Tracking** with Matomo
- ✅ **State Management** with Redux Toolkit
- ✅ **API Caching** with React Query
- ✅ **Navigation** with React Navigation
- ✅ **TypeScript** for type safety

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   ├── forms/          # Form components
│   └── ui/             # UI components
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── home/           # Home screens
│   ├── profile/        # Profile screens
│   └── settings/       # Settings screens
├── navigation/         # Navigation configuration
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   └── types/          # TypeScript types
├── hooks/              # Custom hooks
│   ├── api/            # API hooks
│   ├── storage/        # Storage hooks
│   └── theme/          # Theme hooks
├── services/           # Services
│   ├── api/            # API services
│   ├── analytics/      # Analytics service
│   └── database/       # Database service
├── utils/              # Utility functions
│   ├── constants/      # App constants
│   ├── helpers/        # Helper functions
│   └── validation/     # Validation utilities
├── assets/             # Static assets
│   ├── images/         # Images
│   ├── icons/          # Icons
│   └── fonts/          # Fonts
├── localization/       # Internationalization
│   └── translations/   # Translation files
└── themes/             # Theme configuration
    ├── colors/         # Color schemes
    ├── typography/     # Typography
    └── spacing/        # Spacing and layout
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### 1. Install Node Modules

```bash
cd ~/Documents/COTH
npm install
```

### 2. Install iOS Dependencies (CocoaPods)

```bash
cd ios
pod install
cd ..
```

### 3. Environment Configuration

The `.env` file is already configured with the required environment variables:

- API endpoints (BASE_URL, DEBUG_BASE_URL, PREPROD_BASE_URL)
- Matomo analytics configuration
- Firebase configuration
- Language and icon APIs

## Running the App

### iOS

```bash
# Run on iOS Simulator
npx react-native run-ios

# Run on specific iOS Simulator
npx react-native run-ios --simulator="iPhone 15 Pro"

# Run on physical iOS device
npx react-native run-ios --device
```

### Android

```bash
# Run on Android Emulator
npx react-native run-android

# Run on specific Android device
npx react-native run-android --deviceId=<device-id>
```

### Development Commands

```bash
# Start Metro bundler
npx react-native start

# Clear Metro cache
npx react-native start --reset-cache

# Clean and rebuild
# iOS
cd ios && xcodebuild clean && cd .. && npx react-native run-ios

# Android
cd android && ./gradlew clean && cd .. && npx react-native run-android
```

## Key Features Implementation

### 1. Offline-First with WatermelonDB

- SQLite database for local storage
- Automatic sync when online
- Models: User, Post (extensible)

### 2. Multi-Language Support

- i18next with React Native Localize
- Supported languages: English, French, Spanish
- Automatic language detection
- Persistent language selection

### 3. Theme Management

- Light/Dark/System theme modes
- Dynamic theme switching
- Persistent theme selection
- System theme detection

### 4. Font Size Control

- Four font sizes: Small, Medium, Large, Extra Large
- Responsive typography system
- Persistent font size selection

### 5. Analytics with Matomo

- Screen view tracking
- Event tracking
- User behavior analytics
- Custom dimensions and variables

### 6. State Management

- Redux Toolkit for state management
- Redux Persist for state persistence
- Auth slice for user management
- Settings slice for app preferences

### 7. API Integration

- Axios with interceptors
- React Query for caching
- Offline-first API calls
- Automatic retry logic

## Troubleshooting

### Common Issues

1. **CocoaPods Issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

2. **Metro Cache Issues**
   ```bash
   npx react-native start --reset-cache
   ```

3. **Android Build Issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

4. **iOS Build Issues**
   ```bash
   cd ios
   xcodebuild clean
   cd ..
   npx react-native run-ios
   ```

### Environment Issues

- Ensure all environment variables are set in `.env`
- Check that API endpoints are accessible
- Verify Matomo configuration

## Development Notes

- The app uses React Native 0.82.x with TypeScript
- All components are properly typed
- Follow the established project structure
- Use the theme system for consistent styling
- Implement proper error handling
- Add analytics tracking for user interactions

## Next Steps

1. Add authentication screens
2. Implement user registration/login
3. Add more database models as needed
4. Implement push notifications
5. Add more UI components
6. Implement proper error boundaries
7. Add unit and integration tests

## Support

For issues and questions, please refer to the React Native documentation and the individual library documentation for each dependency.
