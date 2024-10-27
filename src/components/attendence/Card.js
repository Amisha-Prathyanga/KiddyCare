import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../../../thems';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const Card = ({type}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (type == 'mark') {
      navigation.navigate('Mark');
    } else {
      navigation.navigate('Alert');
    }
  };
  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <Image
        style={styles.image}
        source={
          type === 'mark'
            ? require('../../assets/image/icons8-attendance-100.png')
            : require('../../assets/image/icons8-google-alerts-100.png')
        }
      />
      <Text style={styles.text}>
        {type === 'mark' ? 'Mark Attendance' : 'Alert History'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 170,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: '#fffff',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Card;
