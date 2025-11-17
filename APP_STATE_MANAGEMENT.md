# App State Management

## Overview

NapRoute uses React Context API with useReducer for global state management. The state is persisted to AsyncStorage and automatically restored when the app restarts. The system also handles app backgrounding during navigation to ensure navigation sessions are preserved.

## Architecture

### AppContext Structure

```
AppProvider (Context Provider)
├── State Management (useReducer)
├── State Persistence (AsyncStorage)
├── App Lifecycle Handling (AppState)
└── Helper Functions
```

## Global State

The app maintains the following global state:

### User Preferences
- `preferences`: Route preferences (scenic, quiet, highway, balanced)
- `defaultNapDuration`: Default nap duration in minutes (default: 60)
- `notificationAdvanceTime`: Minutes before nap end to show warning (default: 5)

### Navigation State
- `activeNavigation`: Current navigation session (null when not navigating)
- `isNavigating`: Boolean flag indicating active navigation

### App State
- `isOnline`: Network connectivity status
- `appState`: Current app state (active, background, inactive)

### UI State
- `hasSeenOnboarding`: Whether user has completed onboarding
- `lastKnownLocation`: Last known user location

## Usage

### Basic Usage

```typescript
import { useAppContext, useAppState } from './context/AppContext';

// In a component that needs to read and update state
function MyComponent() {
  const { state, setPreferences, startNavigation } = useAppContext();
  
  // Use state and helper functions
  const handleStart = () => {
    startNavigation(navigationSession);
  };
}

// In a component that only needs to read state
function DisplayComponent() {
  const state = useAppState();
  
  return <Text>{state.defaultNapDuration} minutes</Text>;
}
```

### Available Helper Functions

#### Preferences
```typescript
setPreferences(preferences: RoutePreferences): void
setDefaultNapDuration(duration: number): void
setNotificationAdvanceTime(minutes: number): void
```

#### Navigation
```typescript
startNavigation(session: NavigationSession): void
updateNavigation(updates: Partial<NavigationSession>): void
stopNavigation(): Promise<void>
```

#### App State
```typescript
setOnlineStatus(isOnline: boolean): void
setLastKnownLocation(location: { latitude: number; longitude: number } | null): void
```

## State Persistence

### Automatic Persistence

The following state is automatically persisted to AsyncStorage:
- User preferences
- Default nap duration
- Notification advance time
- Onboarding completion status
- Last known location
- Active navigation session (when backgrounding)

### Storage Keys

```typescript
const STORAGE_KEYS = {
  PREFERENCES: '@naproute:preferences',
  DEFAULT_NAP_DURATION: '@naproute:defaultNapDuration',
  NOTIFICATION_ADVANCE_TIME: '@naproute:notificationAdvanceTime',
  ONBOARDING_COMPLETE: '@naproute:onboardingComplete',
  LAST_KNOWN_LOCATION: '@naproute:lastKnownLocation',
  ACTIVE_NAVIGATION: '@naproute:activeNavigation',
};
```

### Persistence Behavior

1. **On Mount**: All persisted state is loaded from AsyncStorage
2. **On State Change**: Changes are automatically persisted
3. **On Background**: Active navigation is persisted to prevent data loss
4. **On Foreground**: Navigation state is already in memory and continues

## App Backgrounding

### Navigation Preservation

When the app goes to background during active navigation:

1. The current navigation session is persisted to AsyncStorage
2. App state is updated to 'background'
3. Navigation continues in memory (location tracking continues via background mode)

When the app returns to foreground:

1. App state is updated to 'active'
2. Navigation session is already in memory
3. UI updates to reflect current navigation state

### Implementation

```typescript
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    dispatch({ type: 'SET_APP_STATE', payload: nextAppState });
    
    // Persist navigation when backgrounding
    if (nextAppState === 'background' && state.isNavigating) {
      persistNavigationState();
    }
    
    // Log when returning to foreground during navigation
    if (nextAppState === 'active' && state.isNavigating) {
      console.log('App returned to foreground during navigation');
    }
  });

  return () => subscription.remove();
}, [state.isNavigating]);
```

