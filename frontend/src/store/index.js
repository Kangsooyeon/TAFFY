import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/loginLogout';

// 스토어 설정
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
