module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@services': './src/services',
          '@repositories': './src/repositories',
          '@types': './src/types',
          '@utils': './src/utils',
          '@components': './src/components',
        },
      },
    ],
  ],
};
