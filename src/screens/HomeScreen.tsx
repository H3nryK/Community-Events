// src/screens/HomeScreen.js
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {events} from '../dummyData';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredEvents(filtered);
  }, [searchQuery]);

  const renderEventItem = ({item}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('EventList', {category: item})}>
      <Icon name={getCategoryIcon(item)} size={24} color="#4a90e2" />
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const categories = [...new Set(events.map(event => event.category))];

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{opacity: fadeAnim, transform: [{translateY}]}}>
        <Text style={styles.title}>Community Event Organizer</Text>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#aaa" 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <FlatList
          data={filteredEvents.slice(0, 5)}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          horizontal={false}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={styles.categoryItem}
              onPress={() => navigation.navigate('EventList', {category})}>
              <Icon
                name={getCategoryIcon(category)}
                size={24}
                color="#4a90e2"
              />
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Featured Event</Text>
        <TouchableOpacity
          style={styles.featuredEvent}
          onPress={() =>
            navigation.navigate('EventDetails', {eventId: events[0].id})
          }>
          <Text style={styles.featuredEventTitle}>{events[0].title}</Text>
          <Text style={styles.featuredEventDate}>{events[0].date}</Text>
          <Text style={styles.featuredEventDescription}>
            {events[0].description}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('UserProfile')}>
          <Icon name="person" size={24} color="#4a90e2" />
          <Text style={styles.profileButtonText}>My Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const getCategoryIcon = category => {
  switch (category.toLowerCase()) {
    case 'technology':
      return 'hardware-chip';
    case 'art':
      return 'color-palette';
    case 'music':
      return 'musical-notes';
    case 'food':
      return 'restaurant';
    case 'sports':
      return 'basketball';
    default:
      return 'calendar';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    width: width / 3 - 20,
    marginBottom: 20,
  },
  categoryText: {
    marginTop: 5,
    color: '#4a90e2',
    textAlign: 'center',
  },
  featuredEvent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
  },
  featuredEventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredEventDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  featuredEventDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  profileButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default HomeScreen;
