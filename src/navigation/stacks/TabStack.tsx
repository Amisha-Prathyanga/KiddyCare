// any screen that need to have the bottom tab nav should be here
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import {routeNames} from '../config/routeNames';
import {screenOptions} from '../config/navigationConstants';
import AlertHistory from '../../screens/alertHistory/AlertHistory';
import MarkAttendance from '../../screens/markAttendance/MarkAttendance';
import NewPage from '../../screens/new/NewPage';
import DetectionHistory from '../../screens/detectionHistory/DetectionHistory';
import HomeStack from './HomeStack';
import {stackNames} from '../config/stackNames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name={stackNames.homeStack}
        component={HomeStack}
        //@ts-ignore
        options={{
          ...screenOptions,
          tabBarIcon: ({color, size}) => (
            <Icon size={size} name="home" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={routeNames.markAttendance}
        component={MarkAttendance}
        //@ts-ignore
        options={{
          ...screenOptions,
          tabBarIcon: ({color, size}) => (
            <Icon size={size} name="account-check" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
