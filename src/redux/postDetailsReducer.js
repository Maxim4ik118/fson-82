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
    // dispatch({ type: 'posts/addPost', payload: { id: "1", title: "hello", body: "Here goes some text" } })
    case 'posts/addPost': {
      return { ...state, posts: [...state.posts, action.payload] };
    }
    // dispatch({ type: 'posts/deletePost', payload: "1" })
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
