import React, { useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectHomePosts,
  selectHomePostsError,
  selectHomePostsIsLoading,
} from 'redux/homePosts';
import { requestHomePosts } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';

const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectHomePostsIsLoading);
  const posts = useSelector(selectHomePosts);
  const error = useSelector(selectHomePostsError);

  useEffect(() => {
    dispatch(requestHomePosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Мій олюблений Реакт😂</h1>
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && <Loader />}

      {posts.length > 0 &&
        posts.map(post => {
          return (
            <Link className="post" key={post.id} to={`/posts/${post.id}`}>
              <strong>Id: {post.id}</strong>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default HomePage;
