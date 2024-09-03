// components/SliderDots.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme';

interface SliderDotsProps {
  activeIndex: number;
}

const SliderDots: React.FC<SliderDotsProps> = ({activeIndex}) => {
  // Array to represent three dots
  const dots = [0, 1, 2];

  return (
    <View style={styles.container}>
      {dots.map(index => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: theme.green,
    width: 24,
    height: 12,
  },
  inactiveDot: {
    backgroundColor: theme.grey,
  },
});

export default SliderDots;
