import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBlogDetails, fetchEditBlogs, fetchDeleteBlog, fetchCreateBlog } from './blogApi';
import Cookies from 'js-cookie';

const initialState = {
  blogs: [],
  status: 'idle',
  message:null,
  editDataShow:{},
  deleteDataShow:{}
};

// Fetch Blog data APIs Call
export const fetchBlogDetailsAsync = createAsyncThunk(
  'blog/fetchBlogDetails',
  async (token) => {
    const response = await fetchBlogDetails(token);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// Create Blog APIs Call
export const fetchCreateBlogAsync = createAsyncThunk(
  'blog/fetchCreateBlog',
  async (blogData) => {
    const token = Cookies.get("admin_token")
    const response = await fetchCreateBlog(blogData,token);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// Edit Blogs APIs Call
export const fetchEditBlogsAsync = createAsyncThunk(
  'blog/fetchEditBlogs',
  async (blogData) => {
    const response = await fetchEditBlogs(blogData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// Delete Blogs APIs Call
export const fetchDeleteBlogAsync = createAsyncThunk(
  'blog/fetchDeleteBlog',
  async (blogID) => {
    const response = await fetchDeleteBlog(blogID);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    edit_data_show:(state, action) => {
      state.editDataShow = action.payload;
    },
    delete_data_show:(state, action) => {
      state.deleteDataShow = action.payload;
    }
  },

  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.blogs = action.payload
      })
      .addCase(fetchEditBlogsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEditBlogsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload
      })
      .addCase(fetchDeleteBlogAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeleteBlogAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload
      })
      .addCase(fetchCreateBlogAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateBlogAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload
      })
  },
});

export const { edit_data_show, delete_data_show } = blogSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBlogs = (state) => state.blog.blogs;
export const selectStatus = (state) => state.blog.status;
export const selectMessage = (state) => state.blog.message;
export const selectEditDataShow = (state) => state.blog.editDataShow;
export const selectDeleteDataShow = (state) => state.blog.deleteDataShow;

export default blogSlice.reducer;
