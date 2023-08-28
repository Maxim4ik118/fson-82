import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "services/api";

export const requestHomePosts = createAsyncThunk(
    'homePosts/requestHomePosts',
    async (_, thunkApi) => {
      try {
        const posts = await fetchPosts();

        return posts;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    },
    {
      condition: (_, thunkApi) => {
        const state = thunkApi.getState();
        const isLoading = state.homePosts.isLoading;
  
        if (isLoading === true) return false;
      },
    }
  );