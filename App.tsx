import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#181A20'}
        />
       <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
