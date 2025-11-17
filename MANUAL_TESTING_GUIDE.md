# NapRoute Manual Testing Guide

This guide provides comprehensive manual testing procedures for the NapRoute application. Follow these test cases to ensure all functionality works correctly on both iOS and Android devices.

## Prerequisites

### Test Devices
- [ ] iOS device (iPhone running iOS 13+)
- [ ] Android device (running Android 8+)
- [ ] Both devices with GPS/location services enabled
- [ ] Both devices with sufficient battery (>50%)

### Test Environment Setup
- [ ] Install the app on both test devices
- [ ] Grant location permissions when prompted
- [ ] Grant notification permissions when prompted
- [ ] Ensure devices have network connectivity (WiFi or cellular)
- [ ] Have a vehicle available for actual driving tests
- [ ] Prepare test destinations (addresses, POIs) in advance

### Safety Note
⚠️ **IMPORTANT**: All driving tests must be conducted safely. Have a passenger operate the device during driving tests, or conduct tests while parked and simulate movement.

## Test Categories

### 1. Initial Setup and Permissions

#### Test 1.1: First Launch
**Objective**: Verify app launches correctly and requests necessary permissions

**Steps**:
1. Install app on device (fresh install)
2. Launch app for the first time
3. Observe permission requests

**Expected Results**:
- [ ] App launches without crashes
- [ ] Location permission prompt appears with clear explanation
- [ ] Notification permission prompt appears
- [ ] App displays main screen after permissions granted

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 1.2: Permission Denial Handling
**Objective**: Verify app handles denied permissions gracefully

**Steps**:
1. Fresh install of app
2. Deny location permission when prompted
3. Attempt to calculate a route

**Expected Results**:
- [ ] App displays clear message explaining location is needed
- [ ] App provides link/button to open device settings
- [ ] App doesn't crash when permission denied
- [ ] App functions correctly after granting permission in settings

**Test on**:
- [ ] iOS
- [ ] Android

---

### 2. Nap Duration Input and Validation

#### Test 2.1: Duration Input - Valid Values
**Objective**: Test nap duration input with valid values

**Test Cases**:
| Duration | Expected Behavior |
|----------|-------------------|
| 15 min   | Accepted, route calculated |
| 30 min   | Accepted, route calculated |
| 60 min   | Accepted, route calculated |
| 90 min   | Accepted, route calculated |
| 120 min  | Accepted, route calculated |
| 180 min  | Accepted, route calculated |

**Steps** (for each duration):
1. Open NapSetupScreen
2. Enter duration value
3. Observe validation and route calculation

**Expected Results**:
- [ ] All valid durations accepted
- [ ] Duration displayed in both minutes and hours-minutes format
- [ ] Route calculation begins within 3 seconds
- [ ] No error messages for valid inputs

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 2.2: Duration Input - Invalid Values
**Objective**: Test nap duration validation with invalid values

**Test Cases**:
| Duration | Expected Behavior |
|----------|-------------------|
| 0 min    | Rejected with error message |
| 10 min   | Rejected (below minimum) |
| 200 min  | Rejected (above maximum) |
| -30 min  | Rejected with error message |
| "abc"    | Rejected or prevented |

**Steps** (for each duration):
1. Open NapSetupScreen
2. Attempt to enter invalid duration
3. Observe validation response

**Expected Results**:
- [ ] Invalid durations rejected
- [ ] Clear error message displayed
- [ ] Valid range shown (15-180 minutes)
- [ ] No crashes or unexpected behavior

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 2.3: Quick-Select Buttons
**Objective**: Verify quick-select duration buttons work correctly

**Steps**:
1. Open NapSetupScreen
2. Tap each quick-select button (30, 45, 60, 90, 120 minutes)
3. Observe duration field and route calculation

**Expected Results**:
- [ ] Each button sets correct duration
- [ ] Duration field updates immediately
- [ ] Route calculation triggers automatically
- [ ] Buttons are easily tappable (44x44 pixels minimum)

