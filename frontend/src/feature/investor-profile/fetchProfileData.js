import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  data: [],
  error: null
};

export const investorProfileDataSlice = createSlice({
  name: 'investor_profile_data',
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
  investorProfileDataSlice.actions;

export default investorProfileDataSlice.reducer;
