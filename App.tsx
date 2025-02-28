import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'; 

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#181A20', 
  },
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={MyTheme}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#181A20'}
        />
       <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
