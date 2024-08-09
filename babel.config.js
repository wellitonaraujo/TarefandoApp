module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
     {
      root: ['./'],
      alias: {
        '@': './',
        '@src': './src',
        '@components': './src/components',
        '@navigation': './src/navigation',
        '@screens': './src/screens',
        '@themes': './src/themes',
        '@utils': './src/utils',
        '@assets': './assets',
        '@routes': './src/navigation/routes',
        '@hooks': './src/hooks',
    },
     }
    ]
  ]
};
