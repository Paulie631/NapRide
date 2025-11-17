# Task 12.4: Handle Route Calculation Errors - Implementation Summary

## Overview
Implemented comprehensive route calculation error handling with specific error messages, contextual suggestions, and parameter adjustment capabilities.

## Requirements Addressed
- **Requirement 8.4**: Handle destination-related errors (destination too far, no route found)
- **Requirement 11.2**: Display specific error messages with suggestions for resolution

## Implementation Details

### 1. Enhanced NapSetupScreen Error Handling

#### Added Imports
```typescript
import {RouteCalculationError} from '../components/RouteCalculationError';
import {
  handleRouteCalculationError,
  getRouteCalculationSuggestions,
  formatRouteCalculationErrorMessage,
} from '../utils/routeCalculationErrorHandler';
```

#### New State Management
- Added `routeCalculationError` state to track structured error information
- Maintains both simple error messages and detailed AppError objects

#### Enhanced calculateRoutes Function
The route calculation now:
1. Catches all route calculation errors
2. Converts them to structured AppError objects using `handleRouteCalculationError`
3. Adds contextual suggestions based on current parameters
4. Formats error messages with specific details (duration, destination)
5. Displays the RouteCalculationError component with actionable options

### 2. Error Action Handlers

#### handleAdjustDuration()
- Automatically adjusts duration based on error type
- For DESTINATION_TOO_FAR: Increases by 30 minutes (up to 180 max)
- For INVALID_NAP_DURATION: Sets to valid boundary (15 or 180)
- For NAP_ROUTE_NOT_FOUND with short duration: Sets to 30 minutes

#### handleChangeDestination()
- Clears current destination
- Allows user to search for a closer destination
- Only available when route type is 'destination'

#### handleAdjustPreferences()
- Automatically switches from 'scenic' to 'balanced' if that was causing issues
- Allows user to manually adjust other preferences
- Dismisses error to show preference controls

#### handleRetryCalculation()
- Retries route calculation with current parameters
- Only available for retryable errors (network, API)

#### handleDismissError()
- Dismisses the error modal
- Allows user to manually adjust parameters

### 3. RouteCalculationError Component Integration

The component is displayed when `routeCalculationError` is set and provides:

**Visual Elements:**
- Error-specific icon (🚗 for destination too far, 🗺️ for no route, ⏱️ for invalid duration)
- Clear error title and message
- Current parameter display (nap duration, destination)
- Contextual suggestions list

**Action Buttons:**
- Primary action based on error type:
  - DESTINATION_TOO_FAR: "Increase Nap Duration"
  - NAP_ROUTE_NOT_FOUND: "Adjust Preferences"
  - INVALID_NAP_DURATION: "Adjust Duration"
- Secondary actions:
  - "Choose Closer Destination" (for destination errors)
  - "Try Different Duration" (for route not found)
  - "Try Again" (for retryable errors)
- Dismiss button

### 4. Error Types Handled

#### DESTINATION_TOO_FAR
- **Message**: "The destination is too far for the selected nap duration"
- **Suggestions**: 
  - Increase nap duration
  - Choose closer destination
  - Use return route instead
- **Actions**: Adjust duration, change destination

#### NAP_ROUTE_NOT_FOUND
- **Message**: "Could not find a suitable route"
- **Contextual Suggestions**:
  - For short durations (<30 min): "Try a longer nap duration (30+ minutes)"
  - For long durations (>120 min): "Try a shorter nap duration"
  - With destination: "Try a return route instead"
  - With scenic preference: "Try 'balanced' route preference"
- **Actions**: Adjust preferences, adjust duration

#### INVALID_NAP_DURATION
- **Message**: "Please enter a nap duration between 15 and 180 minutes"
- **Suggestions**: 
  - Enter valid duration
  - Use quick-select buttons
- **Actions**: Adjust duration (auto-corrects to valid range)

#### NETWORK_ERROR
- **Message**: "Unable to connect to the internet"
- **Suggestions**:
  - Check connection
  - Use saved routes offline
  - Try again
- **Actions**: Retry, navigate to saved routes
- **Special Handling**: Shows Alert dialog with navigation option

### 5. Contextual Suggestions System

The `getRouteCalculationSuggestions` function provides dynamic suggestions based on:
- Current nap duration (too short, too long, or appropriate)
- Route type (return vs destination)
- Route preferences (scenic, quiet, highway, balanced)
- Error type

This ensures users receive relevant, actionable guidance for their specific situation.

### 6. Error Message Formatting

