import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const requestPosts = createAsyncThunk(
  'postDetails/requestPosts',
  async (postId, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${JSON_PLACEHOLDER_BASE_URL}/posts/${postId}`
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (postId, thunkApi) => {
      const state = thunkApi.getState();
      const isLoading = state.postDetails.isLoading;

      if (postId === null || isLoading === true) return false;
    },
  }
);

const initialState = {
  postDetails: null,
  isLoading: false,
  error: null,
  posts: [],
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts = [...state.posts, action.payload];
      // state.posts.push(action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      //  const deletedPostIndex = state.posts.findIndex(post => post.id === action.payload);
      //  state.posts.splice(deletedPostIndex, 1);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(requestPosts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetails = action.payload;
      })
      .addCase(requestPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

// Генератори екшенів
export const { addPost, deletePost } = postDetailsSlice.actions;

// Селектори
export const selectPostDetails = state => state.postDetails.postDetails;
export const selectPostDetailsIsLoading = state => state.postDetails.isLoading;
export const selectPostDetailsError = state => state.postDetails.error;

// Редюсер слайсу
export const postDetailsReducer = postDetailsSlice.reducer;

// export const setIsLoading = (payload) => { - Action creator
//   return {
//     type: 'postDetails/setIsLoading',
//     payload
//   }
// }

// export const setIsLoading = (payload) => { - Action creator
//   return {
//     type: 'postDetails/setIsLoading',
//     payload
//   }
// }

// export const setIsLoading = (payload) => { - Action creator
//   return {
//     type: 'postDetails/setIsLoading',
//     payload
//   }
// }

// export const setIsLoading = (payload) => { - Action creator
//   return {
//     type: 'postDetails/setIsLoading',
//     payload
//   }
// }

// export const setIsLoading = (payload) => { - Action creator
//   return {
//     type: 'postDetails/setIsLoading',
//     payload
//   }
// }
// export const postDetailsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'postDetails/setIsLoading': {
//       return { ...state, isLoading: action.payload };
//     }
//     case 'postDetails/setPostData': {
//       return { ...state, postDetails: action.payload };
//     }
//     case 'postDetails/setError': {
//       return { ...state, error: action.payload };
//     }
//     // dispatch({ type: 'posts/addPost', payload: { id: "1", title: "hello", body: "Here goes some text" } })
//     case 'posts/addPost': {
//       return { ...state, posts: [...state.posts, action.payload] };
//     }
//     // dispatch({ type: 'posts/deletePost', payload: "1" })
//     case 'posts/deletePost': {
//       return {
//         ...state,
//         posts: state.posts.filter(post => post.id !== action.payload),
//       };
//     }

//     default:
//       return state;
//   }
// };
