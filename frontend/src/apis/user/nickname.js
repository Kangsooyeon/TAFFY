// apis/user/nickname.js
import axios from 'axios';

const API_BASE_URL = 'https://i11e104.p.ssafy.io/api';

export const fetchNicknameProfile = async ({ nickName }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/nickname`, { nickName });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Nickname validation failed');
  }
};
