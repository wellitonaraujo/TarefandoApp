import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import  { TaskProvider } from "./src/context/TaskContext" 

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1A1A2F',
  },
};

function App(): React.JSX.Element {
  return (
    <>
     <TaskProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#1A1A2F'} />
        <AppNavigator />
      </NavigationContainer>

      <Toast />
      </TaskProvider>
    </>
  );
}

export default App;