**Test on**:
- [ ] iOS
- [ ] Android

---

### 3. Route Type and Preferences

#### Test 3.1: Return Route Calculation
**Objective**: Test circular return route generation

**Steps**:
1. Open NapSetupScreen
2. Select "Return" route type
3. Set nap duration to 60 minutes
4. Select "Balanced" preference
5. Tap "Calculate Route"

**Expected Results**:
- [ ] Route calculated within 5 seconds
- [ ] Route returns to starting location
- [ ] Route duration within ±5 minutes of target (55-65 min)
- [ ] Route displayed on map
- [ ] Route details shown (duration, distance)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 3.2: Scenic Route Preference
**Objective**: Verify scenic route preference is applied

**Steps**:
1. Open NapSetupScreen
2. Set nap duration to 45 minutes
3. Select "Scenic" preference
4. Calculate route
5. Review route on map

**Expected Results**:
- [ ] Route prioritizes parks, waterfronts, scenic areas
- [ ] Route avoids major highways when possible
- [ ] Route duration matches target (±5 minutes)
- [ ] Route visually appears to follow scenic paths

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 3.3: Quiet Roads Preference
**Objective**: Verify quiet roads preference is applied

**Steps**:
1. Open NapSetupScreen
2. Set nap duration to 30 minutes
3. Select "Quiet" preference
4. Calculate route
5. Review route on map

**Expected Results**:
- [ ] Route avoids major arterial roads
- [ ] Route uses residential or secondary roads
- [ ] Route duration matches target (±5 minutes)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 3.4: Highway Route Preference
**Objective**: Verify highway route preference is applied

**Steps**:
1. Open NapSetupScreen
2. Set nap duration to 90 minutes
3. Select "Highway" preference
4. Calculate route
5. Review route on map

**Expected Results**:
- [ ] Route uses highways/freeways when available
- [ ] Route is more direct/efficient
- [ ] Route duration matches target (±5 minutes)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 3.5: Avoid Options
**Objective**: Test avoid highways, tolls, and unpaved roads options

**Steps**:
1. Open NapSetupScreen
2. Set nap duration to 60 minutes
3. Enable "Avoid Highways"
4. Calculate route and review
5. Repeat with "Avoid Tolls"
6. Repeat with "Avoid Unpaved Roads"

**Expected Results**:
- [ ] Routes respect avoid preferences
- [ ] No highways when "Avoid Highways" enabled
- [ ] No toll roads when "Avoid Tolls" enabled
- [ ] Only paved roads when "Avoid Unpaved" enabled

**Test on**:
- [ ] iOS
- [ ] Android

---

### 4. Destination Routes

#### Test 4.1: Destination Route - Short Distance
**Objective**: Test destination route when destination is closer than nap duration

**Steps**:
1. Open NapSetupScreen
2. Select "Destination" route type
3. Set nap duration to 60 minutes
4. Search for destination 20 minutes away
5. Select destination
6. Calculate route

**Expected Results**:
- [ ] Route calculated successfully
- [ ] Route includes scenic detour to match duration
- [ ] Total duration within ±5 minutes of target
- [ ] Route ends at destination
- [ ] Detour appears smooth and logical

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 4.2: Destination Route - Exact Distance
**Objective**: Test destination route when destination matches nap duration

**Steps**:
1. Open NapSetupScreen
2. Select "Destination" route type
3. Set nap duration to 45 minutes
4. Search for destination approximately 45 minutes away
5. Calculate route

**Expected Results**:
- [ ] Direct route calculated
- [ ] Route duration within ±5 minutes of target
- [ ] No unnecessary detours
- [ ] Route ends at destination

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 4.3: Destination Route - Too Far
**Objective**: Test error handling when destination is too far

