import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import Header from '../../components/common/Header';
import ContentWrap from '../../components/wrappers/ContentWrap';
import {theme} from '../../theme/theme';
import ButtonComponent from '../../components/common/ButtonComponent';
import Spacer from '../../components/common/Spacer';
import {fontStyles} from '../../theme/typography';

const MarkAttendance = () => {
  return (
    <ScrollViewWrapper contentContainerStyle={styles.scrollViewContainer}>
      <Header
        style={{
          width: '100%',
        }}
      />
      <Spacer marginTop={20} />
      <ContentWrap paddingLeft={16} paddingRight={16}>
        <View style={styles.attendanceCard}>
          <Text style={[fontStyles.headerTitle, styles.headerText]}>
            No of Attendances
          </Text>
          <Spacer marginTop={10} />
          <Text style={[fontStyles.description, styles.descriptionText]}>
            Please enter the number of children present today.
          </Text>
          <Spacer marginTop={32} />
          <TextInput style={styles.textInput} />
          <Spacer marginTop={32} />
          <ButtonComponent
            title="Add Attendance Count"
            textStyle={styles.buttonText}
            customStyle={styles.button}
          />
        </View>

        <Spacer marginTop={18} />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/image/GirlWithTeddy.png')}
            style={styles.image}
          />
        </View>
      </ContentWrap>
    </ScrollViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: theme.white,
    alignItems: 'center',
  },
  attendanceCard: {
    width: 350,
    height: 370,
    backgroundColor: theme.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  headerText: {
    fontSize: 18,
    color: theme.primary,
  },
  descriptionText: {
    fontSize: 12,
    color: theme.secondaryBlack,
  },
  textInput: {
    width: 232,
    height: 60,
    backgroundColor: '#C9E4FC',
    color: theme.black,
  },
  buttonText: {
    fontSize: 13,
    color: theme.white,
  },
  button: {
    width: 199,
    height: 42,
  },
  imageContainer: {
    alignItems: 'flex-end',
  },
  image: {
    width: 300,
    height: 230,
  },
});

export default MarkAttendance;
