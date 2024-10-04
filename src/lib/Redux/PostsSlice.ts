import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Comment,
  CommentRequest,
  Post as PostType,
} from "@/app/types/post.types";

interface InitialState {
  allPosts: null | PostType[];
  isLoading: boolean;
  isError: boolean;
  // postComments: null | Comment[];
}

const initialState: InitialState = {
  allPosts: null,
  isLoading: false,
  isError: false,
  // postComments: null,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  (limit: number = 25) => {
    const config = {
      url: `https://linked-posts.routemisr.com/posts?limit=${limit}`,
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    return axios
      .request(config)
      .then((response) => response.data.posts as PostType[])
      .catch((error) => {
        throw error;
      });
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  (data: CommentRequest) => {
    const config = {
      method: "post",
      url: "https://linked-posts.routemisr.com/comments",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(getPosts.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // ===========================================================

    builder.addCase(addComment.fulfilled, (state) => {
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
