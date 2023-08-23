import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postDetails: null,
  isLoading: false,
  error: null,
  posts: [],
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState: initialState,
  reducers: {
    setIsLoading(state, { payload }) {
      state.isLoading = payload; // return { ...state, isLoading: action.payload };
    },
    setPostData(state, action) {
      state.postDetails = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
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
});

// Генератори екшенів
export const { setIsLoading, setPostData, setError, addPost, deletePost } =
  postDetailsSlice.actions;

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
