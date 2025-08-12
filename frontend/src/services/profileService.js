// services/profileService.js
import axios from 'axios';

const API_URL = 'http://localhost:8889/fahad-jadiya/profile';

export const getProfile = async () => {
  const response = await axios.get(API_URL);
  return response.data.data[0] || response.data;
};

export const updateProfile = async (id, profileData) => {

  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('name', profileData.name);
  formData.append('email', profileData.email);
  formData.append('contact', profileData.contact);
  formData.append('address', profileData.address);

  if (profileData.image) {
    formData.append('image', profileData.image);
  }
  const response = await axios.put(
    `${API_URL}/edit/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};