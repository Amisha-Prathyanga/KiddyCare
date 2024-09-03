import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import ContentWrap from '../../wrappers/ContentWrap';
import Column from '../../wrappers/Column';
import Spacer from '../../common/Spacer';
import ButtonComponent from '../../common/ButtonComponent';
import SliderDots from './SliderDots';
import {theme} from '../../../theme/theme';
import {fontStyles} from '../../../theme/typography';

interface MainContentProps {
  imageSource: any;
  headerText: string;
  descriptionText: string;
  buttonTitle: string;
  onButtonPress: () => void;
  activeIndex: number;
  highlightText: string;
}

const MainContent: React.FC<MainContentProps> = ({
  imageSource,
  headerText,
  descriptionText,
  buttonTitle,
  onButtonPress,
  activeIndex,
  highlightText,
}) => {
  return (
    <ContentWrap paddingLeft={34} paddingRight={34}>
      <Column alignItems="center" justifyContent="center">
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
        <Spacer marginTop={34} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {headerText.split(highlightText).map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < headerText.split(highlightText).length - 1 && (
                  <Text style={styles.highlightText}>{highlightText}</Text>
                )}
              </React.Fragment>
            ))}
          </Text>
        </View>

        <Spacer marginTop={24} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{descriptionText}</Text>
        </View>
        <Spacer marginTop={24} />

        <ButtonComponent
          title={buttonTitle}
          onPress={onButtonPress}
          customStyle={styles.button}
        />
        <Spacer marginTop={32} />
        <SliderDots activeIndex={activeIndex} />
      </Column>
    </ContentWrap>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 342,
    height: 263,
  } as ImageStyle,
  headerContainer: {
    width: 207,
    height: 69,
  } as ViewStyle,
  headerText: {
    ...fontStyles.headerTitle,
    color: theme.black,
    textAlign: 'center',
  } as TextStyle,
  highlightText: {
    color: theme.primary,
  } as TextStyle,
  descriptionContainer: {
    width: 232,
    height: 47,
  } as ViewStyle,
  descriptionText: {
    ...fontStyles.description,
    color: theme.black,
    textAlign: 'center',
  } as TextStyle,
  button: {
    width: 227,
    height: 67,
  } as ViewStyle,
});

export default MainContent;
