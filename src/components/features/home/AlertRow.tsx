import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import Row from '../../wrappers/Row';
import Spacer from '../../common/Spacer';
import ButtonComponent from '../../common/ButtonComponent';
import {theme} from '../../../theme/theme';

interface AlertRowProps {
  isFall?: boolean;
  time: string;
  viewImageVisible?: boolean;
  onViewImagePress?: () => void; // Optional callback for button press
}

const AlertRow: React.FC<AlertRowProps> = ({
  isFall,
  time,
  viewImageVisible,
  onViewImagePress,
}) => {
  const imageSource: ImageSourcePropType = isFall
    ? require('../../../assets/image/Fall.png')
    : require('../../../assets/image/childRange.png');

  return (
    <Row justifyContent="space-between" style={styles.rowContainer}>
      <Row style={styles.contentRow}>
        <Image source={imageSource} style={styles.image} />
        <View>
          <Text style={styles.alertText}>
            {isFall ? 'Fall detected' : 'Child out of range detected'}
          </Text>
          <Spacer marginTop={10} />
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </Row>
      {viewImageVisible && (
        <View>
          <ButtonComponent
            textStyle={{
              color: theme.black,
              fontSize: 13,
              fontWeight: '700',
            }}
            customStyle={{
              width: 123,
              height: 43,
              borderRadius: 8,
              backgroundColor: '#C9E4FC',
            }}
            title="View Image"
            onPress={onViewImagePress} // Attach the optional callback
          />
        </View>
      )}
    </Row>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    // paddingHorizontal: 15,
    // paddingVertical: 10,
  } as ViewStyle,
  contentRow: {
    gap: 15,
  } as ViewStyle,
  image: {
    width: 40,
    height: 40,
    marginTop: 5,
  } as ViewStyle,
  alertText: {
    color: theme.actionBlue,
    fontSize: 14,
    fontFamily: 'NunitoSans',
    fontWeight: 'bold',
  } as TextStyle,
  timeText: {
    color: theme.secondaryBlack,
    fontSize: 11,
    fontFamily: 'NunitoSans',
  } as TextStyle,
});

export default AlertRow;
