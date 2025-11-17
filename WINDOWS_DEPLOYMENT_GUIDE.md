# NapRoute Windows Deployment Guide

## Overview
This guide will help you deploy and run the NapRoute React Native application on your Windows computer. You can run the app on an Android emulator or a physical Android device connected to your computer.

## Prerequisites

### 1. Node.js (Required)
- **Version**: Node.js 18 or higher
- **Check if installed**: Open Command Prompt and run:
  ```cmd
  node --version
  ```
- **Install if needed**: Download from https://nodejs.org/ (LTS version recommended)

### 2. Java Development Kit (JDK) (Required for Android)
- **Version**: JDK 17 (recommended for React Native 0.73)
- **Check if installed**:
  ```cmd
  java -version
  ```
- **Install if needed**: Download from https://adoptium.net/

### 3. Android Studio (Required for Android)
- **Download**: https://developer.android.com/studio
- **Components to install**:
  - Android SDK
  - Android SDK Platform (API 33 or higher)
  - Android Virtual Device (AVD)
  - Android SDK Build-Tools
  - Android Emulator

### 4. Environment Variables Setup

#### Set ANDROID_HOME
1. Open "Environment Variables" (Search in Windows Start menu)
2. Under "User variables", click "New"
3. Variable name: `ANDROID_HOME`
4. Variable value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   (Replace `YourUsername` with your actual Windows username)

#### Add to PATH
Add these to your PATH variable:
- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\emulator`
- `%ANDROID_HOME%\tools`
- `%ANDROID_HOME%\tools\bin`

## Step-by-Step Deployment

### Step 1: Install Dependencies

Open Command Prompt or PowerShell and navigate to the project:

```cmd
cd Documents\NapRoute
npm install
```

This will install all required Node.js packages.

### Step 2: Verify React Native CLI

```cmd
npx react-native --version
```

### Step 3: Set Up Android Emulator

#### Option A: Using Android Studio
1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select a device (e.g., Pixel 5)
5. Select a system image (API 33 or higher recommended)
6. Click "Finish"
7. Start the emulator by clicking the play button

#### Option B: Using Command Line
```cmd
# List available emulators
emulator -list-avds

# Start an emulator
emulator -avd Pixel_5_API_33
```

### Step 4: Configure API Keys (Optional for now)

The app uses demo API keys by default. To use real routing services:

1. Create a `.env` file in the project root:
   ```cmd
   cd Documents\NapRoute
   type nul > .env
   ```

2. Edit `.env` and add your API keys:
   ```
   OPENROUTESERVICE_API_KEY=your_api_key_here
   GOOGLE_MAPS_API_KEY=your_google_maps_key_here
   ```

### Step 5: Start Metro Bundler

Open a Command Prompt window:

```cmd
cd Documents\NapRoute
npm start
```

Keep this window open. Metro bundler will compile your JavaScript code.

### Step 6: Run the App on Android

Open a **new** Command Prompt window:

```cmd
cd Documents\NapRoute
npm run android
```

This will:
1. Build the Android app
2. Install it on your emulator or connected device
3. Launch the app

## Troubleshooting

### Issue: "SDK location not found"

**Solution**: Create `local.properties` file in `android/` folder:
```cmd
cd Documents\NapRoute\android
echo sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk > local.properties
```
(Replace `YourUsername` with your actual username)

### Issue: "Unable to load script"

**Solution**: Make sure Metro bundler is running in a separate window:
```cmd
npm start
```

### Issue: "Execution failed for task ':app:installDebug'"

**Solution**: 
1. Make sure emulator is running
2. Check connected devices:
   ```cmd
   adb devices
   ```
3. If no devices listed, restart adb:
   ```cmd
   adb kill-server
   adb start-server
   ```

### Issue: Build fails with Gradle errors

**Solution**:
1. Clean the build:
   ```cmd
   cd Documents\NapRoute\android
   gradlew clean
   cd ..
   ```
2. Try building again:
   ```cmd
   npm run android
   ```

### Issue: "JAVA_HOME is not set"

**Solution**: Set JAVA_HOME environment variable:
1. Find your JDK installation path (e.g., `C:\Program Files\Eclipse Adoptium\jdk-17.0.8.7-hotspot`)
2. Add to environment variables:
   - Variable name: `JAVA_HOME`
   - Variable value: Your JDK path

### Issue: Metro bundler port already in use

**Solution**:
```cmd
# Kill the process using port 8081
npx react-native start --reset-cache
```

## Running on Physical Android Device

### Step 1: Enable Developer Options
1. Go to Settings → About Phone
2. Tap "Build Number" 7 times
3. Go back to Settings → Developer Options
4. Enable "USB Debugging"

### Step 2: Connect Device
1. Connect your Android device via USB
2. Accept the USB debugging prompt on your device
3. Verify connection:
   ```cmd
   adb devices
   ```

### Step 3: Run the App
```cmd
npm run android
```

## Development Commands

### Start Metro Bundler
```cmd
npm start
```

### Run on Android
```cmd
npm run android
```

### Run Tests
```cmd
npm test
```

### Lint Code
```cmd
npm run lint
```

### Clear Cache and Restart
```cmd
npm start -- --reset-cache
```

### Rebuild Android App
```cmd
cd android
gradlew clean
cd ..
npm run android
```

## Project Structure

```
Documents/NapRoute/
├── android/              # Android native code
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── services/         # Business logic
│   ├── repositories/     # Data persistence
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── context/          # React context
│   ├── navigation/       # Navigation setup
│   └── config/           # Configuration
├── App.tsx               # Root component
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Features Implemented

✅ Loading indicators for async operations
✅ Haptic feedback for interactions
✅ Minimum touch target sizes (44x44 pixels)
✅ Error handling and recovery
✅ Performance optimizations
✅ Accessibility features
✅ State management
✅ Navigation system
✅ Location services
✅ Route calculation
✅ Saved routes and history

## Next Steps After Deployment

1. **Test the App**: Navigate through all screens and test features
2. **Configure Real API Keys**: Replace demo keys with production keys
3. **Test on Physical Device**: Deploy to a real Android phone
4. **Performance Testing**: Monitor app performance and battery usage
5. **User Testing**: Get feedback from actual users

## Useful Resources

- **React Native Docs**: https://reactnative.dev/docs/environment-setup
- **Android Studio**: https://developer.android.com/studio/intro
- **Troubleshooting**: https://reactnative.dev/docs/troubleshooting

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review React Native documentation
3. Check the project's error logs in Metro bundler
4. Review Android logcat: `adb logcat`

## Notes

- The app requires location permissions to function properly
- Google Maps API key is needed for map display
- OpenRouteService API key is needed for route calculation
- Demo keys are provided for initial testing
- First build may take 10-15 minutes
- Subsequent builds are much faster

---

**Ready to Deploy!** Follow the steps above to get NapRoute running on your Windows computer.
