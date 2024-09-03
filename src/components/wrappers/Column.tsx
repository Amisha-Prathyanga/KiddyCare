import React from 'react';
import {View, ViewStyle, StyleSheet, ViewProps} from 'react-native';

interface LayoutProps {
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
}

interface ColumnProps extends ViewProps, LayoutProps {
  style?: ViewStyle;
}

const Column: React.FC<ColumnProps> = ({
  children,
  style,
  alignItems,
  justifyContent,
  ...props
}) => {
  const dynamicStyle: ViewStyle = {
    alignItems,
    justifyContent,
    flexDirection: 'column',
  };

  return (
    <View style={[styles.column, dynamicStyle, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});

export default Column;
