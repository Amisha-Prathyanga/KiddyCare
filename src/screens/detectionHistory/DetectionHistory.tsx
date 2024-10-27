// import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
// import Header from '../../components/common/Header';
// import ContentWrap from '../../components/wrappers/ContentWrap';
// import Row from '../../components/wrappers/Row';
// import {theme} from '../../theme/theme';
// import {fontStyles} from '../../theme/typography';
// import AlertRow from '../../components/features/home/AlertRow';
// import DateRow from '../../components/features/alertHistory/dateRow';
// import Spacer from '../../components/common/Spacer';
// import database from '@react-native-firebase/database';
// import Modal from 'react-native-modal';
// import {
//   convertISOTo12HourFormat,
//   convertTo12HourFormat,
// } from '../../utils/helpers';

// const DetectionHistory = ({route}: any) => {
//   const [fallDetections, setFallDetections] = useState([]);

//   console.log(route);

//   useEffect(() => {
//     database()
//       .ref(
//         route.params.isRange
//           ? '/alert'
//           : `/kiddycare/${route.params.firebaseDirectory}`,
//       )
//       .on('value', snapshot => {
//         console.log('User data: ', snapshot.val());
//         const array = Object.values(snapshot.val());
//         setFallDetections(() => array);
//       });
//   }, []);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [image, setImage] = useState('');
//   const emotionEmojiMap = {
//     Sad: '😢',
//     Happy: '😊',
//     Angry: '😠',
//     Surprised: '😮',
//     Neutral: '😐',
//     Frustrated: '😤',
//     // Add more mappings as needed
//   };
//   const attentionNeededEmotions = ['Sad', 'Frustrated', 'Angry'];

//   return (
//     <ScrollViewWrapper
//       contentContainerStyle={{
//         backgroundColor: theme.white,
//       }}>
//       <Header />
//       <ContentWrap paddingTop={21} paddingLeft={16} paddingRight={16}>
//         <View>
//           {fallDetections.map((data, index) => {
//             console.log(data.reason);

//             return (
//               <View style={styles.alertBox} key={index}>
//                 <AlertRow
//                   cryReason={data.reason ?? undefined}
//                   isFall={route.params.isFall ?? undefined}
//                   isCry={route.params.isCry ?? undefined}
//                   isACry={data.is_cry ?? undefined}
//                   isEmotion={route.params.isEmotion ?? undefined}
//                   // Display the overall summary's leading emotion
//                   overallEmotionType={
//                     route.params.isEmotion
//                       ? emotionEmojiMap[data.overall_summary?.leading_emotion] +
//                         ` (${data.overall_summary?.leading_emotion})`
//                       : undefined
//                   }
//                   emotionType={undefined} // Removed as we'll handle emotions separately below
//                   isRange={route.params.isRange ?? undefined}
//                   viewImageVisible={!route.params.isEmotion} // Hide image view if emotions are present
//                   time={
//                     data.date !== undefined && data.time !== undefined
//                       ? `${data.date}-${convertTo12HourFormat(data.time)}`
//                       : data.timestamp
//                       ? convertISOTo12HourFormat(data.timestamp)
//                       : ''
//                   }
//                   onViewImagePress={() => {
//                     setModalVisible(true);
//                     setImage(data.snapshot_url);
//                   }}
//                 />

//                 {/* Display emotions with current date and time using emojis */}
//                 {data.summaries?.map((summary, idx) => {
//                   // Get the current date and time
//                   const currentTime = new Date();
//                   // Add 10 seconds for each chunk
//                   currentTime.setSeconds(currentTime.getSeconds() + idx * 10);

//                   // Determine if attention is needed
//                   const isAttentionNeeded = attentionNeededEmotions.includes(
//                     summary.leading_emotion,
//                   );

//                   return (
//                     <View key={idx}>
//                       <Text>
//                         {isAttentionNeeded ? '⚠️ Attention needed! ' : ''}
//                         {currentTime.toLocaleTimeString()} :{' '}
//                         {emotionEmojiMap[summary.leading_emotion] ??
//                           summary.leading_emotion}{' '}
//                         ({summary.leading_emotion})
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             );
//           })}
//         </View>
//         <Spacer marginTop={20} />
//       </ContentWrap>
//       <Modal
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//         useNativeDriver
//         isVisible={modalVisible}
//         onBackdropPress={() => setModalVisible(false)}>
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <View>
//             <Image
//               source={{uri: image}}
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 300,
//                 height: 300,
//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//     </ScrollViewWrapper>
//   );
// };

// export default DetectionHistory;

// const styles = StyleSheet.create({
//   alertBox: {
//     width: 350,
//     height: 95,
//     paddingTop: 21,
//     paddingLeft: 25,
//     borderBottomWidth: 1,
//   },
// });

import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import Header from '../../components/common/Header';
import ContentWrap from '../../components/wrappers/ContentWrap';
import {theme} from '../../theme/theme';
import AlertRow from '../../components/features/home/AlertRow';
import Spacer from '../../components/common/Spacer';
import database from '@react-native-firebase/database';
import Modal from 'react-native-modal';
import {PieChart} from 'react-native-chart-kit';
import {
  convertISOTo12HourFormat,
  convertTo12HourFormat,
} from '../../utils/helpers';

