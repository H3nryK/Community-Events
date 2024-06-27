// src/screens/EventListScreen.js
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import {events} from '../dummyData';

const EventListScreen = ({navigation, route}) => {
  const {category: initialCategory = 'All'} = route.params || {};
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const categories = ['All', ...new Set(events.map(event => event.category))];

  useEffect(() => {
    const filterEvents = () => {
      setLoading(true);
      const filtered = events.filter(
        event =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedCategory === 'All' || event.category === selectedCategory),
      );
      setFilteredEvents(filtered);
      setLoading(false);
    };

    const debounceFilter = setTimeout(filterEvents, 300);

    return () => clearTimeout(debounceFilter);
  }, [searchQuery, selectedCategory]);

  const renderEventCard = useCallback(
    ({item}) => (
      <EventCard
        event={item}
        onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}
      />
    ),
    [navigation],
  );

  const renderCategoryButton = useCallback(
    category => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          selectedCategory === category && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(category)}
        accessibilityLabel={`Category ${category}`}
        accessibilityState={{selected: selectedCategory === category}}>
        <Text
          style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedCategoryText,
          ]}>
          {category}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategory],
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search events..."
      />
      <FlatList
        data={categories}
        renderItem={({item}) => renderCategoryButton(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        keyExtractor={item => item}
        contentContainerStyle={styles.categoryListContainer}
      />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#4a90e2" />
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.eventList}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No events found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    marginBottom: 15,
  },
  categoryListContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: '#4a90e2',
  },
  categoryText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  eventList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});

export default EventListScreen;
