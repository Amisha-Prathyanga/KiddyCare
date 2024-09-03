import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import {stackNames} from '../../navigation/config/stackNames';
const WelcomeScreen = () => {
  const videoRef = useRef<VideoRef>(null);
  const background = require('../../assets/video/splash.mp4');
  const navigation = useCustomNavigation();

  return (
    <Video
      fullscreen
      onEnd={() => navigation.navigate(stackNames.authStack)}
      // Can be a URL or a local file.
      source={background}
      // Store reference
      ref={videoRef}
      // Callback when remote video is buffering
      //   onBuffer={onBuffer}
      //   // Callback when video cannot be loaded
      //   onError={onError}
      style={styles.backgroundVideo}
    />
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
