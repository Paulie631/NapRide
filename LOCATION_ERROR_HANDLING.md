# Location Error Handling Implementation

## Overview

This document describes the implementation of Task 12.3: Handle location errors, which includes requesting location permissions with explanation, handling permission denial gracefully, and displaying helpful messages for location unavailable scenarios.

## Requirements Addressed

- **Requirement 6.4**: Location permission handling and error messages
- **Requirement 11.1**: Graceful error handling with user-friendly messages

## Components Implemented

### 1. LocationPermissionPrompt Component

**File**: `src/components/LocationPermissionPrompt.tsx`

Enhanced component that displays a clear explanation when requesting location permissions:

- **Clear explanation** of why location is needed
- **Feature list** showing what location is used for
- **Privacy assurance** that data stays on device
- **Platform-specific instructions** for enabling permissions
- **Different states** for denied vs blocked permissions
- **Action buttons** for granting permission or opening settings

**Usage**:
```typescript
<LocationPermissionPrompt
  status={LocationPermissionStatus.DENIED}
  onRequestPermission={handleRequestPermission}
  onDismiss={handleDismiss}
  showExplanation={true}
/>
```

### 2. LocationErrorDisplay Component

**File**: `src/components/LocationErrorDisplay.tsx`

New component specifically for displaying location-related errors with helpful troubleshooting:

- **Error-specific icons** (🔒 for permissions, 📡 for GPS)
- **Step-by-step troubleshooting** instructions
- **Platform-specific guidance** (iOS vs Android)
- **Quick tips** for resolving issues
- **Action buttons** for retry or opening settings

**Usage**:
```typescript
<LocationErrorDisplay
  error={locationError}
  onRetry={handleRetry}
  onOpenSettings={handleOpenSettings}
  onDismiss={handleDismiss}
/>
```

### 3. useLocationError Hook

**File**: `src/hooks/useLocationError.ts`

React hook for managing location errors in components:

**Features**:
- Track current location error state
- Identify error type (permission vs unavailable)
- Retry location access
- Open device settings
- Show location help dialog
- Clear errors

**Usage**:
```typescript
const {
  locationError,
  isLocationPermissionDenied,
  isLocationUnavailable,
  handleLocationError,
  clearLocationError,
  retryLocationAccess,
  openLocationSettings,
  showLocationHelp,
} = useLocationError();

// Handle error
if (error) {
  handleLocationError(error);
}

// Retry
const success = await retryLocationAccess();
```

## Enhanced Utilities

### 1. LocationService Error Handling

**File**: `src/services/LocationService.ts`

Enhanced error creation methods:

- **Detailed error messages** based on error codes
- **Specific suggestions** for each error type
- **Platform-specific guidance** in error messages

**Error Code Handling**:
- Code 1 (Permission Denied): Settings instructions
- Code 2 (Position Unavailable): GPS signal guidance
- Code 3 (Timeout): Retry and signal improvement tips

### 2. Location Permissions Utilities

**File**: `src/utils/locationPermissions.ts`

Enhanced with new functions:

#### `getLocationErrorDetails(errorCode: number)`
Returns detailed error information including:
- Title
- User-friendly message
- Array of actionable suggestions

**Example**:
```typescript
const details = getLocationErrorDetails(2);
// Returns:
// {
//   title: 'Location Signal Unavailable',
//   message: 'Unable to determine your location. GPS signal may be weak...',
//   suggestions: [
//     'Move to an area with a clear view of the sky',
//     'Ensure you are not inside a building or tunnel',
//     ...
//   ]
// }
```

#### Enhanced `showLocationUnavailableHelp()`
Now includes:
- More detailed troubleshooting steps
- Battery level consideration
- Option to open settings directly

## Error Messages

### Permission Denied (Error Code 1)

**User Message**: "Location permission was denied. Please enable location access in Settings."

**Suggestions**:
- Open Settings and enable location permissions
- Ensure location services are enabled on your device
- Restart the app after enabling permissions

**Platform-Specific Instructions**:
- iOS: "Go to Settings > NapRoute > Location > 'While Using the App'"
- Android: "Go to Settings > Apps > NapRoute > Permissions > Location"

### Position Unavailable (Error Code 2)

**User Message**: "GPS signal is unavailable. Please ensure you have a clear view of the sky."

**Suggestions**:
- Move to an area with a clear view of the sky
- Avoid being inside buildings, tunnels, or parking garages
- Wait a moment for GPS to acquire signal
- Ensure location services are enabled in Settings

### Timeout (Error Code 3)

**User Message**: "Location request timed out. GPS signal may be weak."

**Suggestions**:
- Try again in a moment
- Move to an area with better GPS reception
- Check that location services are enabled
- Ensure your device has sufficient battery

## Testing

### Test File

**File**: `src/utils/__tests__/locationErrorHandling.test.ts`

Tests cover:
- Error detail generation for all error codes
- User-friendly message formatting
- Suggestion quality and relevance
- Platform-specific guidance

