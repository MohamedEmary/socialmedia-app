import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Comment,
  CommentRequest,
  CommentResponse,
  PostResponse,
  Post as PostType,
} from "@/app/types/post.types";
import { myInfo } from "@/app/types/other.type";
import { RootState } from "./ReduxStore";

interface InitialState {
  allPosts: null | PostType[];
  myPosts: null | PostType[];
  isLoading: boolean;
  isError: boolean;
  postComments: null | Comment[];
  singlePost: null | PostType;
  myInfo: null | myInfo;
}

const initialState: InitialState = {
  allPosts: null,
  myPosts: null,
  isLoading: false,
  isError: false,
  postComments: null,
  singlePost: null,
  myInfo: null,
};

interface getMyPostsArgs {
  id: string;
  limit?: number;
}

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (id: string, { getState }) => {
    const token = (getState() as RootState).auth.userToken;
    const config = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      headers: {
        token: token,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data as PostResponse)
      .catch((error) => {
        throw error;
      });
  }
);

export const getMyData = createAsyncThunk(
  "posts/getMyData",
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.userToken;
    const config = {
      url: `https://linked-posts.routemisr.com/users/profile-data`,
      headers: {
        token: token,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data as myInfo)
      .catch((error) => {
        throw error;
      });
  }
);

export const getMyPosts = createAsyncThunk(
  "posts/getMyPosts",
  async ({ id, limit = 25 }: getMyPostsArgs, { getState }) => {
    const token = (getState() as RootState).auth.userToken;
    const config = {
      url: `https://linked-posts.routemisr.com/users/${id}/posts?limit=${limit}`,
      headers: {
        token: token,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data.posts.reverse() as PostType[])
      .catch((error) => {
        throw error;
      });
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (limit: number = 25, { getState }) => {
    const token = (getState() as RootState).auth.userToken;
    const config = {
      url: `https://linked-posts.routemisr.com/posts?limit=${limit}`,
      headers: {
        token: token,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data.posts.reverse() as PostType[])
      .catch((error) => {
        throw error;
      });
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (data: CommentRequest, { getState }) => {
    const token = (getState() as RootState).auth.userToken;
    const config = {
      method: "post",
      url: "https://linked-posts.routemisr.com/comments",
      headers: {
        token: token,
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => response.data as CommentResponse)
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

    // ===========================================================

    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.singlePost = action.payload.post;
    });
    builder.addCase(getSinglePost.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getSinglePost.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // ===========================================================

    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.myPosts = action.payload;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(getMyPosts.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getMyPosts.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // ===========================================================

    builder.addCase(getMyData.fulfilled, (state, action) => {
      state.myInfo = action.payload;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(getMyData.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getMyData.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
