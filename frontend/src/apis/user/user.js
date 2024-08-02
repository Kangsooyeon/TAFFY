import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api/user';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjEyfSIsImlhdCI6MTcyMjU4MDkxMSwiZXhwIjoxNzIyNTgxOTExfQ.0G3dYQcbqSbj8KKclRkO_oaJzQV9wXtSOom80VikYLE");
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJtZW1iZXJJZFwiOjEyfSIsImlhdCI6MTcyMjU4MDkxMSwiZXhwIjoxNzIyNTgxOTExfQ.0G3dYQcbqSbj8KKclRkO_oaJzQV9wXtSOom80VikYLE";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/user'); // 예시 엔드포인트
  return response.data;
};