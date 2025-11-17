# Global Error Handling Implementation

## Overview

This document describes the comprehensive error handling system implemented for the NapRoute application. The system provides multiple layers of error protection, user-friendly error messages, automatic retry mechanisms, and detailed error logging.

## Components

### 1. Error Boundary Components

#### ErrorBoundary (Root Level)
- **Location**: `src/components/ErrorBoundary.tsx`
- **Purpose**: Catches all unhandled React errors at the application root
- **Usage**: Wraps the entire app in `App.tsx`
- **Features**:
  - Prevents app crashes
  - Displays user-friendly error screen
  - Provides "Try Again" button to reset error state
  - Logs errors for debugging

#### ScreenErrorBoundary (Screen Level)
- **Location**: `src/components/ScreenErrorBoundary.tsx`
- **Purpose**: Catches errors within individual screens
- **Usage**: Wraps each screen component in `AppNavigator.tsx`
- **Features**:
  - Screen-specific error handling
  - Preserves navigation state
  - Shows debug info in development mode
  - Custom reset handlers per screen
  - Prevents screen errors from crashing entire app

#### NavigationErrorBoundary (Navigation Specific)
- **Location**: `src/components/NavigationErrorBoundary.tsx`
- **Purpose**: Specialized error handling during active navigation
- **Usage**: Wraps NavigationScreen specifically
- **Features**:
  - Non-disruptive error UI during nap
  - Maintains navigation state during errors
  - Allows continuing navigation after error
  - Minimal UI to avoid waking child

### 2. Error Display Components

#### ErrorDisplay
- **Location**: `src/components/ErrorDisplay.tsx`
- **Purpose**: Full-screen error display with suggestions
- **Features**:
  - User-friendly error messages
  - Actionable suggestions
  - Retry button for retryable errors
  - Dismiss button

#### InlineErrorDisplay
- **Location**: `src/components/ErrorDisplay.tsx`
- **Purpose**: Compact inline error display
- **Features**:
  - Minimal space usage
  - Inline retry button
  - Suitable for form errors

#### RetryableOperation
- **Location**: `src/components/RetryableOperation.tsx`
- **Purpose**: Component wrapper for operations with retry logic
- **Features**:
  - Automatic retry with exponential backoff
  - Loading states
  - Attempt counter
  - Success/error callbacks

### 3. Error Handling Utilities

#### errorHandler.ts
- **Location**: `src/utils/errorHandler.ts`
- **Purpose**: Core error handling functions
- **Functions**:
  - `createAppError()` - Create structured AppError
  - `handleError()` - Convert any error to AppError
  - `logError()` - Log errors with context
  - `getUserFriendlyMessage()` - Get user-facing messages
  - `getSuggestions()` - Get resolution suggestions
  - Error factory functions for common error types

#### globalErrorHandler.ts
- **Location**: `src/utils/globalErrorHandler.ts`
- **Purpose**: Global error management with retry mechanisms
- **Features**:
  - Error listener system
  - Automatic retry with configurable backoff
  - Operation timeout handling
  - Error history tracking
  - Circuit breaker pattern (error rate monitoring)
  - Retry configuration per error type

**Key Functions**:
```typescript
// Execute with automatic retry
await withRetry(
  async () => await apiCall(),
  ErrorType.NETWORK_ERROR,
  'API Call Context'
);

// Execute with timeout
await withTimeout(
  async () => await longOperation(),
  5000,
  'Operation timed out'
);

// Report errors globally
reportError(error, 'Context');

// Subscribe to all errors
const unsubscribe = subscribeToErrors((error) => {
  console.log('Global error:', error);
});
```

#### errorLogger.ts
- **Location**: `src/utils/errorLogger.ts`
- **Purpose**: Error logging and statistics
- **Features**:
  - Structured error logging
  - Error statistics and analytics
  - Error frequency tracking
  - Recurring error detection
  - Log export functionality
  - Automatic log retention management

