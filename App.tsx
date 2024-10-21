import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  useEffect(() => {
    messaging()
      .getToken()
      .then(msg => {
        console.log('Meessge', msg);
      });
  }, []);
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

export default App;
