# NapRoute Quick Start Guide for Windows

## Current Status
Your NapRoute project is ready to deploy, but we need to install some prerequisites first.

## Prerequisites to Install

### 1. ✅ Install Node.js (REQUIRED - Not Currently Installed)

**Download and Install**:
1. Go to: https://nodejs.org/
2. Download the **LTS version** (Long Term Support) - currently 20.x
3. Run the installer
4. **Important**: Check the box "Automatically install necessary tools" during installation
5. Restart your computer after installation

**Verify Installation**:
Open Command Prompt and run:
```cmd
node --version
npm --version
```

You should see version numbers like:
```
v20.10.0
10.2.3
```

### 2. ✅ Install Java Development Kit (JDK) (REQUIRED for Android)

**Download and Install**:
1. Go to: https://adoptium.net/
2. Download **JDK 17** (LTS)
3. Run the installer
4. During installation, check "Set JAVA_HOME variable"
5. Check "Add to PATH"

**Verify Installation**:
```cmd
java -version
```

You should see:
```
openjdk version "17.0.x"
```

### 3. ✅ Install Android Studio (REQUIRED for Android)

**Download and Install**:
1. Go to: https://developer.android.com/studio
2. Download Android Studio
3. Run the installer
4. During setup, make sure to install:
   - ✅ Android SDK
   - ✅ Android SDK Platform (API 33)
   - ✅ Android Virtual Device
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator

**Configure Android Studio**:
1. Open Android Studio
2. Click "More Actions" → "SDK Manager"
3. In "SDK Platforms" tab, check:
   - ✅ Android 13.0 (Tiramisu) - API Level 33
4. In "SDK Tools" tab, check:
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
5. Click "Apply" to install

### 4. ✅ Set Environment Variables

**Set ANDROID_HOME**:
1. Press `Windows + R`
2. Type `sysdm.cpl` and press Enter
3. Go to "Advanced" tab → "Environment Variables"
4. Under "User variables", click "New"
5. Variable name: `ANDROID_HOME`
6. Variable value: `C:\Users\paula\AppData\Local\Android\Sdk`
7. Click OK

**Add to PATH**:
1. In "User variables", find "Path" and click "Edit"
2. Click "New" and add these one by one:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\emulator`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`
3. Click OK on all dialogs

**Restart your computer** after setting environment variables.

## After Installing Prerequisites

Once you have Node.js, JDK, and Android Studio installed, come back and run these commands:

### Step 1: Install Project Dependencies
```cmd
cd Documents\NapRoute
npm install
```

This will take 5-10 minutes the first time.

### Step 2: Create Android Emulator
1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select "Pixel 5" (or any phone)
5. Click "Next"
6. Select "Tiramisu" (API 33) - Download if needed
7. Click "Next" → "Finish"

### Step 3: Start the Emulator
In Android Studio Virtual Device Manager, click the ▶️ play button next to your device.

### Step 4: Start Metro Bundler
Open Command Prompt:
```cmd
cd Documents\NapRoute
npm start
```

Keep this window open!

### Step 5: Run the App
Open a **NEW** Command Prompt window:
```cmd
cd Documents\NapRoute
npm run android
```

The app will build and launch on your emulator!

## Estimated Time

- **Installing Prerequisites**: 30-60 minutes (one-time setup)
- **First Build**: 10-15 minutes
- **Subsequent Builds**: 2-3 minutes

## What You'll See

Once deployed, the NapRoute app will:
1. Ask for location permissions
2. Show the main setup screen
3. Allow you to:
   - Set nap duration
   - Choose route type (circular or to destination)
   - Calculate nap routes
   - Start navigation
   - Save favorite routes
   - View route history

## Features Ready to Test

✅ **Loading States**: See loading indicators during operations
✅ **Haptic Feedback**: Feel vibrations on button presses (on device)
✅ **Touch Targets**: All buttons are easy to tap (44x44 pixels minimum)
✅ **Error Handling**: Graceful error messages and recovery
✅ **Performance**: Optimized for smooth operation
✅ **Accessibility**: Screen reader support and accessibility features

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your computer after installing Node.js

### "JAVA_HOME is not set"
- JDK is not installed or environment variable not set
- Make sure to check "Set JAVA_HOME" during JDK installation

### "SDK location not found"
- Android Studio SDK not installed
- Create `android/local.properties` file with:
  ```
  sdk.dir=C:\\Users\\paula\\AppData\\Local\\Android\\Sdk
  ```

### "Unable to load script"
- Metro bundler is not running
- Make sure `npm start` is running in a separate window

### Build takes forever
- First build is always slow (10-15 minutes)
- Subsequent builds are much faster
- Make sure you have a good internet connection for downloading dependencies

## Need Help?

Refer to the detailed guides:
- `WINDOWS_DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `MANUAL_TESTING_GUIDE.md` - How to test the app
- `SETUP.md` - Project setup details

## Quick Reference Commands

```cmd
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android (in new window)
npm run android

# Run tests
npm test

# Clear cache
npm start -- --reset-cache
```

---

## Your Next Steps:

1. ✅ Install Node.js from https://nodejs.org/
2. ✅ Install JDK 17 from https://adoptium.net/
3. ✅ Install Android Studio from https://developer.android.com/studio
4. ✅ Set environment variables (ANDROID_HOME and PATH)
5. ✅ Restart your computer
6. ✅ Run `npm install` in the project folder
7. ✅ Create and start an Android emulator
8. ✅ Run `npm start` to start Metro bundler
9. ✅ Run `npm run android` to deploy the app

**You're almost there! Just need to install the prerequisites and you'll be running NapRoute in no time!** 🚀
