import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, colors, Image, Input} from 'react-native-elements';
import CustomButton from '../../components/attendence/CustomButton';
import CustomInput from '../../components/attendence/CustomInput';
import AttendanceService from '../../service/attendanceService';

const MarkAttendance = () => {
  // Add a state to hold the input value
  const [attendanceCount, setAttendanceCount] = useState('');

  // Handle Add Attendance Function
  const handleAddAttendance = () => {
    const attendanceNumber = Number(attendanceCount);

    if (isNaN(attendanceNumber) || attendanceNumber <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    AttendanceService.markAttendance(attendanceNumber) // Send the input value to Firebase
      .then(() => {
        Alert.alert('Success', 'Attendance added successfully.');
        setAttendanceCount(''); // Clear the input after submission
      })
      .catch(error => {
        Alert.alert('Error', 'Error adding attendance: ' + error.message);
      });
  };

  useEffect(() => {
    // handleAddAttendance();
  }, []);
  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>No of Attendances</Text>
      <Text style={styles.text}>
        Please enter the number of children present today.
      </Text>
      {/* Custom Input for Attendance */}
      <CustomInput
        keyboardType={'numeric'}
        value={attendanceCount} // Controlled input
        onChangeText={text => setAttendanceCount(text)} // Update state
      />
      {/* Custom Button */}
      <CustomButton
        title={'Add Attendance Count'}
        onPress={handleAddAttendance} // Attach the function
      />
    </View>
    <View style={styles.imageWrap}>
      <Image
        style={styles.image}
        source={require('../../assets/image/attendance1.png')}
      />
    </View>
  </View>
);
  
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 35,
    backgroundColor: '#ffff',
    borderColor: colors.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  text: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  image: {
    width: 350,
    height: 350,
  },
});

export default MarkAttendance;
