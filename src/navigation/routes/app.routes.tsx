import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab.routes';

import React from 'react';

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitle: '',
      headerBackTitleVisible: false,
    }}>
    <Stack.Screen name="BottomTab" component={BottomTab} />
  </Stack.Navigator>
);

export default AppRoutes;
