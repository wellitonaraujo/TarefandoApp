import {NavigationContainer} from '@react-navigation/native';
import {TaskProvider} from './src/context/TaskContext';
import {theme} from './src/theme/default_theme';
import Routes from './src/navigation/routes';
import colors from './src/styles/colors';
import {StatusBar} from 'react-native';
import React from 'react';


function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer theme={theme}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.card}
        />
        <Routes />
      </NavigationContainer>
    </>
  );
}

export default App;
