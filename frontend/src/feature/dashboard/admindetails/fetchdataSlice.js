import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: null,
  data_highlights:null,
  error: null,
  documents:null,
  close_data:null
};

export const apiDataSlice = createSlice({
  name: 'startupData',
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
    },
    fetchDataHighlights : (state, action) => {
      state.data_highlights = action.payload
    },
    fetchDocuments : (state, action) => {
      state.documents = action.payload
    },
    fetchCloseStartups : (state, action) => {
      state.close_data = action.payload
    },
  },
});

export const { fetchDataStart, fetchCloseStartups, fetchDocuments, fetchDataHighlights, fetchDataSuccess, fetchDataFailure } =
  apiDataSlice.actions;

export default apiDataSlice.reducer;
