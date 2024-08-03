import { SET_ACTIVE_ITEM} from './actions';

const initialState = {
  activeItem: 0,
  // activeStage: parseInt(localStorage.getItem('activeStage')) || 1, // 로컬 스토리지에서 상태 불러오기
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    // case SET_ACTIVE_STAGE:
    //   return {
    //     ...state,
    //     activeStage: action.payload,
    //   };
    default:
      return state;
  }
};

export default reducer;
