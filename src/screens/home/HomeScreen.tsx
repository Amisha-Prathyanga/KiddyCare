import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import Header from '../../components/common/Header';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import {theme} from '../../theme/theme';
import Spacer from '../../components/common/Spacer';
import {fontStyles} from '../../theme/typography';
import ContentWrap from '../../components/wrappers/ContentWrap';
import AlertRow from '../../components/features/home/AlertRow';
import Row from '../../components/wrappers/Row';
import ButtonComponent from '../../components/common/ButtonComponent';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {routeNames} from '../../navigation/config/routeNames';
import {stackNames} from '../../navigation/config/stackNames';

const HomeScreen = () => {
  const navigation = useCustomNavigation();
  return (
    <ScrollViewWrapper contentContainerStyle={styles.scrollViewWrapper}>
      <Header />
      <ContentWrap paddingLeft={15} paddingRight={15}>
        <Spacer marginTop={28} />
        <Text style={styles.welcomeText}>
          Welcome Back <Text style={styles.welcomeUser}>Yelani!</Text>
        </Text>
        <Spacer marginTop={28} />
        <View style={styles.alertContainer}>
          <ContentWrap paddingLeft={25} paddingTop={25} paddingRight={25}>
            <AlertRow isFall time="10:00 am" />
          </ContentWrap>
        </View>
        <Spacer marginTop={10} />
        <View style={styles.alertContainer}>
          <ContentWrap paddingLeft={25} paddingTop={25} paddingRight={25}>
            <AlertRow isFall={false} time="10:00 am" />
          </ContentWrap>
        </View>
        <Spacer marginTop={60} />
        <Row style={styles.row}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate(routeNames.markAttendance)}>
            <Image
              source={require('../../assets/image/MarkAttendance.png')}
              style={styles.actionImage}
            />
            <Spacer marginTop={10} />
            <Text style={styles.actionText}>Mark Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate(routeNames.alertHistory)}>
            <Image
              source={require('../../assets/image/AlertHistory.png')}
              style={styles.actionImage}
            />
            <Spacer marginTop={10} />
            <Text style={styles.actionText}>Alert History</Text>
          </TouchableOpacity>
        </Row>
        <Spacer marginTop={30} />
        <View>
          <ButtonComponent
            onPress={() =>
              navigation.navigate(stackNames.authStack, {
                screen: routeNames.onbaordingRouteOne,
              })
            }
            title="Log Out"
            customStyle={styles.loginButton}
            // onPress={() => navigation.navigate(stackNames.tabStack)}
          />
        </View>
      </ContentWrap>
    </ScrollViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    backgroundColor: theme.white,
  } as ViewStyle,
  welcomeText: {
    ...fontStyles.subTitle,
    color: theme.black,
    fontSize: 16,
    fontWeight: '500',
  } as TextStyle,
  welcomeUser: {
    color: theme.primary,
  } as TextStyle,
  alertContainer: {
    height: 95,
    backgroundColor: theme.grey,
    borderRadius: 16,
    justifyContent: 'center',
  } as ViewStyle,
  row: {
    justifyContent: 'center',
    gap: 67,
    flex: 0,
  } as ViewStyle,
  actionButton: {
    width: 141,
    height: 161,
    borderColor: theme.actionBlue,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  actionImage: {
    width: 100,
    height: 100,
  } as ImageStyle,
  actionText: {
    ...fontStyles.subTitle,
    color: theme.black,
    fontSize: 12,
    fontWeight: '700',
  } as TextStyle,
  loginButton: {
    height: 61,
    borderRadius: 10,
  } as ViewStyle,
});

export default HomeScreen;
