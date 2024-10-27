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
import DailySummaryReport from '../../components/Report/DailySummaryReport';
import DailyFallSummaryReport from '../../components/Report/DailyFallSummaryReport';
import EmotionSummaryReport from './../../components/Report/EmotionSummaryReport';
import ReportNavigationPage from './../../screens/reportNav/ReportNavigationPage';
import RangeDetectionReport from '../../components/Report/RangeDetectionReport';

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
        name={routeNames.reportNavigationPage}
        component={ReportNavigationPage}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <HomeStackNavigator.Screen
        name={routeNames.dailySummaryReport}
        component={DailySummaryReport}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <HomeStackNavigator.Screen
        name={routeNames.dailyFallSummaryReport}
        component={DailyFallSummaryReport}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <HomeStackNavigator.Screen
        name={routeNames.emotionSummaryReport}
        component={EmotionSummaryReport}
        //@ts-ignore
        options={{
          ...screenOptions,
          animation: 'slide_from_right',
        }}
      />
      <HomeStackNavigator.Screen
        name={routeNames.rangeDetectionReport}
        component={RangeDetectionReport}
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
