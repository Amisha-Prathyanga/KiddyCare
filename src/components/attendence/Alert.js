import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../thems';
import {Image} from 'react-native-elements';

const Alert = ({type, time}) => {
  return (
    <View style={styles.alert}>
      <View>
        <Image
          style={styles.image}
          source={
            type === 'fall'
              ? require('../assets/icons8-falling-person-48.png')
              : require('../assets/icons8-locked-outside-48.png')
          }
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>
          {type === 'fall' ? 'Fall Detected' : 'Child Out of Range Detected'}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    backgroundColor: '#C8C8C8',
    borderRadius: 10,
    padding: 15,
  },
  image: {
    width: 40,
    height: 40,
  },

  text: {
    color: colors.text,
  },
  body: {
    paddingStart: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
});

export default Alert;
