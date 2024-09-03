import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {theme} from '../../../theme/theme';

interface OutlineButtonProps {
  onPress?: () => void;
  imageSource: any;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  onPress,
  imageSource,
  style,
  imageStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={imageSource} style={[styles.image, imageStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 68,
    height: 68,
    borderColor: theme.grey,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 32,
    height: 32,
  },
});

export default OutlineButton;
