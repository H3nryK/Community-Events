// src/screens/EventDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {events} from '../dummyData';

const EventDetailsScreen = ({route, navigation}) => {
  const {eventId} = route.params;
  const event = events.find(e => e.id === eventId);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${event.title} on ${event.date} at ${event.location}`,
      });
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: event.imageUrl}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>
          {event.date} at {event.time}
        </Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Ticketing', {eventId})}>
            <Icon name="ticket" size={24} color="#fff" />
            <Text style={styles.buttonText}>Buy Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share-social" size={24} color="#4a90e2" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 18,
    marginBottom: 5,
    color: '#666',
  },
  location: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  shareButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
});

export default EventDetailsScreen;
