import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  useEffect(() => {
    messaging()
      .getToken()
      .then(msg => {
        console.log('Meessge', msg);
      });
    messaging().onMessage(res => {
      console.log('m', res);
    });
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
