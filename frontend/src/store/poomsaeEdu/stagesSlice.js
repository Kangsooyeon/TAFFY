import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStages as fetchStagesApi, completePoomsae as completePoomsaeApi } from '../../apis/stageApi';

// Helper functions to handle localStorage
const loadState = (token) => {
  try {
    const serializedState = localStorage.getItem(`poomsaeState_${token}`);
    return serializedState ? JSON.parse(serializedState) : { completedStages: [], activeStage: 1 };
  } catch (err) {
    console.error('Could not load state', err);
    return { completedStages: [], activeStage: 1 };
  }
};

const saveState = (token, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`poomsaeState_${token}`, serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState = {
  stages: [],
  activeStage: 1,
  completedStages: [],
  loading: false,
  error: null,
};

export const fetchStages = createAsyncThunk(
  'stages/fetchStages',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching stages in Thunk...'); // 로그 추가
      const response = await fetchStagesApi();
      console.log('Fetch stages thunk response111:', response.data); // 데이터 확인
      return response.data;
    } catch (error) {
      console.error('Error in fetchStages thunk:', error); // 에러 로그 추가
      return rejectWithValue(error.message);
    }
  }
);

export const completePoomsae = createAsyncThunk(
  'stages/completePoomsae',
  async ({ poomsaeId, token }, { rejectWithValue }) => {
    try {
      console.log('Completing poomsae in Thunk...', poomsaeId, token); // 로그 추가
      const response = await completePoomsaeApi(poomsaeId, token);
      console.log('Complete poomsae thunk response:', response); // 데이터 확인
      return { poomsaeId, token, ...response };
    } catch (error) {
      console.error('Error in completePoomsae thunk:', error); // 에러 로그 추가
      return rejectWithValue(error.message);
    }
  }
);

const stagesSlice = createSlice({
  name: 'stages',
  initialState,
  reducers: {
    unlockNextStage: (state, action) => {
      state.activeStage = Math.max(state.activeStage, action.payload);
    },
    loadUserState: (state, action) => {
      const userState = loadState(action.payload);
      return { ...state, ...userState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Fetch stages pending'); // 상태 확인
      })
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload;
        console.log('Stages fetched and updated:', action.payload); // 데이터 확인
      })
      .addCase(fetchStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Fetch stages rejected:', action.payload); // 에러 확인
      })
      .addCase(completePoomsae.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Complete poomsae pending'); // 상태 확인
      })
      .addCase(completePoomsae.fulfilled, (state, action) => {
        state.loading = false;
        const { poomsaeId, token } = action.payload;
        if (!state.completedStages.includes(poomsaeId)) {
          state.completedStages.push(poomsaeId);
        }
        state.activeStage = Math.max(state.activeStage, poomsaeId + 1);
        saveState(token, state);
        console.log('Poomsae completed and state updated:', state); // 상태 업데이트 확인
      })
      .addCase(completePoomsae.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Complete poomsae rejected:', action.payload); // 에러 확인
      });
  },
});

export const { unlockNextStage, loadUserState } = stagesSlice.actions;
export default stagesSlice.reducer;
