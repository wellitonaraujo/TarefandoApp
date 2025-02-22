import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import TaskDetails from '../screens/TaskDetails';

export type RootStackParamList = {
  Home: undefined;
  TaskDetails: {
    id: string
    name: string;
    date: string;
    subtasks: Subtask[];
  };
};

type Subtask = {
  id: string;
  name: string;
  completed: boolean;
};


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
           headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#181A20',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: '#D9D9D9',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
