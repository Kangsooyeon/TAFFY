import { configureStore } from "@reduxjs/toolkit";
import stageReducer from "./poomsaeEdu/stageSlice";
import stagesReducer from "./poomsaeEdu/stagesSlice";
import landingReducer from "./landing/landingSlice";
import authReducer from './user/loginLogout';
import poomsaeTestReducer from './poomsaeTest/poomsaeTest';

// Redux store 설정
const store = configureStore({
  reducer: {
    stages: stagesReducer,
    stage: stageReducer,
    landing: landingReducer,
    auth: authReducer,
    poomsaeTest: poomsaeTestReducer,
  },
});

export default store;