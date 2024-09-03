import React from 'react';
import {View, ViewStyle, StyleSheet, ViewProps} from 'react-native';

interface LayoutProps {
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  // Add more layout props as needed
}

interface RowProps extends ViewProps, LayoutProps {
  style?: ViewStyle;
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  alignItems,
  justifyContent,
  ...props
}) => {
  const dynamicStyle: ViewStyle = {
    alignItems,
    justifyContent,
    flexDirection: 'row',
  };

  return (
    <View style={[styles.row, dynamicStyle, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
});

export default Row;
