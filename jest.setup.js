// Mock react-native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => React.createElement('MapView'),
    Marker: () => React.createElement('Marker'),
    Polyline: () => React.createElement('Polyline'),
    PROVIDER_DEFAULT: 'default',
  };
});

// Mock geolocation service
jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  requestAuthorization: jest.fn(),
}));
