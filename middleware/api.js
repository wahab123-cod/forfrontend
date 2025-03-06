
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => apiClient.post('/register', userData);
export const loginUser = (credentials) => apiClient.post('/login', credentials);
export const Getdata = ( ) => apiClient.get('/alldata')

export const Deleteuser = (userId)=> apiClient.delete(`/user/${userId}`)
export const SubmitData = (submitform) => apiClient.post('/contactus',submitform);
export const Getcontact = ( ) => apiClient.get('allcontact')