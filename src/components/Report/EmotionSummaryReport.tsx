import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import Header from '../../components/common/Header';
import ContentWrap from '../../components/wrappers/ContentWrap';
import Spacer from '../../components/common/Spacer';
import {theme} from '../../theme/theme';
import {fontStyles} from '../../theme/typography';
import database from '@react-native-firebase/database';

const EmotionSummaryReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summaryData, setSummaryData] = useState({
    overallSummary: {
      leadingEmotion: '',
      leadingEmotionPercentage: 0,
      emotionPercentages: {},
    },
    timelineData: [],
    detailedSummaries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmotionSummary = () => {
      // Format date for database key (YYYYMMDD)
      const startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);

      const startKey = startDate.toISOString().slice(0, 10).replace(/-/g, '');
      const endKey = endDate.toISOString().slice(0, 10).replace(/-/g, '');

      const reference = database().ref('kiddycare/summaries');

      reference
        .orderByKey()
        .startAt(startKey)
        .endAt(endKey + '_999999') // Include all entries for the selected date
        .once('value')
        .then(snapshot => {
          const data = snapshot.val();

          if (data) {
            // Initialize summary structure
            const dailySummary = {
              overallSummary: {
                leadingEmotion: '',
                leadingEmotionPercentage: 0,
                emotionPercentages: {
                  Angry: 0,
                  Disgust: 0,
                  Fear: 0,
                  Happy: 0,
                  Neutral: 0,
                  Sad: 0,
                  Surprise: 0,
                },
              },
              timelineData: [],
              detailedSummaries: [],
            };

            // Process all summaries for the day
            let summaryCount = 0;
            Object.entries(data).forEach(([timestamp, summary]) => {
              summaryCount++;

              // Update emotion percentages
              if (summary.overall_summary?.cumulative_emotion_percentages) {
                Object.entries(
                  summary.overall_summary.cumulative_emotion_percentages,
                ).forEach(([emotion, percentage]) => {
                  dailySummary.overallSummary.emotionPercentages[emotion] +=
                    percentage;
                });
              }

              // Process detailed summaries
              if (summary.summaries) {
                Object.values(summary.summaries).forEach(detail => {
                  // Extract time from timestamp (YYYYMMDD_HHMMSS)
                  const time = timestamp.split('_')[1];
                  const hour = time ? parseInt(time.substring(0, 2)) : 0;
                  const minute = time ? parseInt(time.substring(2, 4)) : 0;

                  dailySummary.timelineData.push({
                    timeRange: `${hour}:${minute.toString().padStart(2, '0')}`,
                    emotion: detail.leading_emotion,
                    chunkStart: detail.chunk_start,
                    chunkEnd: detail.chunk_end,
                  });

                  // Add to detailed summaries
                  dailySummary.detailedSummaries.push({
                    chunk_start: detail.chunk_start,
                    chunk_end: detail.chunk_end,
                    leading_emotion: detail.leading_emotion,
                  });
                });
              }
            });

            // Average out the emotion percentages
            if (summaryCount > 0) {
              Object.keys(
                dailySummary.overallSummary.emotionPercentages,
              ).forEach(emotion => {
                dailySummary.overallSummary.emotionPercentages[emotion] /=
                  summaryCount;
              });

              // Determine leading emotion
              let maxPercentage = 0;
              Object.entries(
                dailySummary.overallSummary.emotionPercentages,
              ).forEach(([emotion, percentage]) => {
                if (percentage > maxPercentage) {
                  maxPercentage = percentage;
                  dailySummary.overallSummary.leadingEmotion = emotion;
                  dailySummary.overallSummary.leadingEmotionPercentage =
                    percentage;
                }
              });
            }

            // Sort timeline data by time
            dailySummary.timelineData.sort((a, b) => {
              return a.timeRange.localeCompare(b.timeRange);
            });

            setSummaryData(dailySummary);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching emotion data:', error);
          setLoading(false);
        });
    };

    fetchEmotionSummary();
  }, [selectedDate]);

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

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
  };

  // Generate pie chart data from emotion percentages
  const pieData = Object.entries(
    summaryData.overallSummary.emotionPercentages || {},
  )
    .filter(([_, value]) => value > 0)
    .map(([emotion, percentage], index) => ({
      name: emotion,
      population: percentage,
      color: `hsl(${index * 45}, 70%, 60%)`,
      legendFontColor: theme.black,
      legendFontSize: 12,
    }));

  // Generate timeline data
  const lineData = {
    labels: summaryData.timelineData.map(item => item.timeRange),
    datasets: [
      {
        data: summaryData.timelineData.map((_, index) => index + 1),
        color: (opacity = 1) => `rgba(81, 150, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Function to get appropriate emoji for each emotion
  const getEmotionEmoji = emotion => {
    const emojiMap = {
      Happy: '😊',
      Sad: '😢',
      Angry: '😠',
      Fear: '😨',
      Surprise: '😮',
      Disgust: '🤢',
      Neutral: '😐',
    };
    return emojiMap[emotion] || '';
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <ContentWrap paddingLeft={20} paddingRight={20}>
        <Spacer marginTop={20} />
        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={goToPreviousDay} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.dateContainer}>
            <Text style={styles.title}>Emotion Analysis Report</Text>
            <Text style={styles.date}>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <TouchableOpacity onPress={goToNextDay} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        <Spacer marginTop={20} />

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : (
          <>
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Dominant Emotion</Text>
              <Text style={styles.statsNumber}>
                {getEmotionEmoji(summaryData.overallSummary.leadingEmotion)}{' '}
                {summaryData.overallSummary.leadingEmotion}
              </Text>
              <Text style={styles.statsPercentage}>
                {summaryData.overallSummary.leadingEmotionPercentage}%
              </Text>
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Emotion Distribution</Text>
            <View style={styles.chartContainer}>
              {pieData.length > 0 ? (
                <PieChart
                  data={pieData}
                  width={screenWidth}
                  height={200}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  center={[screenWidth / 4, 0]}
                />
              ) : (
                <Text>No emotion data available</Text>
              )}
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Emotion Timeline</Text>
            <View style={styles.chartContainer}>
              {summaryData.timelineData.length > 0 ? (
                <LineChart
                  data={lineData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.lineChart}
                  verticalLabelRotation={30}
                />
              ) : (
                <Text>No timeline data available</Text>
              )}
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Detailed Summaries</Text>
            {summaryData.detailedSummaries.map((summary, index) => (
              <View key={index} style={styles.summaryCard}>
                <Text style={styles.timeRange}>
                  Time Range: {summary.chunk_start}-{summary.chunk_end} minutes
                </Text>
                <Text style={styles.emotion}>
                  {getEmotionEmoji(summary.leading_emotion)}{' '}
                  {summary.leading_emotion}
                </Text>
              </View>
            ))}
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
  statsPercentage: {
    ...fontStyles.body,
    color: theme.white,
    fontSize: 18,
    marginTop: 5,
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
  summaryCard: {
    backgroundColor: theme.grey,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  timeRange: {
    ...fontStyles.body,
    color: theme.black,
    fontSize: 14,
  },
  emotion: {
    ...fontStyles.body,
    color: theme.primary,
    fontSize: 16,
    marginTop: 5,
  },
});

export default EmotionSummaryReport;
