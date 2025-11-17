import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { NetworkStatusIndicator } from './src/components/NetworkStatusIndicator';
import { AppProvider } from './src/context/AppContext';
import { initializeNetworkMonitor } from './src/utils/networkMonitor';
import { initializeOperationQueue } from './src/utils/operationQueue';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize network monitoring
    const unsubscribeNetwork = initializeNetworkMonitor();
    
    // Initialize operation queue for offline operations
    initializeOperationQueue();
    
    return () => {
      unsubscribeNetwork();
    };
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        <SafeAreaProvider>
          <NetworkStatusIndicator />
          <AppNavigator />
        </SafeAreaProvider>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
