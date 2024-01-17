import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  general_details: true,
  bank_details: false,
  nominee_details: false,
};

export const createProfileSlice = createSlice({
  initialState,
  name: "profile-details",
  reducers: {
    set_current_detail_page: (state, action) => {
      switch (action.payload) {
        case "general":
          return {
            general_details: true,
            bank_details: false,
            nominee_details: false,
          };
        case "bank":
          return {
            general_details: false,
            bank_details: true,
            nominee_details: false,
          };
        case "nominee":
          return {
            general_details: false,
            bank_details: false,
            nominee_details: true,
          };

        default:
          return state;
      }
    },
  },
});

export const { set_current_detail_page } = createProfileSlice.actions;
export default createProfileSlice.reducer;

// Bank details initial state
const bankDetailsInitialState = {
  no_details: false,
  true_details: false,
  edit_details: false,
};

// Create a slice for bank details
export const bankDetailsSlice = createSlice({
  name: "bank-details",
  initialState: bankDetailsInitialState,
  reducers: {
    show_bankdetails_page: (state, action) => {
      switch (action.payload) {
        case "no-detail":
          return {
            no_details: true,
            true_details: false,
            edit_details: false,
          };
        case "true-detail":
          return {
            no_details: false,
            true_details: true,
            edit_details: false,
          };
        case "edit-detail":
          return {
            no_details: false,
            true_details: false,
            edit_details: true,
          };

        default:
          return state;
      }
    },
  },
});

// Export actions from bankDetailsSlice
export const { showNoDetails, showTrueDetails, showEditDetails } =
  bankDetailsSlice.actions;
export const bankDetailsReducer = bankDetailsSlice.reducer; // Export the reducer