const screenWidth = Dimensions.get('window').width;

const DetectionHistory = ({route}: any) => {
  const [fallDetections, setFallDetections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');

  const emotionEmojiMap = {
    Sad: '😢',
    Happy: '😊',
    Angry: '😠',
    Surprised: '😮',
    Neutral: '😐',
    Frustrated: '😤',
  };

  const attentionNeededEmotions = ['Sad', 'Frustrated', 'Angry'];

  const getDetectionTypeText = () => {
    if (route.params.isFall) return 'Fall Detected';
    if (route.params.isCry) return 'Cry Detected';
    if (route.params.isEmotion) return 'Negative emotion Detected';
    return 'Detection Alert'; // Default fallback
  };

  useEffect(() => {
    database()
      .ref(
        route.params.isRange
          ? '/alert'
          : `/kiddycare/${route.params.firebaseDirectory}`,
      )
      .on('value', snapshot => {
        const array = Object.values(snapshot.val());
        setFallDetections(array);
      });
  }, []);

  const generateEmotionData = summaries => {
    const emotionCounts = summaries.reduce((acc, summary) => {
      acc[summary.leading_emotion] = (acc[summary.leading_emotion] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(emotionCounts).map(emotion => ({
      name: emotion,
      emotionEmoji: emotionEmojiMap[emotion] || '😀',
      population: emotionCounts[emotion],
      color: getEmotionColor(emotion),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));
  };

  const getEmotionColor = emotion => {
    const colorMap = {
      Sad: '#6495ED',
      Happy: '#FFD700',
      Angry: '#FF6347',
      Surprised: '#FF69B4',
      Neutral: '#C0C0C0',
      Frustrated: '#FF8C00',
    };
    return colorMap[emotion] || '#000000';
  };

  const EmotionEntry = ({time, emotion, isAttentionNeeded, summaries}) => (
    <View style={styles.emotionEntry}>
      {isAttentionNeeded && (
        <View style={styles.attentionBadge}>
          <Text style={styles.attentionText}>⚠️ Attention needed!</Text>
        </View>
      )}
      <View style={styles.emotionContent}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.emotionText}>
          {emotionEmojiMap[emotion] ?? emotion} ({emotion})
        </Text>
      </View>

      {isAttentionNeeded && route.params.isEmotion && (
        <PieChart
          data={generateEmotionData(summaries)}
          width={screenWidth * 0.8}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
    </View>
  );

  return (
    <ScrollViewWrapper style={styles.container}>
      <Header />
      <ContentWrap style={styles.content}>
        {fallDetections.map((data, index) => (
          <View style={styles.alertBox} key={index}>
            <View style={styles.headerSection}>
              <Text style={styles.headerText}>{getDetectionTypeText()}</Text>
              {data.timestamp && (
                <Text style={styles.dateText}>
                  {convertISOTo12HourFormat(data.timestamp)}
                </Text>
              )}
            </View>

            <AlertRow
              cryReason={data.reason}
              isFall={route.params.isFall}
              isCry={route.params.isCry}
              isACry={data.is_cry}
              isEmotion={route.params.isEmotion}
              overallEmotionType={
                route.params.isEmotion && data.overall_summary
                  ? `${
                      emotionEmojiMap[data.overall_summary.leading_emotion]
                    } (${data.overall_summary.leading_emotion})`
                  : undefined
              }
              viewImageVisible={!route.params.isEmotion}
              time={
                data.date && data.time
                  ? `${data.date}-${convertTo12HourFormat(data.time)}`
                  : data.timestamp
                  ? convertISOTo12HourFormat(data.timestamp)
                  : ''
              }
              onViewImagePress={() => {
                setModalVisible(true);
                setImage(data.snapshot_url);
              }}
            />

            <View style={styles.emotionsContainer}>
              {data.summaries?.map((summary, idx) => {
                const currentTime = new Date();
                currentTime.setSeconds(currentTime.getSeconds() + idx * 10);
                const isAttentionNeeded = attentionNeededEmotions.includes(
                  summary.leading_emotion,
                );

                return (
                  <EmotionEntry
                    key={idx}
                    time={currentTime.toLocaleTimeString()}
                    emotion={summary.leading_emotion}
                    isAttentionNeeded={isAttentionNeeded}
                    summaries={data.summaries}
                  />
                );
              })}
            </View>
          </View>
        ))}
        <Spacer marginTop={20} />
      </ContentWrap>

      <Modal
        style={styles.modal}
        useNativeDriver
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Image source={{uri: image}} style={styles.modalImage} />
        </View>
      </Modal>
    </ScrollViewWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 21,
  },
  alertBox: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E32636',
  },
  dateText: {
    fontSize: 14,
    color: '#6C757D',
  },
  emotionsContainer: {
    marginTop: 12,
  },
  emotionEntry: {
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emotionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  emotionText: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  attentionBadge: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  attentionText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default DetectionHistory;
