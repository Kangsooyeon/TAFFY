import { configureStore } from '@reduxjs/toolkit';
import userReducer from './myPage/myPageUser';
import userRecordReducer from './myPage/myPageUserRecord';
import stageReducer from "./poomsaeEdu/stageSlice";
import stagesReducer from "./poomsaeEdu/stagesSlice";
import landingReducer from "./landing/landingSlice";
import authReducer from './user/loginLogout';
import poomsaeTestReducer from './poomsaeTest/poomsaeTest';
import moveReducer from './poomsaeEdu/moveSlice';
import quickStartReducer from './sparing/quickStart'
import sparingUserReducer from './sparing/sparUser'
import sparingMissionReducer from './sparing/sparMission'
import sparingExitReducer from './sparing/gameExit';

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
    move: moveReducer,
    quickStart: quickStartReducer,
    sparingUser: sparingUserReducer,
    sparingMission: sparingMissionReducer,
    sparingExit: sparingExitReducer,
  }
});

export default store;