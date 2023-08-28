import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

import {
  requestPosts,
  selectPostDetails,
  selectPostDetailsError,
  selectPostDetailsIsLoading,
} from 'redux/postDetailsReducer';

const CommentsPage = lazy(() => import('./CommentsPage'));

// const toastConfig = {
//   position: 'top-center',
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: 'dark',
// };

const PostDetails = () => {
  const postDetails = useSelector(selectPostDetails);
  const isLoading = useSelector(selectPostDetailsIsLoading);
  const error = useSelector(selectPostDetailsError);
  const dispatch = useDispatch();

  const { postId } = useParams();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(requestPosts(postId))
  }, [postId, dispatch]);
  

  const backLinkHref = useRef(location.state?.from ?? '/');
  return (
    <div>
      <h1>PostDetails</h1>
      <Link to={backLinkHref.current}>Go back</Link>
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && (
        <MutatingDots
          height="100"
          width="100"
          color="#5800a5"
          secondaryColor="#e08e00"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {postDetails && (
        <div>
          <h2>Title: {postDetails.title}</h2>
          <p>ID: {postDetails.id}</p>
          <p>Body: {postDetails.body}</p>
          <div>
            <NavLink to="comments">Comments</NavLink>
            {/* /posts/:postId/comments */}
            <NavLink to="/comments">Comments</NavLink>
            {/* /comments */}
          </div>
        </div>
      )}
      <Suspense
        fallback={
          <MutatingDots
            height="100"
            width="100"
            color="#5800a5"
            secondaryColor="#e08e00"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        }
      >
        <Routes>
          <Route path="comments" element={<CommentsPage />} />
        </Routes>{' '}
      </Suspense>
    </div>
  );
};

export default PostDetails;
