import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStages as fetchStagesApi } from '../../apis/stageApi';

export const fetchStages = createAsyncThunk(
  'stages/fetchStages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStagesApi();
      console.log('API response:', response); // 데이터 구조 확인
      return response.data; // data 필드만 반환
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
        } else if (action.payload && Array.isArray(action.payload.data)) {
          state.stages = action.payload.data; // data 필드의 배열로 설정
        } else {
          console.error('Received non-array data:', action.payload);
          state.stages = []; // 잘못된 데이터가 들어오면 빈 배열로 설정
        }
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { unlockNextStage } = stagesSlice.actions;
export default stagesSlice.reducer;
