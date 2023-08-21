const initialState = {
  postDetails: null,
  isLoading: false,
  error: null,
  posts: [],
};

export const postDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'postDetails/setIsLoading': {
      return { ...state, isLoading: action.payload };
    }
    case 'postDetails/setPostData': {
      return { ...state, postDetails: action.payload };
    }
    case 'postDetails/setError': {
      return { ...state, error: action.payload };
    }
    case 'posts/addPost': {
      return { ...state, posts: [...state.posts, action.payload] };
    }
    case 'posts/deletePost': {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    }

    default:
      return state;
  }
};
