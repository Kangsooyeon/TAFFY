import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});


export const fetchGameExit = async (roomType, sessionId) => {
  try {
    const response = await axiosInstance.get(`/spar/exit`, {
      params: {
        roomType: roomType,
        sessionId: sessionId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sparing mission user data:', error);
    throw error;
  }
};