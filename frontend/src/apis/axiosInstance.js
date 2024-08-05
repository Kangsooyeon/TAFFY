import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // 토큰을 로컬 스토리지에서 가져온다고 가정
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjh9IiwiaWF0IjoxNzIyODE5MTUzLCJleHAiOjE3MjI4MjAxNTN9.DbDBGlfuxXphqO1UVGCHCY6b3jQW5Ej8_qbqhX3uSHc';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
