import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCreatePrivacyBlog,
  fetchPrivacyDelete,
  fetchPrivacyDetails,
  fetchPrivacyEdit,
} from "./privacyApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  isLoading: false,
  error: "",
  message: "",
  deleteModal:false,
  editmodal:false
};
export const fetchPrivacyDetailsAsync = createAsyncThunk(
  "privacy/fetchPrivacyDetails",
  async ({ token, adminid }) => {
    const response = await fetchPrivacyDetails({ token, adminid });
    return response.data;
  }
);

export const fetchCreatePrivacyBlogAsync = createAsyncThunk(
  "privacy/fetchCreatePrivacyBlog",
  async (formData) => {
    const token = Cookies.get("admin_token");
    const response = await fetchCreatePrivacyBlog(formData);
    return response.data;
  }
);

export const fetchPrivacyEditAsync = createAsyncThunk(
  "privacy/fetchPrivacyEdit",
  async (data) => {
    const response = await fetchPrivacyEdit(data);
    return response.data;
  }
);

export const fetchPrivacyDeleteAsync = createAsyncThunk(
  "privacy/fetchPrivacyDelete",
  async ({id, adminid}) => {
    
    const token = Cookies.get("admin_token");
    const response = await fetchPrivacyDelete({id, token, adminid});
    return response.data;
  }
);

const privacySlice = createSlice({
  name: "privacy",
  initialState,
  reducers: {
    loaderchange: (state, action) => {
      if (action.payload === "change") {
        state.isLoading = !state.isLoading;
      } else {
        state.isLoading = false;
      }
    },
    openEditModalFunc: (state, action) => {
      state.editmodal = !state.editmodal;
    },
    openDeleteModalFunc: (state, action) => {
      state.deleteModal = !state.deleteModal;
    }
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacyDetailsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrivacyDetailsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreatePrivacyBlogAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreatePrivacyBlogAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPrivacyEditAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrivacyEditAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editmodal = false
        state.data = action.payload;
      })
      .addCase(fetchPrivacyDeleteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrivacyDeleteAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteModal = false;
        state.data = action.payload;
      });
  },
});
export const { loaderchange, openEditModalFunc,openDeleteModalFunc } = privacySlice.actions;

export default privacySlice.reducer;
