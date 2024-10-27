import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeNames} from '../config/routeNames';
import LoginScreen from '../../screens/auth/LoginScreen';
import {screenOptions} from '../config/navigationConstants';
import OnboardingScreen from '../../screens/onboarding/OnboardingScreen';
import OnboardingScreenTwo from '../../screens/onboarding/OnboardingScreenTwo';
import HomeScreen from '../../screens/home/HomeScreen';
import DetectionHistory from '../../screens/detectionHistory/DetectionHistory';
import RangeHistory from '../../screens/rangeHistory/RangeHistory';

const HomeStackNavigator = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name={routeNames.homeRoute}
        component={HomeScreen}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <HomeStackNavigator.Screen
        name={routeNames.detectionHistory}
        component={DetectionHistory}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <HomeStackNavigator.Screen
        name={routeNames.rangeHistory}
        component={RangeHistory}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeStack;
