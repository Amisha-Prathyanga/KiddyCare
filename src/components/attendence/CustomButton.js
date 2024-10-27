import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../thems';

const CustomButton = ({onPress, title}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: '#ffff',
  },
});

export default CustomButton;
