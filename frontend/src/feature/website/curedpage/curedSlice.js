import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCreateCuratedBlog,
  fetchCuratedDelete,
  fetchCuratedDetails,
  fetchCuratedEdit,
} from "./curedApi";
import Cookies from "js-cookie";
import action from "../../kycsteps/action";

const initialState = {
  data: [],
  isloading: false,
  error: "",
  message: "",
  editModal:false,
  deleteModal:false
};

// Fetch Blog data APIs Call
export const fetchcuratedDetailsAsync = createAsyncThunk(
  "curated/fetchcuratedDetails",
  async ({ token, adminid }) => {
    const response = await fetchCuratedDetails({ token, adminid });
    return response.data;
  }
);

export const fetchCreateCuratedBlogAsync = createAsyncThunk(
  "curated/fetchCreateCuratedBlog",
  async () => {
    const response = await fetchCreateCuratedBlog();
    return response.data;
  }
);

export const fetchCuratedEditAsync = createAsyncThunk(
  "curated/fetchCuratedEdit",
  async (formData) => {
    const response = await fetchCuratedEdit(formData);
    return response.data;
  }
);

export const fetchCuratedDeleteAsync = createAsyncThunk(
  "curated/fetchCuratedDelete",
  async ({ id, adminid }) => {
    const token = Cookies.get("admin_token");
    const response = await fetchCuratedDelete({ id, token, adminid });
    return response.data;
  }
);

const curatedSlice = createSlice({
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
    deletedMessage: (state, action) => {
      state.message = "";
    },
    editModalfunc:(state,action)=>{
      state.editModal = !state.editModal;
    },
    deleteModalfunc:(state,action)=>{
      state.deleteModal = !state.deleteModal
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchcuratedDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchcuratedDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateCuratedBlogAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCreateCuratedBlogAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchCuratedDeleteAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCuratedDeleteAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.deleteModal = false
        state.message = action.payload;
      });
  },
});

export const { loaderchange, deletedMessage,deleteModalfunc,editModalfunc } = curatedSlice.actions;

export default curatedSlice.reducer;
