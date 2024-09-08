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
import {
  convertISOTo12HourFormat,
  convertTo12HourFormat,
} from '../../utils/helpers';

const DetectionHistory = ({route}: any) => {
  const [fallDetections, setFallDetections] = useState([]);

  console.log(route);

  useEffect(() => {
    database()
      .ref(
        route.params.isRange
          ? '/alert'
          : `/kiddycare/${route.params.firebaseDirectory}`,
      )
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        const array = Object.values(snapshot.val());
        setFallDetections(() => array);
      });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');

  return (
    <ScrollViewWrapper
      contentContainerStyle={{
        backgroundColor: theme.white,
      }}>
      <Header />
      <ContentWrap paddingTop={21} paddingLeft={16} paddingRight={16}>
        <View>
          {fallDetections.map((data, index) => {
            console.log(data.reason);

            return (
              <View style={styles.alertBox} key={index}>
                <AlertRow
                  cryReason={data.reason ?? undefined}
                  isFall={route.params.isFall ?? undefined}
                  isCry={route.params.isCry ?? undefined}
                  isACry={data.is_cry ?? undefined}
                  isEmotion={route.params.isEmotion ?? undefined}
                  isRange={route.params.isRange ?? undefined}
                  viewImageVisible
                  time={
                    data.date !== undefined && data.time !== undefined
                      ? `${data.date}-${convertTo12HourFormat(data.time)}`
                      : data.timestamp
                      ? convertISOTo12HourFormat(data.timestamp)
                      : ''
                  }
                  onViewImagePress={() => {
                    setModalVisible(true);
                    // console.log(data.image);
                    // setImage(data.image);
                    setImage('https://i.postimg.cc/BbNRBv4G/Picture32.png');
                  }}
                />
              </View>
            );
          })}
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
    height: 95,
    paddingTop: 21,
    paddingLeft: 25,
    borderBottomWidth: 1,
  },
});
