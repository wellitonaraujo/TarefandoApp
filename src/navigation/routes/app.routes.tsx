import {createStackNavigator} from '@react-navigation/stack';
import NewTask from '../../screens/NewTask';
import colors from '../../styles/colors';
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
      <Stack.Screen
        name="NewTask"
        component={NewTask}
        options={{
          headerTransparent: true,
          headerTitle: '',

          headerBackTitleVisible: false,
          headerTintColor: colors.title,
        }}
      />
    </Stack.Navigator>
  </>
);

export default AppRoutes;
