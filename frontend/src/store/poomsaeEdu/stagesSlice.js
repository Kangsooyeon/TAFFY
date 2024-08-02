import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStages as fetchStagesApi } from '../../apis/stageApi';

export const fetchStages = createAsyncThunk(
  'stages/fetchStages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStagesApi();
      return response.data; // 여기서 payloadCreator는 API 호출 결과를 반환
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stagesSlice = createSlice({
  name: 'stages',
  initialState: {
    loading: false,
    stages: null, // 초기 상태를 null로 설정
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload;
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stagesSlice.reducer;