import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/profile`;


const handleAuthError = (error) => {
  if (error.response && error.response.status === 401) {
    // Token invalid or expired → force logout
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }
  throw error; 
};

export const getProfile = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data[0] || response.data;
  } catch (err) {
    handleAuthError(err);
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('full_name', profileData.full_name);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('address', profileData.address);
    formData.append('about', profileData.about);

    if (profileData.image) {
      formData.append('image', profileData.image);
    }
    
    if (profileData.favicon) {
      formData.append('favicon', profileData.favicon);
    }

    if (profileData.logo) {
      formData.append('logo', profileData.logo);
    }

    const response = await axios.put(`${API_URL}/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (err) {
    handleAuthError(err);
  }
};
