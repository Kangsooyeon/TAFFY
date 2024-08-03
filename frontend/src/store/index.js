import { configureStore } from '@reduxjs/toolkit';

import userReducer from './myPage/myPageUser'
import authReducer from './user/loginlogout';

// 스토어 설정
const store = configureStore({
  reducer: {user: userReducer, auth: authReducer},
})


export default store;
