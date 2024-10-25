import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import Header from '../../components/common/Header';
import ContentWrap from '../../components/wrappers/ContentWrap';
import Row from '../../components/wrappers/Row';
import {theme} from '../../theme/theme';
import {fontStyles} from '../../theme/typography';
import AlertRow from '../../components/features/home/AlertRow';
import DateRow from '../../components/features/alertHistory/dateRow';
import Spacer from '../../components/common/Spacer';
import database from '@react-native-firebase/database';
import Modal from 'react-native-modal';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {
  convertISOTo12HourFormat,
  convertTo12HourFormat,
} from '../../utils/helpers';

const screenWidth = Dimensions.get('window').width;

const DetectionHistory = ({route}: any) => {
  const [fallDetections, setFallDetections] = useState([]);

  useEffect(() => {
    database()
      .ref(
        route.params.isRange
          ? '/alert'
          : `/kiddycare/${route.params.firebaseDirectory}`,
      )
      .on('value', snapshot => {
        const array = Object.values(snapshot.val());
        setFallDetections(() => array);
      });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const emotionColorMap = {
    Sad: '#FF6B6B',
    Happy: '#4CAF50',
    Angry: '#FF8A65',
    Surprised: '#FFEB3B',
    Neutral: '#9E9E9E',
    Frustrated: '#FF5722',
  };

  const emotionEmojiMap = {
    Sad: '😢',
    Happy: '😊',
    Angry: '😠',
    Surprised: '😮',
    Neutral: '😐',
    Frustrated: '😤',
  };

  return (
    <ScrollViewWrapper
      contentContainerStyle={{
        backgroundColor: theme.white,
      }}>
      <Header />
      <ContentWrap paddingTop={21} paddingLeft={16} paddingRight={16}>
        <View>
          {fallDetections.map((data, index) => (
            <View style={styles.alertBox} key={index}>
              <AlertRow
                cryReason={data.reason ?? undefined}
                isFall={route.params.isFall ?? undefined}
                isCry={route.params.isCry ?? undefined}
                isACry={data.is_cry ?? undefined}
                isEmotion={route.params.isEmotion ?? undefined}
                overallEmotionType={
                  route.params.isEmotion
                    ? emotionEmojiMap[data.overall_summary?.leading_emotion] +
                      ` (${data.overall_summary?.leading_emotion})`
                    : undefined
                }
                isRange={route.params.isRange ?? undefined}
                viewImageVisible={!route.params.isEmotion}
                time={
                  data.date !== undefined && data.time !== undefined
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

              {/* Display pie chart for each emotion summary */}
              {data.summaries?.map((summary, idx) => {
                // Create pie chart data with emotion percentage
                const chartData = summary.emotions.map(emotion => ({
                  name: `${emotion.type} (${
                    emotionEmojiMap[emotion.type] ?? ''
                  })`,
                  population: emotion.percentage,
                  color: emotionColorMap[emotion.type] || '#000000',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 12,
                }));

                return (
                  <View key={idx} style={{alignItems: 'center', marginTop: 10}}>
                    <Text style={{marginBottom: 10}}>
                      {convertISOTo12HourFormat(summary.timestamp)}
                    </Text>
                    <PieChart
                      data={chartData}
                      width={screenWidth * 0.8}
                      height={150}
                      chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      }}
                      accessor={'population'}
                      backgroundColor={'transparent'}
                      paddingLeft={'15'}
                      absolute
                    />
                  </View>
                );
              })}
            </View>
          ))}
        </View>
        <Spacer marginTop={20} />
      </ContentWrap>
      <Modal
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        useNativeDriver
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Image
              source={{uri: image}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 300,
                height: 300,
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollViewWrapper>
  );
};

export default DetectionHistory;

const styles = StyleSheet.create({
  alertBox: {
    width: 350,
    height: 150,
    paddingTop: 21,
    paddingLeft: 25,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});
