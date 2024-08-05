import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Axios request config:', config); // 요청 설정 확인
    return config;
  },
  (error) => {
    console.error('Axios request error:', error); // 요청 에러 로그
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios response:', response); // 응답 확인
    return response;
  },
  (error) => {
    console.error('API call error:', error.response); // 응답 에러 로그
    return Promise.reject(error);
  }
);

export default axiosInstance;
