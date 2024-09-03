// any screen that need to have the bottom tab nav should be here
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import {routeNames} from '../config/routeNames';
import {screenOptions} from '../config/navigationConstants';
import AlertHistory from '../../screens/alertHistory/AlertHistory';
import MarkAttendance from '../../screens/markAttendance/MarkAttendance';
import NewPage from '../../screens/new/NewPage';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routeNames.homeRoute}
        component={HomeScreen}
        //@ts-ignore
        options={screenOptions}
      />
      <Tab.Screen
        name={routeNames.alertHistory}
        component={AlertHistory}
        //@ts-ignore
        options={screenOptions}
      />
      <Tab.Screen
        name={routeNames.markAttendance}
        component={MarkAttendance}
        //@ts-ignore
        options={screenOptions}
      />
      <Tab.Screen
        name={routeNames.newPage}
        component={NewPage}
        //@ts-ignore
        options={screenOptions}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
