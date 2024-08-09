import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import React from 'react';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    
    </Stack.Navigator>
  </>
);

export default AppRoutes;
