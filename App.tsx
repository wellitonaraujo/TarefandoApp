/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/navigation/routes';
import colors from './src/styles/colors';
import {StatusBar} from 'react-native';
import React from 'react';
import Home from './src/screens/Home';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <Home />
    </NavigationContainer>
  );
}

export default App;
