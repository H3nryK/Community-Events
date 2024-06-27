// src/components/EventCard.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const EventCard = ({event, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon
          name={getCategoryIcon(event.category)}
          size={30}
          color="#4a90e2"
        />
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{event.date}</Text>
    </TouchableOpacity>
  );
};

const getCategoryIcon = category => {
  switch (category) {
    case 'technology':
      return 'hardware-chip';
    case 'art':
      return 'color-palette';
    case 'music':
      return 'musical-notes';
    default:
      return 'calendar';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: width * 0.6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventCard;
