// src/screens/UserProfileScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserProfileScreen = () => {
  const [interests, setInterests] = useState({
    sports: false,
    music: false,
    art: false,
    technology: false,
    food: false,
    travel: false,
  });
  const [notifications, setNotifications] = useState(true);

  const toggleInterest = interest => {
    setInterests(prevState => ({
      ...prevState,
      [interest]: !prevState[interest],
    }));
  };

  const saveProfile = () => {
    // In a real app, you'd save this to a backend
    console.log('Saving profile:', {interests, notifications});
    Alert.alert('Profile Saved', 'Your preferences have been updated.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Interests</Text>
        {Object.keys(interests).map(interest => (
          <View key={interest} style={styles.interestRow}>
            <Text style={styles.interestLabel}>
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </Text>
            <Switch
              value={interests[interest]}
              onValueChange={() => toggleInterest(interest)}
              trackColor={{false: '#767577', true: '#4a90e2'}}
              thumbColor={interests[interest] ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.interestRow}>
          <Text style={styles.interestLabel}>Receive Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#767577', true: '#4a90e2'}}
            thumbColor={notifications ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Icon name="save" size={24} color="#fff" />
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  interestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  interestLabel: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default UserProfileScreen;
