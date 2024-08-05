import { configureStore } from '@reduxjs/toolkit';
import userReducer from './myPage/myPageUser';
import userRecordReducer from './myPage/myPageUserRecord';
import stageReducer from "./poomsaeEdu/stageSlice";
import stagesReducer from "./poomsaeEdu/stagesSlice";
import landingReducer from "./landing/landingSlice";
import authReducer from './user/loginLogout';
import poomsaeTestReducer from './poomsaeTest/poomsaeTest';
import quickStartReducer from './sparing/quickStart'


// Redux store 설정
const store = configureStore({
  reducer: {
    stages: stagesReducer,
    stage: stageReducer,
    landing: landingReducer,
    auth: authReducer,
    poomsaeTest: poomsaeTestReducer,
    user: userReducer,
    userRecord: userRecordReducer,
    quickStart: quickStartReducer
  }
});

export default store;