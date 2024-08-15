import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Network error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/user');
  return response.data;
};

export const fetchUserUpdateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.patch('/user', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const fetchUserDeleteProfile = async () => {
  const response = await axiosInstance.delete('/user');
  return response.data
}