import axios from 'axios';

const USER_BASE_URL = 'https://i11e104.p.ssafy.io/api/user'


const axiosInstance = axios.create({
  baseURL: USER_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjEyfSIsImlhdCI6MTcyMjU4NDkyMywiZXhwIjoxNzIyNTg1OTIzfQ.CWCX4lhUbHufFOi-9jYr02g_glIxH0tL74xeAzrA7JE'}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async () => {
  const response = await axiosInstance;
  return response.data;
};