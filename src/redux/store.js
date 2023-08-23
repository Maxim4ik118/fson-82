import { configureStore } from "@reduxjs/toolkit";

import { postDetailsReducer } from './postDetailsReducer';

export const store = configureStore({
  reducer: {
    postDetails: postDetailsReducer,
  },
});