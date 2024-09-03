import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {theme} from '../../theme/theme';

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  customStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// Define default styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    color: theme.white,
    fontFamily: 'NunitoSans',
    fontSize: 18,
  } as TextStyle,
});

export default ButtonComponent;
