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
