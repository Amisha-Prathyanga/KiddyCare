import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';

import {routeNames} from '../../navigation/config/routeNames'; // Adjust path as needed

const ReportsNavigationPage = () => {
  const navigation = useNavigation();

  // Define the reports and navigation targets
  const reportCards = [
    {
      title: 'Cry Detections Report',
      description: 'View and analyze infant cry detections and patterns.',
      icon: 'hearing',
      navigateTo: 'DailySummaryReport',
    },
    {
      title: 'Fall Detections Report',
      description: 'Track fall incidents and safety metrics.',
      icon: 'directions-walk',
      navigateTo: 'DailyFallSummaryReport',
    },
    {
      title: 'Emotion Detection Report',
      description: 'Review detected behavioral patterns and activities.',
      icon: 'insights',
      navigateTo: 'EmotionSummaryReport',
    },
    {
      title: 'Range Detection Report',
      description: 'Monitor health metrics and historical data.',
      icon: 'monitor-heart',
      navigateTo: 'RangeDetectionReport',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Reports Overview</Text>
      <View style={styles.cardsContainer}>
        {reportCards.map((report, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(report.navigateTo)}>
            <View style={styles.iconContainer}>
              <Icon name={report.icon} size={32} color={theme.primary} />
            </View>
            <Text style={styles.cardTitle}>{report.title}</Text>
            <Text style={styles.cardDescription}>{report.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.lightBackground,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (screenWidth - 48) / 2, // Fits two cards per row with some margin
    backgroundColor: theme.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: theme.lightPrimary,
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
    marginVertical: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: theme.gray,
    textAlign: 'center',
  },
});

export default ReportsNavigationPage;
