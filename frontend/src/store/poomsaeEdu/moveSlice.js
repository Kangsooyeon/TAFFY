import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoveDetail as fetchMoveDetailApi } from '../../apis/mvApi';

export const fetchMoveDetail = createAsyncThunk(
  'move/fetchMoveDetail',
  async ({mvSeq, psId, token}, {rejectWithValue}) => {
    try {
      const response = await fetchMoveDetailApi(mvSeq, psId, token);
      console.log('API response:', response); // 데이터 구조 확인
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);