import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../thems';
import {Image} from 'react-native-elements';
import CustomButton from './CustomButton';

const AlertData = ({type, time}) => {
  return (
    <View style={styles.alert}>
      <View>
        <Image
          style={styles.image}
          source={
            type === 'fall'
              ? require('../../assets/image/icons8-falling-person-48.png')
              : require('../../assets/image/icons8-locked-outside-48.png')
          }
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>
          {type === 'fall' ? 'Fall Detected' : 'Child Out of Range Detected'}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      {type === 'fall' ? (
        <View style={styles.buttonWrap}>
          <CustomButton title={'View Image'} />
        </View>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#C8C8C8',
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
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default AlertData;
