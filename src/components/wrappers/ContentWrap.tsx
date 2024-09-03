import React from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, ViewProps} from 'react-native';

interface ContentWrapProps extends ViewProps {
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  customStyle?: StyleProp<ViewStyle>;
  withFlex?: boolean;
}

const ContentWrap: React.FC<ContentWrapProps> = ({
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
  customStyle,
  withFlex = true,
  children,
  ...viewProps
}) => {
  const containerStyle: StyleProp<ViewStyle> = {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    flex: withFlex ? 1 : 0,
  };

  return (
    <View style={[containerStyle, customStyle]} {...viewProps}>
      {children}
    </View>
  );
};

export default ContentWrap;
