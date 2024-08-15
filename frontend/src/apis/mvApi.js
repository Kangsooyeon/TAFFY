// mvApi.js
import axiosInstance from "./axiosInstance";

export const fetchMoveDetail = async (psId, mvSeq, token) => {
  const response = await axiosInstance.get(`edu/mv/${psId}/${mvSeq}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const completeMovement = async (psId, mvSeq, token) => {
  try{
    const response = await axiosInstance.put(`edu/mv/${psId}/${mvSeq}`, { psId, mvSeq }, {
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
