import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStages as fetchStagesApi } from '../../apis/stageApi';

export const fetchStages = createAsyncThunk(
  'stages/fetchStages',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetchStagesApi(token);
      console.log('API response:', response); // 데이터 구조 확인
      return response.data; // data 필드만 반환
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completePoomsae = createAsyncThunk(
  'stages/completePoomsae',
  async ({ psId, token }, { rejectWithValue }) => {
    try {
      const response = await completePoomsae(psId, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stagesSlice = createSlice({
  name: 'stages',
  initialState: {
    stages: [],
    activeStage: 1, // 처음엔 첫 번째 스테이지만 열려있음
    loading: false,
    error: null,
  },
  reducers: {
    unlockNextStage: (state, action) => {
      state.activeStage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Stages payload:', action.payload); // 데이터 구조 확인

        if (Array.isArray(action.payload)) {
          state.stages = action.payload; // 배열로 설정
          const unlockedStage = action.payload.findIndex(stage => !stage.userPsEduDone);
          state.activeStage = unlockedStage === -1 ? action.payload.length : unlockedStage + 1;
          
        } else if (action.payload && Array.isArray(action.payload.data)) {
          state.stages = action.payload.data; // data 필드의 배열로 설정
          // 사용자의 현재 진행 상태를 설정
          const unlockedStage = action.payload.data.findIndex(stage => !stage.userPsEduDone);
          state.activeStage = unlockedStage === -1 ? action.payload.data.length : unlockedStage + 1;

        } else {
          console.error('Received non-array data:', action.payload);
          state.stages = []; // 잘못된 데이터가 들어오면 빈 배열로 설정
        }
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // .addCase(completePoomsae.fulfilled, (state, action) => {
      //   state.activeStage += 1; // 완료 시 다음 스테이지 잠금 해제
      // });
  },
});

export const { unlockNextStage } = stagesSlice.actions;
export default stagesSlice.reducer;