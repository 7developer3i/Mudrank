import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  show_details: {
    startup: true,
    investor: false,
    transaction: false,
  },
};

export const dashboard_Navbar_Slice = createSlice({
  name: "dashboard-navbar",
  initialState,
  reducers: {
    show_startup_details: (state) => {
      state.show_details.startup = true;
      state.show_details.investor = false;
      state.show_details.transaction = false;
    },

    show_investor_details: (state) => {
      state.show_details.investor = true;
      state.show_details.startup = false;
      state.show_details.transaction = false;
    },
  },
});

export const { show_investor_details, show_startup_details } = dashboard_Navbar_Slice.actions;

export default dashboard_Navbar_Slice.reducer