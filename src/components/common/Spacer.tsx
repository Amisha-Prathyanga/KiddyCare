import React from 'react';
import {View, ViewStyle} from 'react-native';

interface Spacer {
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
}

const Spacer: React.FC<Spacer> = ({
  marginTop = 0,
  marginBottom = 0,
  marginRight = 0,
  marginLeft = 0,
}) => {
  const spacerStyle: ViewStyle = {
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
  };

  return <View style={spacerStyle} />;
};

export default Spacer;
