import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import React from 'react';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export default BottomTab;
