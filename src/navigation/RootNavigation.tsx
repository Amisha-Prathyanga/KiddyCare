import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {stackNames} from './config/stackNames';
import AuthStack from './stacks/AuthStack';
import TabStack from './stacks/TabStack';
import {screenOptions} from './config/navigationConstants';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';

const RootStackNavigator = createNativeStackNavigator();

const RootNavigation = () => {
  // show hide stacks based on your prefrence(use zustand or mmkv to store prefrence)
  return (
    <RootStackNavigator.Navigator>
      <RootStackNavigator.Group>
        <RootStackNavigator.Screen
          name={stackNames.welcomeStack}
          component={WelcomeScreen}
          //@ts-ignore
          options={screenOptions}
        />
        
        <RootStackNavigator.Screen
          name={stackNames.authStack}
          component={AuthStack}
          //@ts-ignore
          options={screenOptions}
        />
        <RootStackNavigator.Screen
          name={stackNames.tabStack}
          component={TabStack}
          //@ts-ignore
          options={screenOptions}
        />
      </RootStackNavigator.Group>
    </RootStackNavigator.Navigator>
  );
};

export default RootNavigation;
