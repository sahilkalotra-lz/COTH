module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
};
