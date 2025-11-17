# Error Handling Guide

This document describes the error handling implementation in NapRoute.

## Overview

The error handling system provides:
- Global error boundaries for React errors
- User-friendly error messages and suggestions
- Network connectivity monitoring
- Location permission handling
- Route calculation error handling
- Operation queuing for offline scenarios
- Retry mechanisms for recoverable errors

## Architecture

### Core Components

#### 1. Error Handler (`src/utils/errorHandler.ts`)
Central error handling utilities that:
- Create standardized `AppError` objects
- Log errors for debugging
- Convert standard errors to `AppError`
- Provide user-friendly messages and suggestions

#### 2. Error Boundary (`src/components/ErrorBoundary.tsx`)
React error boundary that catches errors in component tree:
- Prevents app crashes
- Shows fallback UI
- Provides retry mechanism
- Logs errors for debugging

#### 3. Network Monitor (`src/utils/networkMonitor.ts`)
Monitors network connectivity:
- Tracks online/offline status
- Notifies listeners of status changes
- Provides synchronous status check
- Supports waiting for connection

#### 4. Operation Queue (`src/utils/operationQueue.ts`)
Queues operations when offline:
- Stores operations in AsyncStorage
- Automatically processes when online
- Supports retry with exponential backoff
- Handles operation failures gracefully

#### 5. Location Permissions (`src/utils/locationPermissions.ts`)
Handles location permission requests:
- Checks permission status
- Requests permissions with explanation
- Handles blocked permissions
- Verifies location services enabled

## Usage Examples

### Using Error Boundary

Wrap your app or screen components:

```tsx
import { ErrorBoundary } from './src/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Displaying Errors

Use `ErrorDisplay` for modal errors:

```tsx
import { ErrorDisplay } from './src/components/ErrorDisplay';
import { AppError } from './src/types';

function MyScreen() {
  const [error, setError] = useState<AppError | null>(null);

  return (
    <>
      {error && (
        <ErrorDisplay
          error={error}
          onRetry={() => {
            setError(null);
            retryOperation();
          }}
          onDismiss={() => setError(null)}
        />
      )}
    </>
  );
}
```

Use `InlineErrorDisplay` for inline errors:

```tsx
import { InlineErrorDisplay } from './src/components/ErrorDisplay';

function MyForm() {
  return (
    <>
      {error && (
        <InlineErrorDisplay
          error={error}
          onRetry={handleRetry}
        />
      )}
    </>
  );
}
```

### Handling Network Errors

Monitor network status:

```tsx
import { subscribeToNetworkStatus, isNetworkConnected } from './src/utils/networkMonitor';

function MyComponent() {
  useEffect(() => {
    const unsubscribe = subscribeToNetworkStatus((isConnected) => {
      if (isConnected) {
        console.log('Back online!');
      } else {
        console.log('Offline');
      }
    });

    return unsubscribe;
  }, []);

  const handleAction = async () => {
    if (!isNetworkConnected()) {
      // Queue for later or show offline message
      await queueOperation('saveRoute', routeData);
      return;
    }
    
    // Proceed with online operation
  };
}
```

### Handling Location Permissions

Request location permission:

```tsx
import { ensureLocationAccess } from './src/utils/locationPermissions';

async function requestLocation() {
  const result = await ensureLocationAccess();
  
  if (!result.granted) {
    // Show error
    setError(result.error);
    return;
  }
  
  // Proceed with location access
}
```

Show permission prompt:

```tsx
import { LocationPermissionPrompt } from './src/components/LocationPermissionPrompt';
import { LocationPermissionStatus } from './src/utils/locationPermissions';

function MyScreen() {
  const [permissionStatus, setPermissionStatus] = useState(LocationPermissionStatus.DENIED);

  return (
    <>
      {permissionStatus !== LocationPermissionStatus.GRANTED && (
        <LocationPermissionPrompt
          status={permissionStatus}
          onRequestPermission={handleRequestPermission}
          onDismiss={handleDismiss}
        />
      )}
    </>
  );
}
```

### Handling Route Calculation Errors

```tsx
import { handleRouteCalculationError } from './src/utils/routeCalculationErrorHandler';
import { RouteCalculationError } from './src/components/RouteCalculationError';

