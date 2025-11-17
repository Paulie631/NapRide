# NapRoute Deployment Checklist for Windows

Use this checklist to track your deployment progress.

## Phase 1: Install Prerequisites ⏳

### Node.js Installation
- [ ] Download Node.js LTS from https://nodejs.org/
- [ ] Run the installer
- [ ] Check "Automatically install necessary tools"
- [ ] Restart computer
- [ ] Verify: Open Command Prompt and run `node --version`
- [ ] Verify: Run `npm --version`

### Java Development Kit (JDK) Installation
- [ ] Download JDK 17 from https://adoptium.net/
- [ ] Run the installer
- [ ] Check "Set JAVA_HOME variable" during installation
- [ ] Check "Add to PATH" during installation
- [ ] Restart computer
- [ ] Verify: Open Command Prompt and run `java -version`

### Android Studio Installation
- [ ] Download Android Studio from https://developer.android.com/studio
- [ ] Run the installer
- [ ] Complete the setup wizard
- [ ] Install Android SDK (API 33)
- [ ] Install Android SDK Build-Tools
- [ ] Install Android Emulator
- [ ] Install Android SDK Platform-Tools

### Environment Variables Setup
- [ ] Open Environment Variables (Windows + R → `sysdm.cpl`)
- [ ] Create ANDROID_HOME variable
  - Name: `ANDROID_HOME`
  - Value: `C:\Users\paula\AppData\Local\Android\Sdk`
- [ ] Add to PATH:
  - [ ] `%ANDROID_HOME%\platform-tools`
  - [ ] `%ANDROID_HOME%\emulator`
  - [ ] `%ANDROID_HOME%\tools`
  - [ ] `%ANDROID_HOME%\tools\bin`
- [ ] Restart computer

## Phase 2: Project Setup ⏳

### Install Dependencies
- [ ] Open Command Prompt
- [ ] Navigate to project: `cd Documents\NapRoute`
- [ ] Run: `npm install`
- [ ] Wait for installation to complete (5-10 minutes)
- [ ] Verify: Check that `node_modules` folder exists

### Create Android Emulator
- [ ] Open Android Studio
- [ ] Click "More Actions" → "Virtual Device Manager"
- [ ] Click "Create Device"
- [ ] Select a device (e.g., Pixel 5)
- [ ] Select system image (API 33 - Tiramisu)
- [ ] Download system image if needed
- [ ] Click "Finish"
- [ ] Verify: Emulator appears in device list

### Configure local.properties (if needed)
- [ ] Navigate to `Documents\NapRoute\android`
- [ ] Create `local.properties` file if it doesn't exist
- [ ] Add line: `sdk.dir=C:\\Users\\paula\\AppData\\Local\\Android\\Sdk`

## Phase 3: First Deployment ⏳

### Start Android Emulator
- [ ] Open Android Studio
- [ ] Go to Virtual Device Manager
- [ ] Click ▶️ play button next to your emulator
- [ ] Wait for emulator to fully boot (2-3 minutes)
- [ ] Verify: Emulator shows Android home screen

### Start Metro Bundler
- [ ] Open Command Prompt (Window #1)
- [ ] Navigate to project: `cd Documents\NapRoute`
- [ ] Run: `npm start`
- [ ] Keep this window open
- [ ] Verify: See "Metro waiting on port 8081"

### Build and Deploy App
- [ ] Open NEW Command Prompt (Window #2)
- [ ] Navigate to project: `cd Documents\NapRoute`
- [ ] Run: `npm run android`
- [ ] Wait for build to complete (10-15 minutes first time)
- [ ] Verify: App launches on emulator

## Phase 4: Verify Deployment ✅

### App Launches Successfully
- [ ] App opens on emulator
- [ ] No crash on startup
- [ ] Splash screen appears (if implemented)
- [ ] Main screen loads

### Basic Functionality
- [ ] Location permission prompt appears
- [ ] Can navigate between screens
- [ ] Buttons respond to taps
- [ ] Loading indicators appear during operations
- [ ] No error messages on startup

### Test Core Features
- [ ] Can set nap duration
- [ ] Can select route type
- [ ] Map displays correctly
- [ ] Can interact with map (zoom, pan)
- [ ] Buttons have proper touch targets (easy to tap)

## Phase 5: Optional Enhancements ⏳

### Configure API Keys
- [ ] Create `.env` file in project root
- [ ] Add OpenRouteService API key
- [ ] Add Google Maps API key
- [ ] Restart Metro bundler
- [ ] Rebuild app

### Test on Physical Device
- [ ] Enable Developer Options on Android phone
- [ ] Enable USB Debugging
- [ ] Connect phone via USB
- [ ] Accept USB debugging prompt
- [ ] Run: `adb devices` to verify connection
- [ ] Run: `npm run android`
- [ ] App installs and runs on physical device

## Troubleshooting Reference

### Common Issues and Solutions

**"node is not recognized"**
- ✅ Solution: Install Node.js and restart computer

**"npm install" fails**
- ✅ Solution: Check internet connection, try `npm install --legacy-peer-deps`

**"SDK location not found"**
- ✅ Solution: Create `android/local.properties` with SDK path

**"Unable to load script"**
- ✅ Solution: Make sure Metro bundler is running (`npm start`)

**"Execution failed for task ':app:installDebug'"**
- ✅ Solution: Make sure emulator is running, check `adb devices`

**Build takes too long**
- ✅ Solution: First build is slow (10-15 min), subsequent builds are faster

**"JAVA_HOME is not set"**
- ✅ Solution: Install JDK and set JAVA_HOME environment variable

## Success Criteria ✅

You've successfully deployed NapRoute when:
- [x] All prerequisites are installed
- [x] Project dependencies are installed
- [x] Android emulator is running
- [x] Metro bundler is running
- [x] App builds without errors
- [x] App launches on emulator
- [x] App is functional and responsive
- [x] No critical errors in console

## Estimated Timeline

- **Prerequisites Installation**: 30-60 minutes (one-time)
- **Project Setup**: 10-15 minutes (one-time)
- **First Build**: 10-15 minutes (one-time)
- **Subsequent Builds**: 2-3 minutes

**Total Time for First Deployment**: ~1-2 hours

## Next Steps After Successful Deployment

1. ✅ Test all features manually (see `MANUAL_TESTING_GUIDE.md`)
2. ✅ Configure real API keys for production use
3. ✅ Test on physical Android device
4. ✅ Gather user feedback
5. ✅ Monitor performance and fix any issues

## Resources

- **Quick Start**: `QUICK_START_WINDOWS.md`
- **Detailed Guide**: `WINDOWS_DEPLOYMENT_GUIDE.md`
- **Testing Guide**: `MANUAL_TESTING_GUIDE.md`
- **Setup Info**: `SETUP.md`

---

**Current Status**: Prerequisites need to be installed
**Next Step**: Install Node.js from https://nodejs.org/

Good luck with your deployment! 🚀
