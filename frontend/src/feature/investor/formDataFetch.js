import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [],
  error: null
};

export const formDataFetchSlice = createSlice({
  name: 'investor_form_data',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    }
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  formDataFetchSlice.actions;

export default formDataFetchSlice.reducer;
