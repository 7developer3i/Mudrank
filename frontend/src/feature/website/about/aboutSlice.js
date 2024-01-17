import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAboutDelete,
  fetchAboutDetails,
  fetchAboutEdit,
  fetchCreateAbout,
} from "./aboutApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  isloading: false,
  error: "",
  message: "",
  editmodal: false,
  deletemodal: false,
};
export const fetchAboutDetailsAsync = createAsyncThunk(
  "about/fetchAboutDetails",
  async ({ token, adminid }) => {
    const response = await fetchAboutDetails({ token, adminid });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCreateAboutAsync = createAsyncThunk(
  "about/fetchCreateAbout",
  async (formData) => {
    const response = await fetchCreateAbout(formData);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAboutEditAsync = createAsyncThunk(
  "about/fetchAboutEdit",
  async (formData) => {
    const response = await fetchAboutEdit(formData);
    return response.data;
  }
);

export const fetchAboutDeleteAsync = createAsyncThunk(
  "about/fetchAboutDelete",
  async ({ id, token, adminid }) => {
    const response = await fetchAboutDelete({ id, token, adminid });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const aboutSllice = createSlice({
  name: "about",
  initialState,
  reducers: {
    loaderchange: (state, action) => {
      if (action.payload === "chnage") {
        state.isloading = !state.isloading;
      } else {
        state.isloading = false;
      }
    },
    openEditmodalfunc: (state, action) => {
      state.editmodal = !state.editmodal;
    },
    openDeletemodalfunc: (state, action) => {
      state.deletemodal = !state.deletemodal;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAboutDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchAboutEditAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAboutEditAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.editmodal = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateAboutAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCreateAboutAsync.fulfilled, (state, action) => {
        state.isloading = false;
      })
      .addCase(fetchAboutDeleteAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAboutDeleteAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.deletemodal = false;
        state.data = action.payload;
      });
  },
});

export const { loaderchange, openEditmodalfunc, openDeletemodalfunc } =
  aboutSllice.actions;

export default aboutSllice.reducer;
