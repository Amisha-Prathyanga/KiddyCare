import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../thems';
import AlertData from './AlertData';

const History = ({date, alertsArray}) => {
  const formatTime = timestamp => {
    const date = new Date(parseInt(timestamp));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero to minutes if needed
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  return (
    <View style={styles.history}>
      <View style={styles.date}>
        <Text style={styles.text}>{date}</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.alerts}>
        {alertsArray.map((alert, index) => {
          return (
            <AlertData
              key={index}
              type={alert.type}
              time={formatTime(alert.timestamp)}
              image={alert.image}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  history: {
    marginBottom: 30,
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    width: '75%',
    height: 2,
    backgroundColor: colors.primary,
  },
  text: {
    fontWeight: 'bold',
  },
  alerts: {
    marginTop: 20,
  },
});

export default History;
