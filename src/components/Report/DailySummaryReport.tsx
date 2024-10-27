// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import {LineChart, PieChart} from 'react-native-chart-kit';
// import Header from '../../components/common/Header';
// import ContentWrap from '../../components/wrappers/ContentWrap';
// import Spacer from '../../components/common/Spacer';
// import {theme} from '../../theme/theme';
// import {fontStyles} from '../../theme/typography';
// import database from '@react-native-firebase/database';

// const DailySummaryReport = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [summaryData, setSummaryData] = useState({
//     cryCount: 0,
//     reasonBreakdown: {},
//     timelineData: [],
//     recentDetections: [],
//   });
//   const [loading, setLoading] = useState(true);

//   // // Mock data - replace with actual Firebase fetch
//   // useEffect(() => {
//   //   const fetchDailySummary = async () => {
//   //     // Simulate fetching data from Firebase
//   //     const mockData = {
//   //       cryCount: 8,
//   //       reasonBreakdown: {
//   //         hungry: 4,
//   //         diaper: 2,
//   //         tired: 1,
//   //         uncomfortable: 1,
//   //       },
//   //       timelineData: [2, 3, 1, 2],
//   //       recentDetections: [
//   //         {
//   //           timestamp: '2024-10-22T12:31:56.910021',
//   //           reason: 'hungry',
//   //           notification_title: 'Infant Cry Detected',
//   //           snapshot_url: 'https://example.com/snapshot.jpg',
//   //         },
//   //       ],
//   //     };
//   //     setSummaryData(mockData);
//   //     setLoading(false); // Set loading to false after data fetch
//   //   };

//   //   fetchDailySummary();
//   // }, [selectedDate]);

//   useEffect(() => {
//     const fetchDailySummary = () => {
//       const reference = database().ref('cry_predictions');

//       // Listening for data changes in 'cry_predictions'
//       reference.on('value', snapshot => {
//         const cryData = snapshot.val();

//         if (cryData) {
//           let cryCount = 0;
//           const reasonBreakdown = {};
//           const timelineData = [];
//           const recentDetections = [];

//           Object.values(cryData).forEach(data => {
//             if (data.is_cry) {
//               cryCount += 1;

//               // Update reason breakdown counts
//               const reason = data.reason || 'unknown';
//               reasonBreakdown[reason] = (reasonBreakdown[reason] || 0) + 1;

//               // Push recent detections for display
//               recentDetections.push({
//                 timestamp: data.timestamp,
//                 reason: data.reason,
//                 notification_title: data.notification_title,
//                 snapshot_url: data.snapshot_url,
//               });

//               // Populate `timelineData` based on custom logic.
//               timelineData.push(cryCount);
//             }
//           });

//           // Set the fetched data
//           setSummaryData({
//             cryCount,
//             reasonBreakdown,
//             timelineData,
//             recentDetections,
//           });
//         }

//         setLoading(false);
//       });

//       // Cleanup the listener on component unmount
//       return () => reference.off('value');
//     };

//     fetchDailySummary();
//   }, [selectedDate]);

//   const screenWidth = Dimensions.get('window').width - 40;