**Key Functions**:
```typescript
// Log an error
logAppError(error, 'Context', { userId: '123' });

// Get error statistics
const stats = getErrorStats();

// Export logs for debugging
const logsJson = exportErrorLogs();

// Check if error is recurring
const isRecurring = errorLogger.isRecurringError(
  ErrorType.NETWORK_ERROR,
  3, // threshold
  5  // within 5 minutes
);
```

### 4. Specialized Error Handlers

#### routeCalculationErrorHandler.ts
- **Location**: `src/utils/routeCalculationErrorHandler.ts`
- **Purpose**: Handle route calculation specific errors
- **Features**:
  - Nap duration validation
  - Route calculation error suggestions
  - Recommended parameter adjustments

#### locationPermissions.ts
- **Location**: `src/utils/locationPermissions.ts`
- **Purpose**: Handle location permission errors
- **Features**:
  - Permission status checking
  - Permission request with explanation
  - Location services verification
  - User-friendly help messages

#### networkMonitor.ts
- **Location**: `src/utils/networkMonitor.ts`
- **Purpose**: Monitor network connectivity
- **Features**:
  - Real-time network status
  - Connection change notifications
  - Wait for connection helper
  - Network status indicator component

#### operationQueue.ts
- **Location**: `src/utils/operationQueue.ts`
- **Purpose**: Queue operations when offline
- **Features**:
  - Automatic operation queuing
  - Retry when connection restored
  - Operation handlers registration
  - Queue management

## Error Types

All errors in the application use the `ErrorType` enum:

```typescript
enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  LOCATION_PERMISSION_DENIED = 'LOCATION_PERMISSION_DENIED',
  LOCATION_UNAVAILABLE = 'LOCATION_UNAVAILABLE',
  NAP_ROUTE_NOT_FOUND = 'NAP_ROUTE_NOT_FOUND',
  DESTINATION_TOO_FAR = 'DESTINATION_TOO_FAR',
  INVALID_NAP_DURATION = 'INVALID_NAP_DURATION',
  GEOCODING_FAILED = 'GEOCODING_FAILED',
  STORAGE_ERROR = 'STORAGE_ERROR',
  ROUTE_EXTENSION_FAILED = 'ROUTE_EXTENSION_FAILED',
  API_ERROR = 'API_ERROR',
}
```

Each error type has:
- User-friendly message
- Actionable suggestions
- Retry configuration
- Retryable flag

## Usage Examples

### 1. Wrapping a Screen with Error Boundary

```typescript
// In AppNavigator.tsx
const MyScreenWithBoundary = () => (
  <ScreenErrorBoundary 
    screenName="My Screen"
    onReset={() => {
      // Custom reset logic
    }}
  >
    <MyScreen />
  </ScreenErrorBoundary>
);
```

### 2. Using Retryable Operation Hook

```typescript
import { useRetryableOperation } from '../components/RetryableOperation';

function MyComponent() {
  const { execute, isLoading, error, canRetry, retry } = useRetryableOperation(
    async () => {
      await fetchData();
    },
    { maxAttempts: 3, autoRetry: true }
  );

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {error && <InlineErrorDisplay error={error} onRetry={canRetry ? retry : undefined} />}
      <Button onPress={execute} title="Load Data" />
    </View>
  );
}
```

### 3. Handling Errors in Services

```typescript
import { withRetry, reportError } from '../utils/errors';

class MyService {
  async fetchData() {
    try {
      // Automatic retry on network errors
      return await withRetry(
        async () => {
          const response = await fetch(url);
          return response.json();
        },
        ErrorType.NETWORK_ERROR,
        'MyService.fetchData'
      );
    } catch (error) {
      // Report error globally
      const appError = reportError(error, 'MyService.fetchData');
      throw appError;
    }
  }
}
```

### 4. Displaying Errors to Users

