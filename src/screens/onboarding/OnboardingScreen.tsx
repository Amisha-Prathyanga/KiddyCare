import {StyleSheet} from 'react-native';
import React from 'react';
import ScrollViewWrapper from '../../components/wrappers/ScrollViewWrapper';
import MainContent from '../../components/features/onBoarding/MainContent';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {routeNames} from '../../navigation/config/routeNames';

const OnboardingScreen: React.FC = () => {
  const navigation = useCustomNavigation();
  return (
    <ScrollViewWrapper>
      <MainContent
        imageSource={require('../../assets/image/SplashOne.png')}
        headerText="Your Child Safety Is Our Priority"
        highlightText="Safety"
        descriptionText="We always provide security in looking after your child."
        buttonTitle="Next"
        onButtonPress={() => {
          navigation.navigate(routeNames.onbaordingRouteTwo);
        }}
        activeIndex={0}
      />
    </ScrollViewWrapper>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