## Error Handling

### Storage Errors

All AsyncStorage operations are wrapped in try-catch blocks:

```typescript
try {
  await AsyncStorage.setItem(key, value);
} catch (error) {
  console.error('Failed to persist state:', error);
  // App continues to function with in-memory state
}
```

### Recovery Strategy

- If loading state fails: Use default initial state
- If persisting state fails: Continue with in-memory state
- Errors are logged but don't crash the app
- Critical navigation state is prioritized for persistence

## Performance Considerations

### Optimizations

1. **Selective Persistence**: Only changed state is persisted
2. **Batched Updates**: Multiple state changes are batched in useEffect
3. **Debouncing**: Rapid state changes don't trigger multiple storage writes
4. **Lazy Loading**: State is loaded once on mount, not on every render

### Memory Management

- Navigation sessions are cleared from storage when navigation stops
- Old location data is overwritten, not accumulated
- State structure is kept minimal to reduce memory footprint

## Testing

### Test Coverage

The AppContext has comprehensive test coverage including:

- Initial state verification
- State persistence and restoration
- Navigation state management
- App backgrounding behavior
- Online status updates
- Error handling
- Hook usage validation

### Running Tests

```bash
npm test -- AppContext.test.tsx
```

## Integration with Other Systems

### Network Monitor

The network monitor updates online status via `setOnlineStatus()`:

```typescript
import { useAppContext } from './context/AppContext';

const { setOnlineStatus } = useAppContext();

NetInfo.addEventListener(state => {
  setOnlineStatus(state.isConnected ?? false);
});
```

### Navigation Service

Navigation service uses the context to manage navigation state:

```typescript
import { useAppContext } from './context/AppContext';

const { startNavigation, updateNavigation, stopNavigation } = useAppContext();

// Start navigation
startNavigation(navigationSession);

// Update progress
updateNavigation({ currentInstructionIndex: 2, distanceTraveled: 5000 });

// Stop navigation
await stopNavigation();
```

### Location Service

Location service updates last known location:

```typescript
import { useAppContext } from './context/AppContext';

const { setLastKnownLocation } = useAppContext();

locationService.watchLocation((location) => {
  setLastKnownLocation(location);
});
```

## Best Practices

### Do's

✅ Use `useAppState()` for read-only access to state
✅ Use `useAppContext()` when you need to update state
✅ Use helper functions instead of dispatching actions directly
✅ Keep state minimal and focused on global concerns
✅ Test components that use context with proper wrapper

### Don'ts

❌ Don't store large data structures in global state
❌ Don't use context for frequently changing local state
❌ Don't dispatch actions directly (use helper functions)
❌ Don't forget to wrap test components with AppProvider
❌ Don't store sensitive data without encryption

## Future Enhancements

### Potential Improvements

1. **State Migration**: Handle schema changes when updating app versions
2. **Encryption**: Encrypt sensitive data in AsyncStorage
3. **Cloud Sync**: Sync state across devices (Phase 3)
4. **State Debugging**: Add Redux DevTools integration for debugging
5. **Performance Monitoring**: Track state update performance
6. **Selective Hydration**: Load only necessary state on startup

## Troubleshooting

### Common Issues

**Issue**: State not persisting
- **Solution**: Check AsyncStorage permissions and available storage space

**Issue**: Navigation lost after app restart
- **Solution**: Verify navigation state is being persisted on background

**Issue**: State updates not reflecting in UI
- **Solution**: Ensure component is wrapped in AppProvider and using hooks correctly

**Issue**: Memory leaks
- **Solution**: Verify AppState listener is properly cleaned up in useEffect

## Related Files

- `src/context/AppContext.tsx` - Main context implementation
- `src/context/__tests__/AppContext.test.tsx` - Test suite
- `App.tsx` - Context provider setup
- `src/utils/networkMonitor.ts` - Network status integration
- `src/services/NavigationService.ts` - Navigation state integration