async function calculateRoute() {
  try {
    const routes = await napRouteService.calculateNapRoutes(
      startLocation,
      napDuration,
      preferences,
      destination
    );
    setRoutes(routes);
  } catch (error) {
    const appError = handleRouteCalculationError(error, {
      napDuration,
      destination: destination?.name,
      hasDestination: !!destination,
    });
    setError(appError);
  }
}

// Display error
{error && (
  <RouteCalculationError
    error={error}
    napDuration={napDuration}
    destination={destination?.name}
    onAdjustDuration={() => {
      setError(null);
      // Show duration picker
    }}
    onChangeDestination={() => {
      setError(null);
      // Show destination picker
    }}
    onAdjustPreferences={() => {
      setError(null);
      // Show preferences picker
    }}
    onRetry={() => {
      setError(null);
      calculateRoute();
    }}
  />
)}
```

### Queuing Operations for Offline

Register operation handlers:

```tsx
import { registerOperationHandler, queueOperation } from './src/utils/operationQueue';

// Register handler
registerOperationHandler('saveRoute', async (data) => {
  await napRouteRepository.saveRoute(data.route, data.name);
});

// Queue operation when offline
async function saveRoute(route: NapRoute, name: string) {
  if (!isNetworkConnected()) {
    await queueOperation('saveRoute', { route, name });
    showMessage('Route will be saved when online');
    return;
  }
  
  await napRouteRepository.saveRoute(route, name);
}
```

## Error Types

The following error types are defined:

- `NETWORK_ERROR` - Network connectivity issues
- `LOCATION_PERMISSION_DENIED` - Location permission denied
- `LOCATION_UNAVAILABLE` - GPS unavailable
- `NAP_ROUTE_NOT_FOUND` - No suitable route found
- `DESTINATION_TOO_FAR` - Destination exceeds nap duration
- `INVALID_NAP_DURATION` - Duration out of valid range
- `GEOCODING_FAILED` - Location search failed
- `STORAGE_ERROR` - AsyncStorage operation failed
- `ROUTE_EXTENSION_FAILED` - Route extension failed
- `API_ERROR` - Generic API error

## Best Practices

1. **Always wrap async operations in try-catch**
   ```tsx
   try {
     await someOperation();
   } catch (error) {
     const appError = handleError(error, 'MyComponent:someOperation');
     setError(appError);
   }
   ```

2. **Provide context when handling errors**
   ```tsx
   const appError = handleRouteCalculationError(error, {
     napDuration,
     destination: destination?.name,
     hasDestination: !!destination,
   });
   ```

3. **Show user-friendly messages**
   - Use `error.userMessage` for display
   - Show `error.suggestions` to help users resolve issues
   - Provide retry buttons for retryable errors

4. **Handle offline scenarios gracefully**
   - Check network status before operations
   - Queue operations when offline
   - Allow use of saved routes offline

5. **Request permissions with explanation**
   - Show why permission is needed
   - Provide clear instructions
   - Handle blocked permissions by directing to settings

6. **Log errors for debugging**
   - Use `logError()` for all errors
   - Include context in log messages
   - Don't expose technical details to users

## Testing

Test error handling:

```tsx
import { createNetworkError, createLocationPermissionError } from './src/utils/errorHandler';

describe('Error Handling', () => {
  it('should display network error', () => {
    const error = createNetworkError();
    expect(error.type).toBe(ErrorType.NETWORK_ERROR);
    expect(error.retryable).toBe(true);
  });

  it('should handle location permission error', () => {
    const error = createLocationPermissionError();
    expect(error.suggestions).toContain('Go to Settings and enable location permissions');
  });
});
```

## Requirements Coverage

This implementation satisfies the following requirements:

- **Requirement 11.1**: Network error handling with offline mode
- **Requirement 11.2**: Route calculation error messages
- **Requirement 11.3**: Retry mechanisms for failed operations
- **Requirement 11.4**: Error logging for debugging
- **Requirement 11.5**: App stability and crash prevention
- **Requirement 6.4**: Location permission handling
- **Requirement 8.4**: Destination too far error handling
