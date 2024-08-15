import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchStages } from '../poomsaeEdu/stagesSlice'; // 필요한 경우 import 추가

// 초기 상태 정의
const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

// 비동기 액션 생성
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('https://i11e104.p.ssafy.io/api/login', { email, password });

      if (response.data && response.data.accessToken && response.data.refreshToken) {
        const { accessToken, refreshToken } = response.data;

        // 토큰을 쿠키에 저장
        Cookies.set('accessToken', accessToken, { path: '/' });
        Cookies.set('refreshToken', refreshToken, { path: '/' });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 로그인 후 스테이지 데이터 가져오기
        const stagesResponse = await dispatch(fetchStages({ token: accessToken }));
        const activeStage = stagesResponse.payload.findIndex(stage => !stage.userPsEduDone) + 1;

        // activeStage를 로컬 스토리지에 저장
        localStorage.setItem('activeStage', activeStage);

        return { accessToken, refreshToken, activeStage };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      return rejectWithValue(error.message);
    }
  }
);

// 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setAuthFromStorage: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

// 액션과 리듀서 내보내기
export const { loginSuccess, logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
