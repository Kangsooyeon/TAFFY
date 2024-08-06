import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoveDetail as fetchMoveDetailApi, completeMovement as completeMovementApi } from '../../apis/mvApi';

export const fetchMoveDetail = createAsyncThunk(
  'move/fetchMoveDetail',
  async ({ mvSeq, psId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchMoveDetailApi(psId, mvSeq, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeMovement = createAsyncThunk(
  'move/completeMovement',
  async ({ psId, mvSeq, token }, { rejectWithValue }) => {
    try {
      const response = await completeMovementApi(psId, mvSeq, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moveSlice = createSlice({
  name: 'move',
  initialState: {
    moveDetail: null,
    loading: false,
    error: null,
    completedMoves: [],
  },
  reducers: {
    setMoveDetail: (state, action) => {
      state.moveDetail = action.payload;
    },
    setMoveCompletion: (state, action) => {
      const { psId, mvSeq } = action.payload;
      state.completedMoves.push({ psId, mvSeq });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoveDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoveDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.moveDetail = action.payload;
      })
      .addCase(fetchMoveDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(completeMovement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeMovement.fulfilled, (state, action) => {
        state.loading = false;
        state.completedMoves.push(action.payload);
      })
      .addCase(completeMovement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMoveDetail, setMoveCompletion } = moveSlice.actions;
export default moveSlice.reducer;
