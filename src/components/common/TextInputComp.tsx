import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  View,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';

interface TextInputCompProps extends TextInputProps {
  customStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  withLabel?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: boolean;
  errorText?: string;
  errorStyle?: StyleProp<TextStyle>;
  leftIcon?: string; // Icon name for the left icon
  rightIcon?: string; // Icon name for the right icon
  onLeftIconPress?: () => void; // Function to handle left icon press
  onRightIconPress?: () => void; // Function to handle right icon press
}

const TextInputComp: React.FC<TextInputCompProps> = ({
  customStyle,
  onChangeText,
  withLabel,
  label,
  labelStyle,
  error,
  errorStyle,
  errorText,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      {withLabel && <Text style={[styles.labelText, labelStyle]}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            style={styles.iconContainer}>
            <Icon name={leftIcon} size={20} color={theme.secondaryBlack200} />
          </TouchableOpacity>
        )}
        <TextInput
          {...textInputProps}
          style={[styles.defaultStyle, customStyle]}
          placeholderTextColor={theme.secondaryBlack200}
          onChangeText={onChangeText}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.iconContainer}>
            <Icon name={rightIcon} size={20} color={theme.secondaryBlack200} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={[styles.errorText, errorStyle]}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  } as ViewStyle,
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'NunitoSans',
    textAlign: 'left',
    color: theme.black,
    marginBottom: 5,
  } as TextStyle,
  errorText: {
    fontFamily: 'NunitoSans',
    fontWeight: '300',
    fontSize: 12,
    textAlign: 'left',
    color: theme.red,
  } as TextStyle,
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: theme.grey,
    borderRadius: 10,
    backgroundColor: theme.white, // Use theme color
    width: '100%',
  } as ViewStyle,
  iconContainer: {
    paddingHorizontal: 10,
  } as ViewStyle,
  defaultStyle: {
    flex: 1,
    height: 53,
    paddingTop: 17,
    paddingBottom: 18,
    paddingLeft: 14,
    color: theme.black,
    backgroundColor: 'transparent', // Make background transparent to show the border color
    borderRadius: 10,
    fontFamily: 'NunitoSans',
  } as TextStyle,
});

export default TextInputComp;
