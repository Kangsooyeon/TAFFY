import axiosInstance from "./axiosInstance";

export const fetchStages = async (token) => {
  const response = await axiosInstance.get('edu/main', {
    headers : {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const fetchStageDetails = async (stageNum, token) => {
    const response = await axiosInstance.get(`edu/${stageNum}`, {
      headers : {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
};

export const fetchAllStageDetails = async (psId, token) => {
    const response = await axiosInstance.get(`edu/ps/${psId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
};

export const completePoomsae = async (psId, token) => {
  try{
    const response = await axiosInstance.put(`edu/${psId}`, { psId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('보내졌나요?:', response.data);
      return response.data;
    } catch (error) {
      console.error('아직 안 보내짐: ', error)
      throw error;
    }
};
