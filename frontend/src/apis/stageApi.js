import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져온다고 가정
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjh9IiwiaWF0IjoxNzIyNTg1MTgxLCJleHAiOjE3MjI1ODYxODF9.jIKmqLBPdm5VJA6MzDmag5Z7YNZpijrI5orJZw3LSAc' // 토큰을 로컬 스토리지에서 가져온다고 가정
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchStages = async () => {
  const response = await axiosInstance.get('edu/main');
  return response.data;
};

export const fetchStageDetails = async (psId) => {
  const response = await axiosInstance.get(`edu/${psId}`);
  return response.data;
};