# Network Error Handling Implementation

## Overview

This document describes the implementation of network error handling for the NapRoute application, fulfilling **Requirement 11.1**: Handle network errors gracefully.

## Requirements Addressed

**Requirement 11.1**: WHEN a network error occurs, THE NapRoute System SHALL display a message indicating the connection issue and allow offline use of saved routes.

## Implementation Components

### 1. Network Connectivity Detection

**File**: `src/utils/networkMonitor.ts`

The network monitor provides real-time connectivity detection:

- **`initializeNetworkMonitor()`**: Initializes network monitoring and returns cleanup function
- **`checkNetworkConnection()`**: Async check for current network status
- **`isNetworkConnected()`**: Synchronous check for current network status
- **`subscribeToNetworkStatus(callback)`**: Subscribe to network status changes
- **`waitForConnection(timeout)`**: Wait for network connection with timeout

**Usage**:
```typescript
import { checkNetworkConnection, subscribeToNetworkStatus } from '../utils/networkMonitor';

// Check connectivity before API call
const isConnected = await checkNetworkConnection();
if (!isConnected) {
  // Handle offline state
}

// Subscribe to changes
const unsubscribe = subscribeToNetworkStatus((connected) => {
  console.log('Network status:', connected ? 'online' : 'offline');
});
```

### 2. Offline Indicator

**File**: `src/components/NetworkStatusIndicator.tsx`

Visual indicator that displays at the top of the screen when offline:

- Shows "⚠ No Internet Connection" when offline
- Shows "✓ Back Online" when connection is restored
- Includes helpful message: "You can still use saved routes"
- Automatically slides in/out with smooth animation

**Integration**: Already integrated in `App.tsx` at the root level.

### 3. Operation Queue

**File**: `src/utils/operationQueue.ts`

Queues operations that require network connectivity for later execution:

- **`initializeOperationQueue()`**: Initialize queue and load persisted operations
- **`queueOperation(type, data)`**: Add operation to queue
- **`registerOperationHandler(type, handler)`**: Register handler for operation type
- **`getQueuedOperationCount()`**: Get number of queued operations
- **`clearQueue()`**: Clear all queued operations

**Features**:
- Automatically processes queue when network becomes available
- Persists queue to AsyncStorage
- Retries failed operations up to 3 times
- Removes operations after max retries

**Usage**:
```typescript
import { queueOperation, registerOperationHandler } from '../utils/operationQueue';

// Register handler
registerOperationHandler('save-route', async (data) => {
  await saveRouteToServer(data);
});

// Queue operation when offline
await queueOperation('save-route', { routeData });
```

### 4. Service-Level Network Checks

#### NapRouteService

**File**: `src/services/NapRouteService.ts`

The `makeApiRequest` method now:
1. Checks network connectivity before making API calls
2. Throws user-friendly `NETWORK_ERROR` with helpful suggestions
3. Distinguishes between network errors and API errors
4. Provides actionable suggestions:
   - "Check your internet connection"
   - "Use a saved route instead"
   - "Try again when online"

**Error Handling**:
```typescript
try {
  const routes = await napRouteService.calculateNapRoutes(request);
} catch (error) {
  if (error.type === ErrorType.NETWORK_ERROR) {
    // User is offline - guide them to saved routes
    showOfflineMessage();
  }
}
```

#### LocationService

**File**: `src/services/LocationService.ts`

Network checks added to:

1. **`performLocationSearch()`**: 
   - Checks connectivity before searching
   - Returns helpful error with suggestions
   - Suggests using current location instead

2. **`reverseGeocode()`**:
   - Checks connectivity before geocoding
   - Returns coordinate string when offline (graceful degradation)
   - Doesn't block functionality when offline

### 5. UI-Level Error Handling

#### NapSetupScreen

**File**: `src/screens/NapSetupScreen.tsx`

Enhanced error handling for route calculation:

```typescript
catch (err: any) {
  if (err.type === ErrorType.NETWORK_ERROR) {
    setError('You are currently offline. You can still use saved routes from the Saved Routes screen.');
    
    // Show alert with navigation option
    Alert.alert(
      'No Internet Connection',
      'Route calculation requires an internet connection. You can use saved routes while offline.',
      [
        { text: 'View Saved Routes', onPress: () => navigation.navigate('SavedRoutes') },
        { text: 'Try Again', onPress: () => calculateRoute() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }
}
```

Destination search error handling:
```typescript
catch (err: any) {
  if (err.type === ErrorType.NETWORK_ERROR) {
    setError('You are offline. Location search requires an internet connection.');
  }
}
```

### 6. Offline Functionality

#### Saved Routes Work Offline

**Files**: 
- `src/repositories/NapRouteRepository.ts`
- `src/repositories/RouteHistoryRepository.ts`

Both repositories use AsyncStorage (local storage), which works completely offline:

- Load saved routes
- View route details
- Start navigation with saved routes
- View route history

**No network required for**:
- Viewing saved routes
- Loading saved routes
- Starting navigation with saved routes
- Viewing route history
- Managing saved routes (delete, rename)

## Error Messages and User Guidance

### Network Error Messages

All network errors now include:

1. **Clear error type**: "No Internet Connection" or "Network Error"
2. **User-friendly message**: Explains what happened in plain language
3. **Actionable suggestions**: 
   - Check your internet connection
   - Use a saved route instead
   - Try again when online
4. **Alternative actions**: Direct users to saved routes

### Example Error Flow

1. User tries to calculate new route while offline
2. System detects no network connection
3. Error message displays: "You are currently offline"
4. Alert shows with options:
   - View Saved Routes (navigates to SavedRoutesScreen)
   - Try Again (retries calculation)
   - Cancel
5. User can continue using app with saved routes

## Testing

### Test File

**File**: `src/utils/__tests__/networkErrorHandling.test.ts`

Tests cover:
- Network connectivity detection
- Operation queue functionality
- Error message content
- Offline suggestions

### Manual Testing Checklist

- [ ] Turn off WiFi/cellular and verify offline indicator appears
- [ ] Try to calculate new route while offline - should show helpful error
- [ ] Navigate to saved routes while offline - should work
- [ ] Load and start navigation with saved route while offline - should work
- [ ] Try destination search while offline - should show appropriate error
- [ ] Turn network back on - indicator should show "Back Online"
- [ ] Queued operations should process when back online

## Future Enhancements

1. **Offline Map Tiles**: Cache map tiles for offline viewing
2. **Smart Retry**: Automatically retry failed operations when back online
3. **Sync Indicator**: Show when operations are being synced
4. **Offline Mode Toggle**: Allow users to explicitly enable offline mode
5. **Download Routes**: Pre-download routes for offline use

## Summary

The network error handling implementation ensures that:

✅ Network connectivity is detected before API calls
✅ Offline indicator is displayed when no connection
✅ User-friendly error messages guide users to saved routes
✅ Saved routes work completely offline
✅ Operations can be queued for later execution
✅ Users can continue using core functionality offline

This fulfills **Requirement 11.1** by gracefully handling network errors and allowing offline use of saved routes.
