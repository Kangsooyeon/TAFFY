import axiosInstance from "./axiosInstance";

export const fetchStages = async () => {
  try {
    console.log('Fetching stages API call...'); // 로그 추가
    const response = await axiosInstance.get('edu/main');
    console.log('Fetch stages response1:', response.data); // 여기서 데이터 확인
    return response.data; // response.data를 반환합니다.
  } catch (error) {
    console.error('Error fetching stages:', error);
    throw error;
  }
};

export const fetchStageDetails = async (stageNum) => {
  try {
    const response = await axiosInstance.get(`edu/${stageNum}`);
    console.log("Fetch stage details response2 :", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching stage details for stage ${stageNum}:`, error);
    throw error;
  }
};

export const fetchAllStageDetails = async (psId) => {
  try {
    const response = await axiosInstance.get(`edu/ps/${psId}`);
    console.log('Fetch all stage details response3 :', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching all stage details for psId ${psId}:`, error);
    throw error;
  }
};

export const completePoomsae = async (psId, token) => {
  try {
    console.log('Completing poomsae API call...', psId, token); // 로그 추가
    const response = await axiosInstance.put(`edu/${psId}`, { psId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Complete poomsae response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error completing poomsae for psId ${psId}:`, error);
    throw error;
  }
};
