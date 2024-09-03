import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeNames} from '../config/routeNames';
import LoginScreen from '../../screens/auth/LoginScreen';
import {screenOptions} from '../config/navigationConstants';
import OnboardingScreen from '../../screens/onboarding/OnboardingScreen';
import OnboardingScreenTwo from '../../screens/onboarding/OnboardingScreenTwo';

const AuthStackNavigator = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name={routeNames.onbaordingRouteOne}
        component={OnboardingScreen}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <AuthStackNavigator.Screen
        name={routeNames.onbaordingRouteTwo}
        component={OnboardingScreenTwo}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <AuthStackNavigator.Screen
        name={routeNames.loginRoute}
        component={LoginScreen}
        //@ts-ignore
        options={screenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
