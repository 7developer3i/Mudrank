import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  explore_page: true,
  subscribe_page: false,
  portfolio_page: false,
  profile_page: false,
};

export const navbarSlice = createSlice({
  name: "navbar-page-show",
  initialState,
  reducers: {
    show_page: (state, action) => {
      switch (action.payload) {
        case "explore":
          return {
            explore_page: true,
            subscribe_page: false,
            portfolio_page: false,
            profile_page: false,
          }
        case "subscribe":
          return {
            explore_page: false,
            subscribe_page: true,
            portfolio_page: false,
            profile_page: false,
          }
        case "portfolio":
          return {
            explore_page: false,
            subscribe_page: false,
            portfolio_page: true,
            profile_page: false,
          }

          case "profile":
            return {
              explore_page: false,
              subscribe_page: false,
              portfolio_page: false,
              profile_page: true,
            }

        default:
          return state
      }
    },
  },
});

export const { show_page } = navbarSlice.actions;

export default navbarSlice.reducer;