The `formatRouteCalculationErrorMessage` function enhances error messages with:
- Specific nap duration mentioned in the message
- Destination name included in the message
- Context-aware phrasing

Example: "Could not find a suitable route. We couldn't find a suitable route for a 45-minute nap."

### 7. Recommended Adjustments

The `getRecommendedAdjustments` function provides programmatic suggestions:
- Specific duration to adjust to
- Whether to remove destination
- Whether to change preferences

These are used by the action handlers to automatically adjust parameters.

## User Experience Flow

### Scenario 1: Destination Too Far
1. User enters 30-minute nap duration
2. User selects destination 50 minutes away
3. Route calculation fails with DESTINATION_TOO_FAR
4. Error modal shows:
   - "Destination Too Far" title
   - Current duration: 30 minutes
   - Destination name
   - Suggestions: Increase duration, choose closer destination
5. User clicks "Increase Nap Duration"
6. Duration automatically adjusts to 60 minutes
7. Route recalculates automatically

### Scenario 2: No Route Found (Scenic, Short Duration)
1. User enters 20-minute nap duration
2. User selects "scenic" preference
3. Route calculation fails with NAP_ROUTE_NOT_FOUND
4. Error modal shows:
   - "No Route Found" title
   - Suggestions: Try longer duration (30+ min), try balanced preference
5. User clicks "Adjust Preferences"
6. Preference automatically changes to "balanced"
7. User can manually adjust duration if needed

### Scenario 3: Network Error
1. User is offline
2. Route calculation fails with NETWORK_ERROR
3. Error modal shows with retry option
4. Alert dialog appears with "View Saved Routes" option
5. User can navigate to saved routes or wait for connection

## Testing

Created comprehensive test suite in `routeCalculationErrorHandler.test.ts`:

### Test Coverage
- ✅ Error type detection (no route, destination too far, invalid duration, network)
- ✅ Duration validation (valid, too short, too long, boundaries)
- ✅ Contextual suggestions (short/long duration, destination, preferences)
- ✅ Error message formatting (with/without context)
- ✅ Recoverable error identification
- ✅ Recommended adjustments (duration, destination, preferences)

### Test Cases
- 25+ test cases covering all error scenarios
- Edge cases (boundary values, missing context)
- Integration scenarios (multiple context factors)

## Files Modified

1. **src/screens/NapSetupScreen.tsx**
   - Added RouteCalculationError component integration
   - Enhanced error handling in calculateRoutes
   - Added 5 error action handlers
   - Added routeCalculationError state

2. **src/utils/routeCalculationErrorHandler.ts** (existing)
   - Already implemented with all necessary functions
   - No changes needed

3. **src/components/RouteCalculationError.tsx** (existing)
   - Already implemented with full UI
   - No changes needed

4. **src/utils/__tests__/routeCalculationErrorHandler.test.ts** (new)
   - Comprehensive test suite
   - 25+ test cases

## Verification

### Manual Testing Checklist
- [ ] Test destination too far error with various durations
- [ ] Test no route found with different preferences
- [ ] Test invalid duration (below 15, above 180)
- [ ] Test network error while offline
- [ ] Verify "Adjust Duration" button increases duration appropriately
- [ ] Verify "Change Destination" clears destination
- [ ] Verify "Adjust Preferences" switches from scenic to balanced
- [ ] Verify "Try Again" retries calculation
- [ ] Verify contextual suggestions appear correctly
- [ ] Verify error modal dismisses properly

### Automated Testing
Run: `npm test -- routeCalculationErrorHandler.test.ts --run`

Expected: All tests pass

## Benefits

1. **User-Friendly**: Clear, specific error messages instead of generic failures
2. **Actionable**: Provides concrete steps to resolve issues
3. **Contextual**: Suggestions adapt to user's current parameters
4. **Efficient**: One-click parameter adjustments
5. **Educational**: Helps users understand constraints and options
6. **Recoverable**: Most errors can be resolved without leaving the screen

## Future Enhancements

1. **Error Analytics**: Track which errors occur most frequently
2. **Smart Suggestions**: Learn from successful adjustments
3. **Proactive Validation**: Warn before calculation if parameters likely to fail
4. **Alternative Suggestions**: Suggest specific destinations within range
5. **Route Preview**: Show partial route even when full route fails

## Compliance

✅ **Requirement 8.4**: Destination error handling implemented
✅ **Requirement 11.2**: Specific error messages with suggestions implemented
✅ **Task 12.4**: All sub-tasks completed:
  - Display specific error messages ✅
  - Provide suggestions for resolution ✅
  - Allow parameter adjustment ✅
