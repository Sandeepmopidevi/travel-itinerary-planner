const BASE_URL = 'http://localhost:5000/api';

const headers = {
  'Content-Type': 'application/json',
};

// Function to handle API requests
const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
  const options = {
    method,
    headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API request failed at ${endpoint}:`, error.message);
    throw error;
  }
};

// Authentication APIs
export const login = (email, password) => apiRequest('/auth/login', 'POST', { email, password });
export const register = (name, email, password) =>
  apiRequest('/auth/register', 'POST', { name, email, password });
export const getUserProfile = (token) => apiRequest('/auth/me', 'GET', null, token);

// Itinerary APIs
export const getItineraries = (token) => apiRequest('/itineraries', 'GET', null, token);
export const getItineraryById = (id, token) => apiRequest(`/itineraries/${id}`, 'GET', null, token);
export const createItinerary = (data, token) => apiRequest('/itineraries', 'POST', data, token);

// Collaboration APIs
export const collaborateOnItinerary = (id, collaborators, token) =>
  apiRequest(`/itineraries/${id}/collaborate`, 'POST', { collaborators }, token);
