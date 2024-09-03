import {StyleSheet, Text, View} from 'react-native';
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
              <AlertRow isFall viewImageVisible time={data.time} />
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
