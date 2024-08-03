// stagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStageDetails as fetchStageDetailsApi } from '../../apis/stageApi';

export const fetchStageDetails = createAsyncThunk(
  'stage/fetchStageDetails',
  async (stageNum, { rejectWithValue }) => {
    try {
      const response = await fetchStageDetailsApi(stageNum);
      return response.data; // API 호출 결과를 반환
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    loading: false,
    stageDetails: {},
    error: null,
    activeItem: 0,
    activeStage: parseInt(localStorage.getItem('activeStage')) || 1,
  },
  reducers: {
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setActiveStage: (state, action) => {
      state.activeStage = action.payload;
      localStorage.setItem('activeStage', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStageDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStageDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.psId) {
          state.stageDetails[action.payload.psId] = action.payload;
        } else {
          state.error = 'Invalid data received';
        }
      })
      .addCase(fetchStageDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveItem, setActiveStage } = stageSlice.actions;

export default stageSlice.reducer;
