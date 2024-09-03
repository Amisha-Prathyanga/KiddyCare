import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Row from '../../wrappers/Row';

interface DateRowProps {
  day: string;
  theme: any;
}

const DateRow: React.FC<DateRowProps> = ({day, theme}) => (
  <Row justifyContent="center" alignItems="center" style={styles.rowContainer}>
    <Text style={[{color: theme.primary, fontSize: 17}]}>{day}</Text>
    <View style={[styles.separator, {borderColor: theme.green}]} />
  </Row>
);

const styles = StyleSheet.create({
  rowContainer: {
    flex: 0,
    gap: 10,
  } as ViewStyle,
  separator: {
    borderWidth: 1,
    height: 1,
    flex: 1,
  } as ViewStyle,
});

export default DateRow;
