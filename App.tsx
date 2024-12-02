import {StatusBar} from 'react-native';
import Home from './src/screens/Home';
import React from 'react';

function App(): React.JSX.Element {
  return (
    <>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#141414'}
        />
       <Home />
    </>
  );
}

export default App;
