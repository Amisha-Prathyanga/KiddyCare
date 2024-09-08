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
import {convertTo12HourFormat} from '../../utils/helpers';
const AlertHistory = () => {
  const [fallDetections, setFallDetections] = useState([]);

  useEffect(() => {
    database()
      .ref('/kiddycare/fall_detection')
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
          <DateRow theme={theme} day="Today" />
          {fallDetections.map(data => (
            <View style={styles.alertBox}>
              <AlertRow
                isFall
                viewImageVisible
                time={`${data.date}-${convertTo12HourFormat(data.time)}`}
                onViewImagePress={() => {
                  setModalVisible(true);
                  // console.log(data.image);
                  // setImage(data.image);
                  setImage('https://i.postimg.cc/BbNRBv4G/Picture32.png');
                }}
              />
            </View>
          ))}
        </View>
        <Spacer marginTop={20} />
        <View>
          <DateRow theme={theme} day="Yesterday" />
          {[1, 3, 4, , 5].map(() => (
            <View style={styles.alertBox}>
              <AlertRow time="10:00 am" />
            </View>
          ))}
        </View>
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

export default AlertHistory;

const styles = StyleSheet.create({
  alertBox: {
    width: 350,
    height: 95,
    paddingTop: 21,
    paddingLeft: 25,
    borderBottomWidth: 1,
  },
});
