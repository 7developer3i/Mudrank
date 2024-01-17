import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const initialState = {
  inevstorData: null,
  loading: false,
  error: null,
  editModal:false,
}


export const dashboardInvestorDataSlice = createSlice({
  name: "dashboard-investor-data",
  initialState,
  reducers: {
    fetchInvestorDataStart: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    fetchInvestorSuccess: (state, action) => {
      state.loading = false;
      state.inevstorData = action.payload;
      state.error = null;
    },
    fetchInvestorFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    enable_edit_modal: (state) => {
       state.editModal = !state.editModal
    }
  }
});


export const { fetchInvestorDataStart, fetchInvestorFailure, fetchInvestorSuccess, enable_edit_modal } = dashboardInvestorDataSlice.actions;
export default dashboardInvestorDataSlice.reducer;