### Running Tests

```bash
npm test -- locationErrorHandling.test.ts
```

## Integration Examples

### In NapSetupScreen

```typescript
import { useLocationError } from '../hooks/useLocationError';
import { LocationErrorDisplay } from '../components/LocationErrorDisplay';

function NapSetupScreen() {
  const {
    locationError,
    isLocationPermissionDenied,
    handleLocationError,
    retryLocationAccess,
    openLocationSettings,
  } = useLocationError();
  
  const handleGetLocation = async () => {
    try {
      const location = await LocationService.getCurrentLocation();
      // Use location...
    } catch (error) {
      handleLocationError(error as AppError);
    }
  };
  
  return (
    <View>
      {locationError && (
        <LocationErrorDisplay
          error={locationError}
          onRetry={retryLocationAccess}
          onOpenSettings={openLocationSettings}
        />
      )}
      {/* Rest of screen */}
    </View>
  );
}
```

### In NavigationScreen

```typescript
import { useLocationError } from '../hooks/useLocationError';

function NavigationScreen() {
  const { handleLocationError, showLocationHelp } = useLocationError();
  
  useEffect(() => {
    const watchId = LocationService.watchLocation((location) => {
      // Handle location update
    }).catch((error) => {
      handleLocationError(error);
      showLocationHelp();
    });
    
    return () => LocationService.stopWatchingLocation(watchId);
  }, []);
}
```

## User Experience Flow

### First-Time Permission Request

1. User opens app
2. App shows `LocationPermissionPrompt` with clear explanation
3. User sees what location is used for
4. User sees privacy assurance
5. User taps "Enable Location"
6. System permission dialog appears
7. User grants permission

### Permission Denied

1. User denies permission
2. App shows `LocationErrorDisplay` with:
   - Clear message about why permission is needed
   - Step-by-step instructions to enable
   - "Grant Permission" button to retry
3. User can retry or dismiss

### Permission Blocked

1. Permission is permanently blocked
2. App shows `LocationErrorDisplay` with:
   - Message that permission is blocked
   - Platform-specific instructions
   - "Open Settings" button
3. User taps button → Settings app opens
4. User enables permission
5. User returns to app
6. App automatically retries

### GPS Signal Unavailable

1. Location request fails due to weak signal
2. App shows `LocationErrorDisplay` with:
   - Message about GPS signal
   - Troubleshooting steps
   - Tips for better reception
3. User moves to better location
4. User taps "Try Again"
5. Location acquired successfully

## Best Practices

### 1. Request Permission with Context

Always show explanation before requesting permission:
```typescript
// Good
<LocationPermissionPrompt 
  status={status}
  onRequestPermission={request}
  showExplanation={true}
/>

// Avoid
await requestLocationPermission(); // No context
```

### 2. Provide Specific Error Messages

Use error codes to provide targeted guidance:
```typescript
// Good
const details = getLocationErrorDetails(error.code);
showError(details.message, details.suggestions);

// Avoid
showError('Location error'); // Too generic
```

### 3. Make Errors Actionable

Always provide clear next steps:
```typescript
// Good
<LocationErrorDisplay
  error={error}
  onRetry={retry}
  onOpenSettings={openSettings}
/>

// Avoid
<Text>{error.message}</Text> // No action
```

### 4. Handle All Error States

Cover all possible error scenarios:
- Permission not requested
- Permission denied
- Permission blocked
- GPS unavailable
- GPS timeout
- Unknown errors

## Accessibility

All components include:
- Sufficient color contrast
- Touch targets ≥ 44x44 pixels
- Clear, readable text
- Logical focus order
- Screen reader support

## Platform Differences

### iOS
- Uses "While Using the App" permission
- Settings path: Settings > App Name > Location
- Permission can be changed anytime

### Android
- Uses "Allow only while using the app" permission
- Settings path: Settings > Apps > App Name > Permissions
- Permission can be permanently denied

## Future Enhancements

1. **Background location**: Add support for background location tracking
2. **Location accuracy**: Allow users to choose accuracy level
3. **Battery optimization**: Detect and handle battery saver mode
4. **Offline mode**: Better handling when GPS is completely unavailable
5. **Analytics**: Track permission denial rates and error frequencies

## Verification

Task 12.3 is complete when:
- ✅ Location permissions requested with clear explanation
- ✅ Permission denial handled gracefully
- ✅ Helpful messages displayed for location unavailable
- ✅ Platform-specific guidance provided
- ✅ Step-by-step troubleshooting included
- ✅ All error codes handled with specific messages
- ✅ Tests passing
- ✅ Components integrated and working

## Related Files

- `src/components/LocationPermissionPrompt.tsx`
- `src/components/LocationErrorDisplay.tsx`
- `src/hooks/useLocationError.ts`
- `src/services/LocationService.ts`
- `src/utils/locationPermissions.ts`
- `src/utils/__tests__/locationErrorHandling.test.ts`
