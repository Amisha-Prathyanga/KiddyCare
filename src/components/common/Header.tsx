import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import {theme} from '../../theme/theme';

interface ElevatedHeaderProps {
  style?: ViewStyle;
}

const Header: React.FC<ElevatedHeaderProps> = ({style}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <Image
        style={{
          width: 144,
          height: 30,
        }}
        source={require('../../assets/image/KidzCareBanner.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.white, // Background color of the header
    paddingVertical: 15, // Padding for vertical space
    paddingHorizontal: 20, // Padding for horizontal space
    borderBottomWidth: 1, // Border width for the bottom border
    borderBottomColor: theme.grey, // Border color for the bottom border
    // Shadow properties for iOS
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.black,
  } as TextStyle,
});

export default Header;