**Steps**:
1. Open NapSetupScreen
2. Select "Destination" route type
3. Set nap duration to 30 minutes
4. Search for destination 90 minutes away
5. Attempt to calculate route

**Expected Results**:
- [ ] Error message displayed
- [ ] Message explains destination is too far
- [ ] Actual travel time to destination shown
- [ ] Suggestions provided (increase duration or choose closer destination)
- [ ] No crash or unexpected behavior

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 4.4: Destination Search
**Objective**: Test destination search functionality

**Steps**:
1. Open NapSetupScreen
2. Select "Destination" route type
3. Tap destination search field
4. Enter various search queries:
   - Address: "123 Main St"
   - POI name: "Starbucks"
   - Category: "grocery store"
   - Partial address

**Expected Results**:
- [ ] Search results appear within 2 seconds
- [ ] Results are relevant to query
- [ ] Results show name, address, distance
- [ ] Tapping result selects destination
- [ ] Search has debouncing (doesn't search on every keystroke)

**Test on**:
- [ ] iOS
- [ ] Android

---

### 5. Alternative Routes

#### Test 5.1: Multiple Route Options
**Objective**: Verify app generates multiple route alternatives

**Steps**:
1. Open NapSetupScreen
2. Set nap duration to 60 minutes
3. Select "Return" route type
4. Calculate routes

**Expected Results**:
- [ ] Up to 3 alternative routes generated
- [ ] Each route displayed with different color
- [ ] Each route shows duration and distance
- [ ] Routes have different characteristics (scenic, direct, loop)
- [ ] All routes within ±5 minutes of target duration

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 5.2: Route Selection
**Objective**: Test selecting different route alternatives

**Steps**:
1. Calculate routes (as in Test 5.1)
2. Tap on each alternative route
3. Observe map and route details

**Expected Results**:
- [ ] Selected route highlighted on map
- [ ] Other routes dimmed or shown with transparency
- [ ] Route details update for selected route
- [ ] Selection is visually clear
- [ ] "Start Navigation" button enabled

**Test on**:
- [ ] iOS
- [ ] Android

---

### 6. Map Interaction

#### Test 6.1: Current Location Display
**Objective**: Verify current location is displayed correctly

**Steps**:
1. Open app with location permission granted
2. Observe map on NapSetupScreen
3. Move to different location (walk/drive)
4. Observe location updates

**Expected Results**:
- [ ] Current location marker displayed
- [ ] Marker is distinct and visible
- [ ] Location updates when moving >10 meters
- [ ] Map centers on current location initially

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 6.2: Map Gestures
**Objective**: Test map interaction gestures

**Steps**:
1. Open NapSetupScreen with route displayed
2. Test gestures:
   - Pinch to zoom in
   - Pinch to zoom out
   - Swipe to pan
   - Double-tap to zoom
   - Two-finger tap to zoom out

**Expected Results**:
- [ ] All gestures work smoothly
- [ ] Map responds immediately to gestures
- [ ] No lag or stuttering
- [ ] Gestures feel natural

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 6.3: Route Visualization
**Objective**: Verify route is displayed clearly on map

**Steps**:
1. Calculate a 60-minute return route
2. Observe route on map
3. Zoom in and out
4. Pan along route

**Expected Results**:
- [ ] Route polyline clearly visible
- [ ] Route color distinct from map
- [ ] Start marker visible
- [ ] End marker visible (for destination routes)
- [ ] Route visible at all zoom levels
- [ ] Map auto-fits to show entire route

**Test on**:
- [ ] iOS
- [ ] Android

---

### 7. Navigation Session

#### Test 7.1: Start Navigation
**Objective**: Test starting a navigation session

**Steps**:
1. Calculate a route
2. Tap "Start Navigation" button
3. Observe transition to NavigationScreen

**Expected Results**:
- [ ] Navigation screen appears
- [ ] Route displayed on map
- [ ] Current location shown
- [ ] First instruction displayed
- [ ] Remaining time shown
- [ ] No crashes or errors

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 7.2: Turn-by-Turn Instructions
**Objective**: Test navigation instructions during actual driving

**Steps**:
1. Start navigation on a calculated route
2. Begin driving (or simulate with GPS spoofing)
3. Follow route and observe instructions
4. Make turns as instructed

**Expected Results**:
- [ ] Instructions display clearly
- [ ] Instruction type icon shown (turn left, right, etc.)
- [ ] Street name displayed
- [ ] Distance to next turn shown
- [ ] Instructions advance automatically
- [ ] Instructions accurate and timely

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 7.3: Remaining Time Display
**Objective**: Verify remaining nap time updates correctly

**Steps**:
1. Start navigation
2. Drive for 10 minutes
3. Observe remaining time

**Expected Results**:
- [ ] Remaining time displayed prominently
- [ ] Time updates in real-time
- [ ] Time format clear (MM:SS or HH:MM:SS)
- [ ] Time decreases as route progresses
- [ ] Time accurate (±1 minute)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 7.4: Map During Navigation
**Objective**: Test map behavior during active navigation

**Steps**:
1. Start navigation
2. Begin driving
3. Observe map behavior

**Expected Results**:
- [ ] Map auto-centers on current location
- [ ] Map rotates to match heading (optional)
- [ ] Route ahead is visible
- [ ] Current location marker clear
- [ ] Map updates smoothly (no jumping)

**Test on**:
- [ ] iOS
- [ ] Android

---

### 8. Nap End Warning

#### Test 8.1: Warning Notification
**Objective**: Test nap end warning appears at correct time

**Steps**:
1. Start navigation on a 30-minute route
2. Drive for 25 minutes (or fast-forward time in simulator)
3. Observe when warning appears

**Expected Results**:
- [ ] Warning appears when 5 minutes remain
- [ ] Visual notification on screen
- [ ] System notification sent (if app backgrounded)
- [ ] Warning is noticeable but not disruptive
- [ ] Warning only shows once

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 8.2: Route Extension Option
**Objective**: Test extending route from nap end warning

**Steps**:
1. Trigger nap end warning (as in Test 8.1)
2. Tap "Extend Route" option
3. Select extension duration (5, 10, 15, 30 minutes)
4. Confirm extension

**Expected Results**:
- [ ] Extension modal appears
- [ ] Extension options clearly displayed
- [ ] Extension route calculated quickly (<3 seconds)
- [ ] Navigation continues with extended route
- [ ] New remaining time reflects extension
- [ ] Extension route smooth and logical

**Test on**:
- [ ] iOS
- [ ] Android

---

### 9. Route Saving and Loading

#### Test 9.1: Save Route
**Objective**: Test saving a calculated route

**Steps**:
1. Calculate a route
2. Tap "Save Route" button
3. Enter route name
4. Confirm save

**Expected Results**:
- [ ] Save dialog appears
- [ ] Name input field functional
- [ ] Route saved successfully
- [ ] Confirmation message shown
- [ ] Route appears in saved routes list

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 9.2: View Saved Routes
**Objective**: Test viewing saved routes list

**Steps**:
1. Navigate to SavedRoutesScreen
2. Select "Saved Routes" tab
3. Observe list of saved routes

**Expected Results**:
- [ ] All saved routes displayed
- [ ] Each route shows name, duration, type
- [ ] List scrollable if many routes
- [ ] Empty state shown if no saved routes
- [ ] Routes sorted logically (by date or name)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 9.3: Load Saved Route
**Objective**: Test loading and using a saved route

**Steps**:
1. Open SavedRoutesScreen
2. Tap on a saved route
3. Observe route preview
4. Tap "Start Navigation"

**Expected Results**:
- [ ] Route preview displayed on map
- [ ] Route details shown
- [ ] "Start Navigation" button enabled
- [ ] Navigation starts with saved route
- [ ] Route parameters match saved values

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 9.4: Delete Saved Route
**Objective**: Test deleting a saved route

**Steps**:
1. Open SavedRoutesScreen
2. Select a saved route
3. Tap delete button
4. Confirm deletion

**Expected Results**:
- [ ] Confirmation dialog appears
- [ ] Route deleted after confirmation
- [ ] Route removed from list
- [ ] No crashes or errors

**Test on**:
- [ ] iOS
- [ ] Android

---

### 10. Route History

#### Test 10.1: Automatic History Recording
**Objective**: Verify routes are automatically recorded in history

**Steps**:
1. Complete a full navigation session
2. Navigate to SavedRoutesScreen
3. Select "History" tab
4. Observe history entries

**Expected Results**:
- [ ] Completed route appears in history
- [ ] Entry shows date, duration, route name
- [ ] Entry shows actual vs. planned duration
- [ ] History sorted by date (newest first)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 10.2: Mark Route Success/Failure
**Objective**: Test rating routes in history

**Steps**:
1. Open route history
2. Select a history entry
3. Mark as successful or unsuccessful
4. Observe update

**Expected Results**:
- [ ] Success/failure buttons available
- [ ] Selection saved immediately
- [ ] Visual indicator of success/failure
- [ ] Rating persists after app restart

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 10.3: Save Route from History
**Objective**: Test saving a route from history to favorites

**Steps**:
1. Open route history
2. Select a history entry
3. Tap "Save to Favorites"
4. Enter name and confirm

**Expected Results**:
- [ ] Route saved to favorites
- [ ] Route appears in saved routes list
- [ ] Original history entry unchanged

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 10.4: History Cleanup
**Objective**: Verify old history entries are cleaned up

**Steps**:
1. Check history entries older than 90 days
2. Observe if they're automatically removed

**Expected Results**:
- [ ] Entries older than 90 days removed
- [ ] Recent entries retained
- [ ] Cleanup happens automatically

**Test on**:
- [ ] iOS
- [ ] Android

---

### 11. Error Handling

#### Test 11.1: Network Error Handling
**Objective**: Test app behavior when network is unavailable

**Steps**:
1. Enable airplane mode on device
2. Attempt to calculate a new route
3. Observe error handling

**Expected Results**:
- [ ] Clear error message displayed
- [ ] Message explains network is unavailable
- [ ] Retry option provided
- [ ] Saved routes still accessible
- [ ] No crashes

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 11.2: Location Unavailable
**Objective**: Test handling when GPS signal is lost

**Steps**:
1. Start navigation
2. Move to area with poor GPS (indoors, tunnel)
3. Observe app behavior

**Expected Results**:
- [ ] App detects location unavailable
- [ ] Helpful message displayed
- [ ] Navigation pauses gracefully
- [ ] Resumes when location available
- [ ] No crashes

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 11.3: Route Calculation Failure
**Objective**: Test handling when route cannot be calculated

**Steps**:
1. Set nap duration to 180 minutes
2. Select destination very close by (2 minutes away)
3. Attempt to calculate route

**Expected Results**:
- [ ] Error message displayed
- [ ] Message explains why route can't be calculated
- [ ] Suggestions provided
- [ ] User can adjust parameters
- [ ] No crashes

**Test on**:
- [ ] iOS
- [ ] Android

---

### 12. Offline Functionality

#### Test 12.1: Use Saved Routes Offline
**Objective**: Verify saved routes work without network

**Steps**:
1. Save several routes while online
2. Enable airplane mode
3. Load and start navigation with saved route

**Expected Results**:
- [ ] Saved routes accessible offline
- [ ] Route displays on map (if tiles cached)
- [ ] Navigation works with saved route
- [ ] Turn-by-turn instructions available

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 12.2: Offline Indicator
**Objective**: Test offline status indicator

**Steps**:
1. Enable airplane mode
2. Open app
3. Observe offline indicator

**Expected Results**:
- [ ] Offline indicator visible
- [ ] Indicator clearly shows offline status
- [ ] Indicator doesn't obstruct main content

**Test on**:
- [ ] iOS
- [ ] Android

---

### 13. Performance and Battery

#### Test 13.1: Route Calculation Performance
**Objective**: Measure route calculation time

**Test Cases**:
| Duration | Expected Time |
|----------|---------------|
| 30 min   | < 5 seconds   |
| 60 min   | < 5 seconds   |
| 120 min  | < 5 seconds   |
| 180 min  | < 5 seconds   |

**Steps** (for each duration):
1. Set nap duration
2. Start timer
3. Tap "Calculate Route"
4. Stop timer when routes appear

**Expected Results**:
- [ ] All calculations complete within 5 seconds
- [ ] No UI freezing during calculation
- [ ] Loading indicator shown

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 13.2: Battery Consumption During Navigation
**Objective**: Measure battery drain during extended navigation

**Steps**:
1. Fully charge device
2. Start 90-minute navigation session
3. Complete full navigation
4. Check battery level

**Expected Results**:
- [ ] Battery drain reasonable for navigation app
- [ ] Device doesn't overheat
- [ ] App doesn't drain battery excessively when backgrounded

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 13.3: Memory Usage
**Objective**: Verify app doesn't consume excessive memory

**Steps**:
1. Open app
2. Calculate multiple routes
3. Start and stop navigation several times
4. Check memory usage in device settings

**Expected Results**:
- [ ] Memory usage reasonable (<200MB)
- [ ] No memory leaks (usage doesn't grow indefinitely)
- [ ] App doesn't slow down over time

**Test on**:
- [ ] iOS
- [ ] Android

---

### 14. App State Management

#### Test 14.1: App Backgrounding During Navigation
**Objective**: Test navigation continues when app backgrounded

**Steps**:
1. Start navigation
2. Press home button (background app)
3. Wait 2 minutes
4. Return to app

**Expected Results**:
- [ ] Navigation continues in background
- [ ] Location tracking continues
- [ ] Remaining time accurate when returning
- [ ] Current instruction correct
- [ ] No data loss

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 14.2: App Termination and Restart
**Objective**: Test state persistence across app restarts

**Steps**:
1. Calculate and save routes
2. Start navigation
3. Force quit app
4. Relaunch app

**Expected Results**:
- [ ] Saved routes still available
- [ ] History preserved
- [ ] Preferences retained
- [ ] Navigation state handled gracefully (prompt to resume or start new)

**Test on**:
- [ ] iOS
- [ ] Android

---

### 15. Accessibility and Usability

#### Test 15.1: Touch Target Sizes
**Objective**: Verify all interactive elements are easily tappable

**Steps**:
1. Navigate through all screens
2. Attempt to tap all buttons, inputs, and interactive elements
3. Measure or estimate touch target sizes

**Expected Results**:
- [ ] All buttons at least 44x44 pixels
- [ ] Buttons easy to tap without mistakes
- [ ] Adequate spacing between interactive elements
- [ ] No accidental taps on nearby elements

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 15.2: Text Readability
**Objective**: Verify all text is readable

**Steps**:
1. Review all screens
2. Check text in various lighting conditions
3. Test with different device text size settings

**Expected Results**:
- [ ] All text clearly readable
- [ ] Sufficient contrast between text and background
- [ ] Text scales appropriately with system settings
- [ ] No text truncation or overlap

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 15.3: Loading States
**Objective**: Verify loading indicators appear for async operations

**Steps**:
1. Perform operations that require loading:
   - Calculate route
   - Search destinations
   - Load saved routes
   - Start navigation

**Expected Results**:
- [ ] Loading indicator appears for all async operations
- [ ] Indicator visible and clear
- [ ] User can't interact with UI during loading (or interaction is queued)
- [ ] Indicator disappears when operation completes

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 15.4: Haptic Feedback
**Objective**: Test haptic feedback for interactions

**Steps**:
1. Interact with various UI elements:
   - Buttons
   - Toggles
   - Route selection
   - Navigation start

**Expected Results**:
- [ ] Haptic feedback provided for key interactions
- [ ] Feedback appropriate for action type
- [ ] Feedback not excessive or annoying
- [ ] Feedback respects device settings

**Test on**:
- [ ] iOS
- [ ] Android

---

### 16. Edge Cases and Stress Tests

#### Test 16.1: Many Saved Routes
**Objective**: Test app with large number of saved routes

**Steps**:
1. Save 50+ routes
2. Navigate to SavedRoutesScreen
3. Scroll through list
4. Load and delete routes

**Expected Results**:
- [ ] List scrolls smoothly
- [ ] No performance degradation
- [ ] All routes accessible
- [ ] Search/filter works (if implemented)

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 16.2: Long Navigation Session
**Objective**: Test app during extended navigation (180 minutes)

**Steps**:
1. Calculate 180-minute route
2. Start navigation
3. Complete full route (or simulate)

**Expected Results**:
- [ ] App remains stable throughout
- [ ] No memory leaks
- [ ] Battery consumption reasonable
- [ ] All features work at end of session

**Test on**:
- [ ] iOS
- [ ] Android

#### Test 16.3: Rapid Route Recalculation
**Objective**: Test app when user rapidly changes parameters

**Steps**:
1. Open NapSetupScreen
2. Rapidly change nap duration multiple times
3. Rapidly toggle preferences
4. Observe app behavior

**Expected Results**:
- [ ] App handles rapid changes gracefully
- [ ] Debouncing prevents excessive calculations
- [ ] No crashes or freezing
- [ ] Final route matches final parameters

**Test on**:
- [ ] iOS
- [ ] Android

---

## Test Summary Template

After completing tests, use this template to summarize results:

### Test Session Information
- **Date**: [Date]
- **Tester**: [Name]
- **App Version**: [Version]
- **Device**: [Device Model]
- **OS Version**: [iOS/Android Version]

### Test Results Summary
- **Total Tests**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Blocked**: [Number]
- **Not Tested**: [Number]

### Critical Issues Found
1. [Issue description]
2. [Issue description]

### Non-Critical Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]

### Sign-off
- [ ] All critical functionality tested and working
- [ ] No blocking issues found
- [ ] App ready for release / next phase

---

## Notes for Testers

### Best Practices
- Test in real-world conditions when possible
- Document any unexpected behavior, even if not a clear bug
- Take screenshots of issues
- Note device-specific behaviors
- Test with different network conditions (WiFi, 4G, 3G, offline)
- Test in different geographic areas (urban, suburban, rural)

### Safety Reminders
- Never operate the device while driving
- Have a passenger conduct tests during actual drives
- Follow all traffic laws
- Park safely when reviewing test results

### Reporting Issues
When reporting issues, include:
- Device model and OS version
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or screen recordings
- Frequency (always, sometimes, once)
- Severity (critical, major, minor, cosmetic)

---

## Appendix: Test Data

### Sample Destinations
Prepare these destinations for testing:
- Close destination (5-10 min away)
- Medium destination (20-30 min away)
- Far destination (60+ min away)
- POI (coffee shop, grocery store, park)
- Address with apartment/unit number
- Destination with special characters in name

### Sample Route Names
Use these when saving routes:
- "Morning Nap Route"
- "Afternoon Drive"
- "Scenic Loop"
- "Quick 30-Minute"
- "Route to Grandma's"

### Test Nap Durations
Focus testing on these common durations:
- 15 minutes (minimum)
- 30 minutes (common short nap)
- 45 minutes (common nap)
- 60 minutes (1 hour)
- 90 minutes (1.5 hours)
- 120 minutes (2 hours)
- 180 minutes (maximum)

---

**End of Manual Testing Guide**
