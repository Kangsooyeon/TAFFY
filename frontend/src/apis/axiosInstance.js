// axiosInstance.js
import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져온다고 가정
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjh9IiwiaWF0IjoxNzIyNjc3Mjc2LCJleHAiOjE3MjI2NzgyNzZ9.witLcIZBewTHYb76oGNteDQmh4kP-ZhrLL4rXb8dE48';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
