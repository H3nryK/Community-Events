// src/screens/TicketingScreen.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const TicketingScreen = ({route}) => {
  const {eventId} = route.params;
  const [ticketCount, setTicketCount] = useState(1);

  const handlePurchase = () => {
    // In a real app, you'd call an API to process the purchase
    Alert.alert(
      'Purchase Successful',
      `You bought ${ticketCount} ticket(s) for event ${eventId}`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Tickets</Text>
      <Text style={styles.label}>Number of Tickets:</Text>
      <Picker
        selectedValue={ticketCount}
        onValueChange={itemValue => setTicketCount(itemValue)}
        style={styles.picker}>
        {[1, 2, 3, 4, 5].map(num => (
          <Picker.Item key={num} label={num.toString()} value={num} />
        ))}
      </Picker>
      <Text style={styles.total}>Total: ${ticketCount * 10}</Text>
      <Button title="Purchase" onPress={handlePurchase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TicketingScreen;
