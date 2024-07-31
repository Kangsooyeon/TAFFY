export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';
export const SET_ACTIVE_STAGE = 'SET_ACTIVE_STAGE';

export const setActiveItem = (item) => ({
  type: SET_ACTIVE_ITEM,
  payload: item,
});

export const setActiveStage = (stage) => {
  localStorage.setItem('activeStage', stage); // 로컬 스토리지에 상태 저장
  return {
    type: SET_ACTIVE_STAGE,
    payload: stage,
  };
};
