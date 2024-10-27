import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
let lastAlertTimestamp = 0;
const AlertService = {
  getAlerts: async () => {
    try {
      const snapshot = await database()
        .ref('/alert')
        .orderByKey()
        .limitToLast(100)
        .once('value');
      if (snapshot.exists()) {
        const alerts = snapshot.val();
        console.log('All  alerts:', alerts);
        return alerts;
      } else {
        console.log('No alerts  found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return null;
    }
  },

  getAlertsByDate: async date => {
    try {
      const snapshot = await database()
        .ref('/alert')
        .orderByChild('date')
        .equalTo(date)
        .once('value');
      if (snapshot.exists()) {
        const alerts = snapshot.val();
        console.log(`Alerts for ${date}:`, alerts);
        return alerts;
      } else {
        console.log(`No alerts found for ${date}.`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching alerts for ${date}:`, error);
      return null;
    }
  },

  saveAlert: async type => {
    console.log('Save Alert call');
    const timestamp = Date.now();
    try {
      const databaseRef = database().ref(`/alert/${timestamp}`);
      await databaseRef.set({type: type});
      databaseRef.off();

      // console.log('Alert saved successfully:', type);
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  },

  // saveAlert: async type => {
  //   console.log('Save Alert call');
  //   const timestamp = Date.now();
  //   try {
  //     const alertRef = firestore().collection('alerts').doc(`${timestamp}`);

  //     await alertRef.set({
  //       type: type,
  //       timestamp: timestamp, // You can also store the timestamp if needed
  //     });

  //     // console.log('Alert saved successfully:', type);
  //   } catch (error) {
  //     console.error('Error saving alert:', error);
  //   }
  // },
};

export default AlertService;