import axios from 'axios';

const USER_BASE_URL = 'https://i11e104.p.ssafy.io/api/user'


const axiosInstance = axios.create({
  baseURL: USER_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async (userId) => {
  const response = await axiosInstance.get(`/${userId}`);
  return response.data;
};