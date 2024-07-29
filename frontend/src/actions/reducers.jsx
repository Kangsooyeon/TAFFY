import { SET_ACTIVE_ITEM } from './actions';

const initialState = {
  activeItem: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
