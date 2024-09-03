import {ParamListBase, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import {theme} from '../../theme/theme';
import ContentWrap from '../../components/wrappers/ContentWrap';
import Spacer from '../../components/common/Spacer';
import {fontStyles} from '../../theme/typography';
import TextInputComp from '../../components/common/TextInputComp';
import Row from '../../components/wrappers/Row';
import ButtonComponent from '../../components/common/ButtonComponent';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import {stackNames} from '../../navigation/config/stackNames';
import OutlineButton from '../../components/features/login/OutlineButton';
import auth from '@react-native-firebase/auth';
interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log('ee', email);
    console.log('pwd', password);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        navigation.navigate(stackNames.tabStack);
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <ScrollViewWrapper contentContainerStyle={styles.scrollViewWrapper}>
      <ContentWrap paddingLeft={30} paddingRight={30} paddingTop={30}>
        <TouchableOpacity style={styles.backButton}>
          <Icon
            name={'chevron-left'}
            size={20}
            color={theme.secondaryBlack200}
          />
        </TouchableOpacity>
        <Spacer marginTop={25} />
        <Text style={styles.headerText}>Welcome Back</Text>
        <Spacer marginTop={16} />
        <Text style={styles.descriptionText}>
          Fill in your email and password or continue with social media.
        </Text>
        <Spacer marginTop={40} />

        <TextInputComp
          onChangeText={text => setEmail(text)}
          withLabel
          label="Email"
          leftIcon="mail-outline"
          placeholder="Enter your email address"
        />
        <Spacer marginTop={16} />

        <TextInputComp
          onChangeText={text => setPassword(text)}
          withLabel
          label="Password"
          leftIcon="lock-outline"
          placeholder="Enter your password"
        />
        <Spacer marginTop={16} />

        <Row justifyContent="space-between" style={styles.rememberMeRow}>
          <Text style={styles.rememberMeText}>Remember Me</Text>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Row>
        <Spacer marginTop={40} />

        <View>
          <ButtonComponent
            title="Login"
            customStyle={styles.loginButton}
            onPress={() => login()}
          />
        </View>
        <Spacer marginTop={32} />

        <Row
          justifyContent="space-between"
          alignItems="center"
          style={styles.orRow}>
          <View style={styles.horizontalLine} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.horizontalLine} />
        </Row>
        <Spacer marginTop={21} />
        <Text style={styles.continueWithText}>Continue With</Text>
        <Row
          alignItems="center"
          justifyContent="center"
          style={styles.socialButtonsRow}>
          <OutlineButton
            imageSource={require('../../assets/image/googleICon.png')}
          />
          <OutlineButton
            imageSource={require('../../assets/image/facebookIcon.png')}
          />
        </Row>
      </ContentWrap>
    </ScrollViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    backgroundColor: theme.white,
  } as ViewStyle,
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  } as ViewStyle,
  headerText: {
    ...fontStyles.headerTitle,
    color: theme.black,
    fontWeight: '700',
  } as TextStyle,
  descriptionText: {
    ...fontStyles.description,
    color: theme.secondaryBlack,
  } as TextStyle,
  rememberMeRow: {
    flex: 0,
  } as ViewStyle,
  rememberMeText: {
    ...fontStyles.description,
    color: theme.secondaryBlack,
    fontSize: 14,
  } as TextStyle,
  forgotPasswordText: {
    ...fontStyles.description,
    color: theme.primary,
    fontSize: 14,
  } as TextStyle,
  loginButton: {
    height: 61,
    borderRadius: 10,
  } as ViewStyle,
  orRow: {
    flex: 0,
  } as ViewStyle,
  horizontalLine: {
    borderBottomColor: theme.grey,
    borderBottomWidth: 1,
    width: '45%',
    height: 1,
  } as ViewStyle,
  orText: {
    ...fontStyles.description,
    color: theme.black,
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
  } as TextStyle,
  continueWithText: {
    ...fontStyles.description,
    color: theme.black,
    fontSize: 14,
    textAlign: 'center',
  } as TextStyle,
  socialButtonsRow: {
    gap: 62,
  } as ViewStyle,
});

export default LoginScreen;
