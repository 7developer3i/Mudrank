import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCreateFreqBlog, fetchFreqDelete, fetchFreqDetails, fetchFreqEdit } from "./frequentlyApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  isloading: false,
  error: "",
  message: "",
  editModal:false,
  deleteModal:false
};

// Fetch Blog data APIs Call
export const fetchFreqDetailsAsync = createAsyncThunk(
  "about/fetchFreqDetails",
  async ({adminid,token}) => {
    const response = await fetchFreqDetails({adminid,token});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCreateFreqBlogAsync = createAsyncThunk(
    "about/fetchCreateFreqBlog",
    async (formData) => {
   
      const response = await fetchCreateFreqBlog(formData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchFreqEditAsync = createAsyncThunk(
    "about/fetchFreqEdit",
    async (formData) => {
      const response = await fetchFreqEdit(formData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchFreqDeleteAsync = createAsyncThunk(
    "about/fetchFreqDelete",
    async ({id,token,adminid}) => {
      
      const response = await fetchFreqDelete({id,token,adminid});

      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );



const freqSlice = createSlice({
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
    openEditModalFunc:(state,action)=>{
      state.editModal = !state.editModal
    },
    openDeleteModalFunc:(state,action)=>{
      state.deleteModal = !state.deleteModal
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFreqDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchFreqDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      }).addCase(fetchCreateFreqBlogAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCreateFreqBlogAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      }).addCase(fetchFreqEditAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchFreqEditAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      })
  },
});

export const { loaderchange ,openDeleteModalFunc ,openEditModalFunc} = freqSlice.actions;

export default freqSlice.reducer;
