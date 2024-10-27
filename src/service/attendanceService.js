import database from '@react-native-firebase/database';

const AttendanceService = {
  markAttendance: async count => {
    try {
      // const timestamp = Date.now();
      // // Get the current date and time
      // const currentDate = new Date();
      // // Get the current year
      // const year = currentDate.getFullYear();
      // // Get the current month (0-11, so we add 1 to get the correct month number)
      // const month = currentDate.getMonth() + 1;
      // // Get the current day of the month
      // const day = currentDate.getDate();
      // // Format the date as YYYY-MM-DD
      // const formattedDate = `${year}-${month}-${day}`;
      // await database().ref(`/attendance/${formattedDate}`).set({count: count});
      await database().ref(`/attendance`).set({count: count});
      console.log('User added successfully.');
    } catch (error) {
      console.log(error);
    }
  },

  getAttendanceCount: async () => {
    try {
      // const timestamp = Date.now();
      // // Get the current date and time
      // const currentDate = new Date();
      // // Get the current year
      // const year = currentDate.getFullYear();
      // // Get the current month (0-11, so we add 1 to get the correct month number)
      // const month = currentDate.getMonth() + 1;
      // // Get the current day of the month
      // const day = currentDate.getDate();
      // // Format the date as YYYY-MM-DD
      // const formattedDate = `${year}-${month}-${day}`;

      // // Retrieve attendance count for the current date
      // const snapshot = await database()
      //   .ref(`/attendance/${formattedDate}`)
      //   .once('value');

      const snapshot = await database().ref(`/attendance`).once('value');

      if (snapshot.exists()) {
        const data = snapshot.val();
        return data.count; // Return the count value
      } else {
        console.log(`No data found`);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getKidsCount: async () => {
    try {
      // const timestamp = Date.now();
      // // Get the current date and time
      // const currentDate = new Date();
      // // Get the current year
      // const year = currentDate.getFullYear();
      // // Get the current month (0-11, so we add 1 to get the correct month number)
      // const month = currentDate.getMonth() + 1;
      // // Get the current day of the month
      // const day = currentDate.getDate();
      // // Format the date as YYYY-MM-DD
      // const formattedDate = `${year}-${month}-${day}`;

      // // Retrieve attendance count for the current date
      // const snapshot = await database()
      //   .ref(`/attendance/${formattedDate}`)
      //   .once('value');

      const snapshot = await database().ref(`/kids`).once('value');

      if (snapshot.exists()) {
        const data = snapshot.val();
        return data.count; // Return the count value
      } else {
        console.log(`No data found`);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getKidsCountListener: callback => {
    try {
      const attendanceRef = database().ref(`/kids`);

      // Listen for value changes
      const onValueChange = snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          callback(data.count); // Invoke the callback with the new count value
        } else {
          console.log(`No data found`);
          callback(null); // Invoke the callback with null if no data is found
        }
      };

      // Attach the listener
      // attendanceRef.on('value', onValueChange);
      attendanceRef.on('value', onValueChange);

      // Return a function to unsubscribe from the listener when no longer needed
      return () => {
        attendanceRef.off('value', onValueChange);
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAttendanceCountListener: callback => {
    try {
      const attendanceRef = database().ref(`/attendance`);

      // Listen for value changes
      const onValueChange = snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          callback(data.count); // Invoke the callback with the new count value
        } else {
          console.log(`No data found`);
          callback(null); // Invoke the callback with null if no data is found
        }
      };

      // Attach the listener
      attendanceRef.on('value', onValueChange);

      // Return a function to unsubscribe from the listener when no longer needed
      return () => {
        attendanceRef.off('value', onValueChange);
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default AttendanceService;