import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  fetchCreatefundraisingBlog, fetchFundraisingDetails ,fetchfundraisingDelete,fetchfundraisingEdit} from "./fundraisingApi";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  error: "",
  message: "",
  isloading: true,
  editModal:false,
  deleteModal:false
};

export const fetchFundraisingDetailsAsync = createAsyncThunk(
  "fundraising/fetchFundraisingDetails",
  async ({token, adminid}) => {
    const response = await fetchFundraisingDetails({token,adminid});
    return response.data;
  }
);

export const fetchcreateFundraisingDetailsAsync = createAsyncThunk(
    "fundraising/fetchCreatefundraisingBlog",
    async (datas) => {
      
      const response = await fetchCreatefundraisingBlog(datas);
      return response.data;
    }
  );

  export const fetchfundraisingEditAsync = createAsyncThunk(
    "fundraising/fetchfundraisingEdit",
    async (formData) => {
      
      const response = await fetchfundraisingEdit(formData);
      return response.data;
    }
  );
  export const fetchfundraisingDeleteAsync = createAsyncThunk(
    "fundraising/fetchfundraisingDelete",
    async ({id,token,adminid}) => {
    
      const response = await fetchfundraisingDelete({id,token,adminid});
      return response.data;
    }
  );



const fundraisingSlice = createSlice({
  name: "fundraising",
  initialState,
  reducers: {
    loaderchange: (state, action) => {
      if (action.payload === "chnage") {
        state.isloading = !state.isloading;
      } else {
        state.isloading = false;
      }
    },
    openEditModalFunc :(state,action)=>{
      state.editModal = !state.editModal
    },
    openDeleteModalFunc:(state,action)=>{
      state.deleteModal = !state.deleteModal
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFundraisingDetailsAsync.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchFundraisingDetailsAsync.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
      }).addCase(fetchcreateFundraisingDetailsAsync.pending,(state)=>{
        state.isloading = true;
      }).addCase(fetchcreateFundraisingDetailsAsync.fulfilled,(state,action)=>{
        state.isloading = false;
        state.data = action.payload
      }).addCase(fetchfundraisingEditAsync.pending,(state)=>{
        state.isloading = true;
      }).addCase(fetchfundraisingEditAsync.fulfilled,(state,action)=>{
        state.isloading = false;
        state.editModal = false
      }).addCase(fetchfundraisingDeleteAsync.pending,(state)=>{
        state.isloading = true;
      }).addCase(fetchfundraisingDeleteAsync.fulfilled,(state,action)=>{
        state.isloading = false;
        state.deleteModal = false
      })
  },
});

export const { loaderchange , openDeleteModalFunc,openEditModalFunc } = fundraisingSlice.actions;

export default fundraisingSlice.reducer;
