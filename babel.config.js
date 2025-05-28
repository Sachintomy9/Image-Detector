module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-worklets-core/plugin',
    // other plugins can go here
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__labelImage'], 
      },
    ],
  ],
}
