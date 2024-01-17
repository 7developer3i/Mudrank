import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrowseDetails, fetchCreateBrowseBlog } from "./browseApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  isloading: false,
  error: "",
  message: "",
};

export const fetchBrowseDetailsAsync = createAsyncThunk(
  "about/fetchBrowseDetails",
  async ({token,adminid}) => {
    const response = await fetchBrowseDetails({token,adminid});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCreateBrowseBlogAsync = createAsyncThunk(
  "about/fetchCreateBrowseBlog",
  async (data) => {
  
    const response = await fetchCreateBrowseBlog(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {
    loaderchange: (state, action) => {
      if (action.payload === "chnage") {
        state.isloading = !state.isloading;
      } else {
        state.isloading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrowseDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchBrowseDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateBrowseBlogAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCreateBrowseBlogAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      });
  },
});
export const { loaderchange } = browseSlice.actions;

export default browseSlice.reducer;
