import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import TaskDetails from '../screens/TaskDetails';
import colors from '../themes/colors';
import CompletedTasks from '../screens/CompletedTasks';

export type RootStackParamList = {
  Home: undefined;
  TaskDetails: {
    id: string
    name: string;
    date: string;
    subtasks: Subtask[];
  };
  CompletedTasks: undefined;
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
              backgroundColor: colors.backgound,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: colors.white,
          }}
        />
         <Stack.Screen
          name="CompletedTasks"
          component={CompletedTasks}
          options={{
            headerTitle: 'Concluídas',
            headerTitleAlign: 'center', 
            headerStyle: {
              backgroundColor: colors.backgound,
              elevation: 0,
              shadowOpacity: 0,
            
            },
            headerTintColor: colors.white,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
