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


export const fetchUserRecord = async () => {
  const response = await axiosInstance.get('/record');
  return response.data;
};

export const fetchUserRecordUpdate = async (winorlose) => {
  try {
    const response = await axiosInstance.put(`/record`, {
      params: {
        winorlose: winorlose
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sparing mission user data:', error);
    throw error;
  }
};