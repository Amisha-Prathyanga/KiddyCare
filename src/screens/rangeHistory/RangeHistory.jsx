import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import History from '../../components/attendence/History';
import {ScrollView} from 'react-native-gesture-handler';
import AlertService from '../../service/alertService';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../../components/attendence/Loading';

const RangeHistory = () => {
  const isFocused = useIsFocused();
  const [alerts, setAlerts] = useState(null); // Initialize as empty object

  const handlealert = async () => {
    try {
      const result = await AlertService.getAlerts();
      console.log('Raw Alerts Data:', result);

      const formatDate = date => date.toISOString().split('T')[0];
      const categorizedData = {};

      Object.keys(result).forEach(timestamp => {
        const date = new Date(parseInt(timestamp));
        const dateString = formatDate(date);

        if (!categorizedData[dateString]) {
          categorizedData[dateString] = [];
        }

        categorizedData[dateString].push({timestamp, ...result[timestamp]});
      });

      setAlerts(categorizedData);
      console.log('Categorized Alerts Data:', categorizedData);
    } catch (error) {
      console.log('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handlealert();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {alerts === null ? (
        <Loading />
      ) : Object.entries(alerts).length === 0 ? (
        <Text>No alerts available.</Text>
      ) : (
        Object.entries(alerts).map(([date, alertsArray]) => (
          <History key={date} date={date} alertsArray={alertsArray} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  alertSection: {
    marginBottom: 16,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default RangeHistory;