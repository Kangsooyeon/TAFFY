import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/loginLogout';
import poomsaeTestReducer from './poomsaeTest/testUserPs';

// 스토어 설정
const store = configureStore({
  reducer: {
    auth: authReducer,
    poomsaeTest: poomsaeTestReducer,
  },
});

export default store;