```typescript
import { ErrorDisplay } from '../components/ErrorDisplay';

function MyComponent() {
  const [error, setError] = useState<AppError | null>(null);

  const handleOperation = async () => {
    try {
      await riskyOperation();
    } catch (err) {
      setError(err as AppError);
    }
  };

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={error.retryable ? handleOperation : undefined}
        onDismiss={() => setError(null)}
      />
    );
  }

  return <MyContent />;
}
```

### 5. Monitoring Error Rates

```typescript
import { globalErrorHandler } from '../utils/globalErrorHandler';

// Check if error rate is too high (circuit breaker)
if (globalErrorHandler.isErrorRateTooHigh(ErrorType.NETWORK_ERROR, 5, 5)) {
  // Too many network errors in last 5 minutes
  // Show offline mode or cached data
}
```

## Integration Points

### App.tsx
- Root ErrorBoundary wraps entire app
- Network monitor initialization
- Operation queue initialization
- Global error listener setup

### AppNavigator.tsx
- ScreenErrorBoundary wraps each screen
- NavigationErrorBoundary wraps navigation screen
- Preserves navigation state during errors

### Services
- All services use error handling utilities
- Network calls wrapped with retry logic
- Errors converted to AppError format
- Context provided for debugging

### Screens
- Use RetryableOperation for async operations
- Display errors with ErrorDisplay components
- Handle screen-specific error recovery
- Provide user feedback during errors

## Testing Error Handling

### Unit Tests
Test error handling utilities:
```typescript
describe('errorHandler', () => {
  it('creates network error with suggestions', () => {
    const error = createNetworkError();
    expect(error.type).toBe(ErrorType.NETWORK_ERROR);
    expect(error.retryable).toBe(true);
    expect(error.suggestions.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests
Test error boundaries:
```typescript
describe('ScreenErrorBoundary', () => {
  it('catches and displays errors', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    
    const { getByText } = render(
      <ScreenErrorBoundary screenName="Test">
        <ThrowError />
      </ScreenErrorBoundary>
    );
    
    expect(getByText(/Something went wrong/)).toBeTruthy();
  });
});
```

## Best Practices

1. **Always use AppError**: Convert all errors to AppError format for consistency
2. **Provide context**: Include context string when logging errors
3. **User-friendly messages**: Never show technical errors to users
4. **Actionable suggestions**: Always provide suggestions for error resolution
5. **Preserve state**: Don't lose user data during error recovery
6. **Log everything**: Log all errors for debugging and monitoring
7. **Test error paths**: Write tests for error scenarios
8. **Graceful degradation**: Provide fallback functionality when possible
9. **Monitor error rates**: Watch for recurring errors
10. **Non-disruptive during nap**: Minimize UI disruption during navigation

## Requirements Coverage

This implementation satisfies all requirements from task 12.1:

✅ **Create error boundary components**
- Root ErrorBoundary
- ScreenErrorBoundary for each screen
- NavigationErrorBoundary for navigation

✅ **Implement error logging**
- errorLogger service with statistics
- Console logging in development
- Error history tracking
- Log export functionality

✅ **Display user-friendly error messages**
- ErrorDisplay component
- InlineErrorDisplay component
- User-friendly messages for all error types
- Actionable suggestions

✅ **Provide retry mechanisms**
- globalErrorHandler with automatic retry
- RetryableOperation component
- useRetryableOperation hook
- Configurable retry strategies
- Exponential backoff
- Circuit breaker pattern

✅ **Requirements 11.1, 11.2, 11.3, 11.4, 11.5**
- 11.1: Network error handling with offline mode
- 11.2: Route calculation error messages
- 11.3: Retry mechanisms for all retryable errors
- 11.4: Error logging for debugging
- 11.5: App stability maintained during errors

## Conclusion

The global error handling system provides comprehensive error protection across the entire NapRoute application. It ensures a smooth user experience even when errors occur, maintains app stability, and provides developers with detailed error information for debugging and monitoring.
