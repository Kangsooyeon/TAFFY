import { configureStore } from '@reduxjs/toolkit';
import userReducer from './myPage/myPageUser';
import userRecordReducer from './myPage/myPageUserRecord';
import poomsaeTestReducer from './poomsaeTest/poomsaeTest';
import authReducer from './user/loginlogout';

// 스토어 설정
const store = configureStore({
  reducer: {user: userReducer, auth: authReducer, userRecord: userRecordReducer, poomsaeTest: poomsaeTestReducer},
});

export default store;
