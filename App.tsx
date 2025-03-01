import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#181A20',
  },
};

function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A20'} />
        <AppNavigator />
      </NavigationContainer>

      <Toast />
    </>
  );
}

export default App;
