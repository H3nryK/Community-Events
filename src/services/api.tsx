// src/services/api.js
const BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventDetails = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};