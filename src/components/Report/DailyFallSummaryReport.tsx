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

const DailyFallSummaryReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fallData, setFallData] = useState({
    fallCount: 0,
    notificationCount: 0,
    timelineData: [],
    recentDetections: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailySummary = () => {
      const reference = database().ref('kiddycare/fall_detection');

      reference.on('value', snapshot => {
        const fallRecords = snapshot.val();
        if (fallRecords) {
          let fallCount = 0;
          let notificationCount = 0;
          const timelineData = [];
          const recentDetections = [];

          const today = selectedDate.toISOString().split('T')[0];

          Object.values(fallRecords).forEach(data => {
            const recordDate = data.date;
            const fallTime = data.time;

            if (recordDate === today) {
              fallCount += 1;
              if (data.notification_sent) notificationCount += 1;

              recentDetections.push({
                date: recordDate,
                time: fallTime,
                notification_sent: data.notification_sent,
                snapshot_url: data.snapshot_url,
              });

              timelineData.push(fallCount);
            }
          });

          setFallData({
            fallCount,
            notificationCount,
            timelineData,
            recentDetections,
          });
        }
        setLoading(false);
      });

      return () => reference.off('value');
    };

    fetchDailySummary();
  }, [selectedDate]);

  const screenWidth = Dimensions.get('window').width - 40;

  const chartConfig = {
    backgroundColor: theme.white,
    backgroundGradientFrom: theme.white,
    backgroundGradientTo: theme.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(81, 150, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.primary,
    },
    formatYLabel: value => Math.round(value).toString(),
  };

  const lineData = {
    labels: ['Morning', 'Noon', 'Evening', 'Night'],
    datasets: [
      {
        data: fallData.timelineData.map(value => Math.max(0, value)),
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
        <Text style={styles.title}>Daily Fall Report</Text>
        <Text style={styles.date}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <Spacer marginTop={20} />

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : (
          <>
            <View style={[styles.statsCard, { marginBottom: 16 }]}>
              <Text style={styles.statsTitle}>Total Fall Detections</Text>
              <Text style={styles.statsNumber}>{fallData.fallCount}</Text>
            </View>

            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Notifications Sent</Text>
              <Text style={styles.statsNumber}>
                {fallData.notificationCount}
              </Text>
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Detection Timeline</Text>
            <View style={styles.chartContainer}>
              {fallData.timelineData.length > 0 ? (
                <LineChart
                  data={lineData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.lineChart}
                  verticalLabelRotation={30}
                  withInnerLines={false}
                  yAxisInterval={1}
                />
              ) : (
                <Text>No data available for Detection Timeline</Text>
              )}
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Recent Detections</Text>
            {fallData.recentDetections.length > 0 ? (
              fallData.recentDetections.map((detection, index) => (
                <View key={index} style={styles.detectionCard}>
                  <View style={styles.detectionInfo}>
                    <Text style={styles.detectionTime}>
                      Date: {detection.date} - Time: {detection.time}
                    </Text>
                    <Text style={styles.detectionReason}>
                      Notification Sent:{' '}
                      {detection.notification_sent ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  {detection.snapshot_url && (
                    <Image
                      source={{uri: detection.snapshot_url}}
                      style={styles.thumbnail}
                    />
                  )}
                </View>
              ))
            ) : (
              <Text>No recent detections available</Text>
            )}
          </>
        )}

        <Spacer marginTop={30} />
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
  date: {
    ...fontStyles.body,
    color: theme.grey,
    marginTop: 5,
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
  chartContainer: {
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.white,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  detectionCard: {
    flexDirection: 'row',
    backgroundColor: theme.grey,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detectionInfo: {
    flex: 1,
  },
  detectionTime: {
    ...fontStyles.body,
    color: theme.black,
    fontSize: 14,
  },
  detectionReason: {
    ...fontStyles.body,
    color: theme.primary,
    marginTop: 5,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
});

export default DailyFallSummaryReport;
