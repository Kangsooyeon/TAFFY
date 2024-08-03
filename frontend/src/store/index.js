import { configureStore } from '@reduxjs/toolkit';

import userReducer from './myPage/myPageUser'
import authReducer from './user/loginlogout';
import userRecordReducer from './myPage/myPageUserRecord';

// 스토어 설정
const store = configureStore({
  reducer: {user: userReducer, auth: authReducer, userRecord: userRecordReducer},
})


export default store;
