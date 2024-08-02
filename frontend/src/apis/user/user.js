import axios from 'axios';

const USER_BASE_URL = 'https://i11e104.p.ssafy.io/api/user'


const axiosInstance = axios.create({
  baseURL: USER_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjEyfSIsImlhdCI6MTcyMjU4MDkxMSwiZXhwIjoxNzIyNTgxOTExfQ.0G3dYQcbqSbj8KKclRkO_oaJzQV9wXtSOom80VikYLE'}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async (nickname) => {
  const response = await axiosInstance.get(`/${nickname}`);
  return response.data;
};