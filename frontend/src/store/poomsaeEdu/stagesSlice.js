import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStages as fetchStagesApi } from '../../apis/stageApi';

export const fetchStages = createAsyncThunk(
  'stages/fetchStages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStagesApi();
      return response.data; // 데이터 포맷을 정확히 반환합니다.
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stagesSlice = createSlice({
  name: 'stages',
  initialState: {
    stages: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateStage: (state, action) => {
      const updatedStage = action.payload;
      const index = state.stages.findIndex(stage => stage.psId === updatedStage.psId);
      if (index !== -1) {
        state.stages[index] = updatedStage;
      }
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
        state.stages = action.payload; // 제대로 데이터를 할당
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateStage } = stagesSlice.actions;
export default stagesSlice.reducer;
