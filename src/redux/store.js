import { configureStore } from "@reduxjs/toolkit";

import { postDetailsReducer } from './postDetailsReducer';
import { homePostsReducer } from "./homePosts";

export const store = configureStore({
  reducer: {
    postDetails: postDetailsReducer,
    homePosts: homePostsReducer
  },
});