//   const chartConfig = {
//     backgroundColor: theme.white,
//     backgroundGradientFrom: theme.white,
//     backgroundGradientTo: theme.white,
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(81, 150, 246, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '6',
//       strokeWidth: '2',
//       stroke: theme.primary,
//     },
//     formatYLabel: value => Math.round(value).toString(),
//   };

//   const pieData = Object.entries(summaryData.reasonBreakdown).map(
//     ([reason, count], index) => ({
//       name: reason,
//       population: count,
//       color: `hsl(${index * 45}, 70%, 60%)`,
//       legendFontColor: theme.black,
//       legendFontSize: 12,
//     }),
//   );

//   const lineData = {
//     labels: ['Morning', 'Noon', 'Evening', 'Night'],
//     datasets: [
//       {
//         data: summaryData.timelineData.map(value => Math.max(0, value)), // Ensure no negative values
//         color: (opacity = 1) => `rgba(81, 150, 246, ${opacity})`,
//         strokeWidth: 2,
//       },
//     ],
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Header />
//       <ContentWrap paddingLeft={20} paddingRight={20}>
//         <Spacer marginTop={20} />
//         <Text style={styles.title}>Daily Summary Report</Text>
//         <Text style={styles.date}>
//           {selectedDate.toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </Text>

//         <Spacer marginTop={20} />

//         {loading ? (
//           <ActivityIndicator size="large" color={theme.primary} />
//         ) : (
//           <>
//             <View style={styles.statsCard}>
//               <Text style={styles.statsTitle}>Total Cry Detections</Text>
//               <Text style={styles.statsNumber}>{summaryData.cryCount}</Text>
//             </View>

//             <Spacer marginTop={20} />
//             <Text style={styles.sectionTitle}>Cry Reasons Distribution</Text>
//             <View style={styles.chartContainer}>
//               <PieChart
//                 data={pieData}
//                 width={screenWidth}
//                 height={200}
//                 chartConfig={chartConfig}
//                 accessor="population"
//                 backgroundColor="transparent"
//                 paddingLeft="15"
//                 center={[screenWidth / 4, 0]}
//               />
//             </View>

//             <Spacer marginTop={20} />
//             <Text style={styles.sectionTitle}>Detection Timeline</Text>
//             <View style={styles.chartContainer}>
//               <LineChart
//                 data={lineData}
//                 width={screenWidth}
//                 height={220}
//                 chartConfig={chartConfig}
//                 bezier
//                 style={styles.lineChart}
//                 verticalLabelRotation={30}
//                 withInnerLines={false}
//                 yAxisInterval={1}
//               />
//             </View>

//             <Spacer marginTop={20} />
//             <Text style={styles.sectionTitle}>Recent Detections</Text>
//             {summaryData.recentDetections.map((detection, index) => (
//               <View key={index} style={styles.detectionCard}>
//                 <View style={styles.detectionInfo}>
//                   <Text style={styles.detectionTime}>
//                     {new Date(detection.timestamp).toLocaleTimeString()}
//                   </Text>
//                   <Text style={styles.detectionReason}>
//                     Reason: {detection.reason}
//                   </Text>
//                 </View>
//                 {detection.snapshot_url && (
//                   <Image
//                     source={{uri: detection.snapshot_url}}
//                     style={styles.thumbnail}
//                   />
//                 )}
//               </View>
//             ))}
//           </>
//         )}

//         <Spacer marginTop={30} />
//       </ContentWrap>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.white,
//   },
//   title: {
//     ...fontStyles.title,
//     fontSize: 24,
//     color: theme.black,
//   },
//   date: {
//     ...fontStyles.body,
//     color: theme.grey,
//     marginTop: 5,
//   },
//   statsCard: {
//     backgroundColor: theme.primary,
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//   },
//   statsTitle: {
//     ...fontStyles.body,
//     color: theme.white,
//     fontSize: 16,
//   },
//   statsNumber: {
//     ...fontStyles.title,
//     color: theme.white,
//     fontSize: 36,
//     marginTop: 10,
//   },
//   sectionTitle: {
//     ...fontStyles.subTitle,
//     fontSize: 18,
//     color: theme.black,
//     marginBottom: 15,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 8,
//     borderRadius: 16,
//     backgroundColor: theme.white,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   lineChart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   detectionCard: {
//     flexDirection: 'row',
//     backgroundColor: theme.grey,
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 10,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   detectionInfo: {
//     flex: 1,
//   },
//   detectionTime: {
//     ...fontStyles.body,
//     color: theme.black,
//     fontSize: 14,
//   },
//   detectionReason: {
//     ...fontStyles.body,
//     color: theme.primary,
//     marginTop: 5,
//   },
//   thumbnail: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
// });

// export default DailySummaryReport;

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

const DailySummaryReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summaryData, setSummaryData] = useState({
    cryCount: 0,
    reasonBreakdown: {},
    timelineData: [],
    recentDetections: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailySummary = () => {
      const reference = database().ref('kiddycare/cry_predictions');

      // Listening for data changes in 'cry_predictions'
      reference.on('value', snapshot => {
        const cryData = snapshot.val();

        if (cryData) {
          let cryCount = 0;
          const reasonBreakdown = {};
          const timelineData = [];
          const recentDetections = [];

          const today = new Date();
          const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
          const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

          Object.values(cryData).forEach(data => {
            const cryTimestamp = new Date(data.timestamp).getTime(); // Convert timestamp to milliseconds

            if (
              data.is_cry &&
              cryTimestamp >= startOfDay &&
              cryTimestamp <= endOfDay
            ) {
              cryCount += 1;

              // Update reason breakdown counts
              const reason = data.reason || 'unknown';
              reasonBreakdown[reason] = (reasonBreakdown[reason] || 0) + 1;

              // Push recent detections for display
              recentDetections.push({
                timestamp: data.timestamp,
                reason: data.reason,
                notification_title: data.notification_title,
                snapshot_url: data.snapshot_url,
              });

              // Populate `timelineData` based on custom logic.
              timelineData.push(cryCount);
            }
          });

          // Set the fetched data
          setSummaryData({
            cryCount,
            reasonBreakdown,
            timelineData,
            recentDetections,
          });
        }

        setLoading(false);
      });

      // Cleanup the listener on component unmount
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

  const pieData = Object.entries(summaryData.reasonBreakdown).map(
    ([reason, count], index) => ({
      name: reason,
      population: count,
      color: `hsl(${index * 45}, 70%, 60%)`,
      legendFontColor: theme.black,
      legendFontSize: 12,
    }),
  );

  const lineData = {
    labels: ['Morning', 'Noon', 'Evening', 'Night'],
    datasets: [
      {
        data: summaryData.timelineData.map(value => Math.max(0, value)), // Ensure no negative values
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
        <Text style={styles.title}>Daily Summary Report</Text>
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
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Total Cry Detections</Text>
              <Text style={styles.statsNumber}>{summaryData.cryCount}</Text>
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Cry Reasons Distribution</Text>
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
                <Text>No data available for Cry Reasons Distribution</Text>
              )}
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Detection Timeline</Text>
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
                  withInnerLines={false}
                  yAxisInterval={1}
                />
              ) : (
                <Text>No data available for Detection Timeline</Text>
              )}
            </View>

            <Spacer marginTop={20} />
            <Text style={styles.sectionTitle}>Recent Detections</Text>
            {summaryData.recentDetections.length > 0 ? (
              summaryData.recentDetections.map((detection, index) => (
                <View key={index} style={styles.detectionCard}>
                  <View style={styles.detectionInfo}>
                    <Text style={styles.detectionTime}>
                      {new Date(detection.timestamp).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.detectionReason}>
                      Reason: {detection.reason}
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
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 10,
  },
});

export default DailySummaryReport;
