import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import Header from '../../components/common/Header';
import ContentWrap from '../../components/wrappers/ContentWrap';
import Spacer from '../../components/common/Spacer';
import {theme} from '../../theme/theme';
import {fontStyles} from '../../theme/typography';
import database from '@react-native-firebase/database';

const RangeDetectionReport = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [currentKidsCount, setCurrentKidsCount] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchRangeDetectionData = () => {
      const kidsRef = database().ref('kids/count');
      const attendanceRef = database().ref('attendance/count');
      const alertsRef = database().ref('alert');

      // Fetch attendance count
      attendanceRef.on('value', snapshot => {
        setAttendanceCount(snapshot.val() || 0);
      });

      // Fetch current kids count
      kidsRef.on('value', snapshot => {
        setCurrentKidsCount(snapshot.val() || 0);
      });

      // Fetch alerts
      alertsRef.on('value', snapshot => {
        const alertsData = snapshot.val();
        if (alertsData) {
          const alertsList = Object.values(alertsData).map(alert => ({
            id: alert.id || alert.timestamp, // Use timestamp as an ID if not provided
            image: alert.image,
            type: alert.type,
          }));
          setAlerts(alertsList);
        }
      });

      // Sample data for timeline (can be modified as needed)
      setTimelineData([attendanceCount, currentKidsCount]); // Placeholder for timeline data

      setLoading(false);

      // Cleanup listeners on unmount
      return () => {
        kidsRef.off('value');
        attendanceRef.off('value');
        alertsRef.off('value');
      };
    };

    fetchRangeDetectionData();
  }, []);

  const screenWidth = Dimensions.get('window').width - 40;

  const lineData = {
    labels: ['Attendance Count', 'Current Kids Count'],
    datasets: [
      {
        data: [attendanceCount, currentKidsCount],
        color: (opacity = 1) => `rgba(81, 150, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <ContentWrap paddingLeft={20} paddingRight={20}>
        <Spacer marginTop={20} />
        <Text style={styles.title}>Range Detection Report</Text>

        <Spacer marginTop={20} />

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : (
          <>
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Total Attendance Today</Text>
              <Text style={styles.statsNumber}>{attendanceCount}</Text>
            </View>

            <Spacer marginTop={20} />
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Current Kids Count</Text>
              <Text style={styles.statsNumber}>{currentKidsCount}</Text>
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Alerts</Text>
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <View key={alert.id} style={styles.alertCard}>
                  <Text style={styles.alertType}>{alert.type}</Text>
                  {alert.image && (
                    <Image source={{uri: alert.image}} style={styles.alertImage} />
                  )}
                </View>
              ))
            ) : (
              <Text>No alerts available</Text>
            )}

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Timeline Data</Text>
            <View style={styles.chartContainer}>
              {timelineData.length > 0 ? (
                <LineChart
                  data={lineData}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    backgroundColor: theme.white,
                    backgroundGradientFrom: theme.white,
                    backgroundGradientTo: theme.white,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(81, 150, 246, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  bezier
                  style={styles.lineChart}
                  verticalLabelRotation={30}
                  withInnerLines={false}
                  yAxisInterval={1}
                />
              ) : (
                <Text>No timeline data available</Text>
              )}
            </View>

            <Spacer marginTop={30} />
          </>
        )}
      </ContentWrap>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  title: {
    ...fontStyles.title,
    fontSize: 24,
    color: theme.black,
  },
  statsCard: {
    backgroundColor: theme.primary,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statsTitle: {
    ...fontStyles.body,
    color: theme.white,
    fontSize: 16,
  },
  statsNumber: {
    ...fontStyles.title,
    color: theme.white,
    fontSize: 36,
    marginTop: 10,
  },
  sectionTitle: {
    ...fontStyles.subTitle,
    fontSize: 18,
    color: theme.black,
    marginBottom: 15,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: theme.grey,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertType: {
    ...fontStyles.body,
    color: theme.black,
    fontSize: 14,
  },
  alertImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 10,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default RangeDetectionReport;
