import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postsState } from '../types'
import { posts } from '../../provider/API'

// Define the initial state using that type
const initialState: postsState = {
  list: [],
  selected_post: {
    id: "",
    title: "",
    content: ""
  }
}

// getting data of post
export const getPosts = createAsyncThunk(
  'posts/getdata',
  async () => {
    const response = await posts.getData();
    return response.data;
  }
);

// get post data by post_id
export const getPostByPid = createAsyncThunk(
  'posts/getdataByPid',
  async (pId: string | undefined) => {
    const response = await posts.getDataById(pId);
    return response.data;
  }
);

// update post data by post-id
export const savePostByPid = createAsyncThunk(
  'posts/savePostByPid',
  async (data: any) => {
    if (data.id === "new") {
      let response = await posts.saveNewData(data);
      return response.data;
    } else {
      let response = await posts.saveDataByPid(data.id, data);
      return response.data;
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    savePost: (state: any, action: PayloadAction<object>) => { }
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state: any, action) => {
        state.list = action.payload;
      })
      .addCase(getPostByPid.fulfilled, (state: any, action) => {
        state.selected_post = action.payload;
      })
      .addCase(savePostByPid.fulfilled, (state: any) => {
        state.save_success = true;
      })
      .addCase(savePostByPid.rejected, (state: any) => {
        state.save_success = false;
      });
  },
})

export const { savePost } = postsSlice.actions

export default postsSlice.reducer;
