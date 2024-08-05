import axiosInstance from "./axiosInstance";

export const fetchStages = async () => {
  const response = await axiosInstance.get('edu/main');
  console.log('Fetch stages response1 :', response.data); // 응답 데이터 출력
  return response.data;
};

export const fetchStageDetails = async (stageNum) => {
  const response = await axiosInstance.get(`edu/${stageNum}`);
  console.log("Fetch stage details response2 :", response.data.data); // 추가된 로그
  return response.data.data;
};

export const fetchAllStageDetails = async (psId) => {
  const response = await axiosInstance.get(`edu/ps/${psId}`);
  console.log('Fetch all stage details response3 :', response.data); // 추가된 로그
  return response.data;
};
