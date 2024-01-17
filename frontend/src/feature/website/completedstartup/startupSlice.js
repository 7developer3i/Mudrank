import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCompletedstartupDetails,
  fetchCreateCompletedstartupDetails,
  fetchDeleteBlog,
  fetchEditBlogs,
} from "./startupApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  isloading: false,
  error: "",
  message: "",
  editModal:false,
  deleteModal:false
};

export const fetchcompletedstartupDetailsAsync = createAsyncThunk(
  "startup/fetchCompletedstartupDetails",
  async ({token,adminid}) => {
    const response = await fetchCompletedstartupDetails({token,adminid});
    return response.data;
  }
);
export const fetchCreateCompletedstartupDetailsAsync = createAsyncThunk(
  "startup/fetchCreateCompletedstartupDetails",
  async (formData) => {
    const token = Cookies.get("admin_token")
    const response = await fetchCreateCompletedstartupDetails(formData);
    return response.data;
  }
);

export const fetchEditBlogsAsync = createAsyncThunk(
  "startup/fetchEditBlogs",
  async (formData) => {
    const token = Cookies.get("admin_token")
    const response = await fetchEditBlogs(formData,token);
    return response.data;
  }
);

export const fetchDeleteBlogAsync = createAsyncThunk(
  "startup/fetchDeleteBlog",
  async ({id,token,adminid}) => {
   
    const response = await fetchDeleteBlog({id,token,adminid});
    return response.data;
  }
);

const CompletedstartupSlice = createSlice({
  name: "completedstartup",
  initialState,
  reducers: {
    loaderchange: (state, action) => {
      if (action.payload === "chnage") {
        state.isloading = !state.isloading;
      } else {
        state.isloading = false;
      }
    },
    openEditModalFunc:(state,action)=>{
      state.editModal = !state.editModal
    },
    openDeleteModalFunc:(state,action)=>{
      state.deleteModal = !state.deleteModal
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcompletedstartupDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchcompletedstartupDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateCompletedstartupDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(
        fetchCreateCompletedstartupDetailsAsync.fulfilled,
        (state, action) => {
          state.isloading = false;
          state.message = action.payload;
        }
      )
      .addCase(fetchEditBlogsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchEditBlogsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.editModal = false;
        state.message = action.payload;
      })
      .addCase(fetchDeleteBlogAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchDeleteBlogAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.deleteModal = false
        state.message = action.payload;
      });
  },
});
export const { loaderchange,openEditModalFunc,openDeleteModalFunc } = CompletedstartupSlice.actions;
export default CompletedstartupSlice.reducer;
