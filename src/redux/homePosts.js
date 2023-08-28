import { createSlice } from '@reduxjs/toolkit';
import { requestHomePosts } from './operations';

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
};

const homePostsSlice = createSlice({
  name: 'homePosts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(requestHomePosts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestHomePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(requestHomePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

// Селектори
export const selectHomePosts = state => state.homePosts.posts;
export const selectHomePostsIsLoading = state => state.homePosts.isLoading;
export const selectHomePostsError = state => state.homePosts.error;

// Редюсер слайсу
export const homePostsReducer = homePostsSlice.reducer;
