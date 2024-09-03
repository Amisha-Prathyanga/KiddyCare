import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import MainContent from '../../components/features/onBoarding/MainContent';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {stackNames} from '../../navigation/config/stackNames';
import {routeNames} from '../../navigation/config/routeNames';

const OnboardingScreenTwo: React.FC = () => {
  const navigation = useCustomNavigation();
  return (
    <ScrollViewWrapper>
      <MainContent
        imageSource={require('../../assets/image/SplashTwo.png')}
        headerText="Trust Your Child With Us"
        highlightText="Child"
        descriptionText="We always provide security in looking after your child."
        buttonTitle="Next"
        onButtonPress={() => {
          navigation.navigate(routeNames.loginRoute);
        }}
        activeIndex={1}
      />
    </ScrollViewWrapper>
  );
};

export default OnboardingScreenTwo;

const styles = StyleSheet.create({});
