import {
  FETCH_STAGE_DETAILS_REQUEST,
  FETCH_STAGE_DETAILS_SUCCESS,
  FETCH_STAGE_DETAILS_FAILURE
} from '../actions/stageActions';

const initialState = {
  loading: false,
  stageDetails: null,
  error: null
};

const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAGE_DETAILS_REQUEST:
      return {
       ...state,
        loading: true
      };
    case FETCH_STAGE_DETAILS_SUCCESS:
      return {
       ...state,
        loading: false,
        stageDetails: action.payload
      };
    case FETCH_STAGE_DETAILS_FAILURE:
      return {
       ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default stageReducer;