import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch data from the API
export const fetchPoomsaeTest = () => async dispatch => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const response = await axios.get('https://i11e104.p.ssafy.io/api/test/users/ps', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.data) {
                const poomsaeTestData = response.data.data.map(item => ({
                    id: item.ps.psId,
                    name: item.ps.psKoName,
                    description: item.ps.psKoDesc,
                    imageUrl: item.ps.psThumb,
                    passed: item.passed
                }));

                dispatch(setPoomsaeTest(poomsaeTestData));
            }
        } catch (error) {
            console.error('Error fetching completed stages:', error);
        }
    }
};

// Create a slice for poomsae
const poomsaeTestSlice = createSlice({
  name: 'poomsae',
  initialState: {
    poomsaeTest: [],
  },
  reducers: {
    setPoomsaeTest: (state, action) => {
      state.poomsaeTest = action.payload;
    },
  },
});

export const { setPoomsaeTest } = poomsaeTestSlice.actions;
export default poomsaeTestSlice.reducer;
