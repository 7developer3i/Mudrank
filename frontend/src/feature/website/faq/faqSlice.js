import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrowseDetails, fetchCreateFaqBlog, fetchFaqDelete, fetchFaqDetails, fetchFaqEdit } from "./faqApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  isloading: false,
  error: "",
  message: "",
  editModal:false,
  deleteModal:false
};

export const fetchFaqDetailsAsync = createAsyncThunk(
  "faq/fetchFaqDetails",
  async ({token,adminid}) => {
    const response = await fetchFaqDetails({token,adminid});
    return response.data;
  }
);

export const fetchCreateFaqBlogAsync = createAsyncThunk(
    "faq/fetchCreateFaqBlog",
    async (formData) => {
      
      const response = await fetchCreateFaqBlog(formData);
      return response.data;
    }
  );

  export const fetchFaqEditAsync = createAsyncThunk(
    "faq/fetchFaqEdit",
    async (formData) => {
    
      const response = await fetchFaqEdit(formData);
      return response.data;
    }
  );

  export const fetchFaqDeleteAsync = createAsyncThunk(
    "faq/fetchFaqDelete",
    async ({adminid,token,id}) => {
    
      const response = await fetchFaqDelete({adminid,token,id});
      return response.data;
    }
  );

const faqSlice = createSlice({
  name: "faq",
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
      .addCase(fetchFaqDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchFaqDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      }).addCase(fetchCreateFaqBlogAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCreateFaqBlogAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      }).addCase(fetchFaqEditAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchFaqEditAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.editModal = false
        state.data = action.payload;
      }).addCase(fetchFaqDeleteAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchFaqDeleteAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.deleteModal = false;
        state.data = action.payload;
      });
  },
});
export const { loaderchange,openDeleteModalFunc,openEditModalFunc } = faqSlice.actions;

export default faqSlice.reducer;
