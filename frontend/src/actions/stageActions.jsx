// import { fetchStageDetails } from "../apis/stage";

// export const FETCH_STAGE_DETAILS_REQUEST = "FETCH_STAGE_DETAILS_REQUEST";
// export const FETCH_STAGE_DETAILS_SUCCESS = "FETCH_STAGE_DETAILS_SUCCESS";
// export const FETCH_STAGE_DETAILS_FAILURE = "FETCH_STAGE_DETAILS_FAILURE";

// // 장별 세부정보 요청 액션 생성자
// export const fetchStageDetailsAction = (stageNum) => async (dispatch) => {
//   dispatch({ type: FETCH_STAGE_DETAILS_REQUEST });
//   try {
//     const response = await fetchStageDetails(stageNum);
//     dispatch({ type: FETCH_STAGE_DETAILS_SUCCESS, payload: response.data.data });
//     } catch (error) {
//     dispatch({ type: FETCH_STAGE_DETAILS_FAILURE, payload: error.message });
//   }
// };