import React, { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';

import PostsList from 'components/PostsList/PostsList';

import { fetchPosts } from 'services/api';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        setIsLoading(true);

        const posts = await fetchPosts();

        setPosts(posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
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
      <PostsList posts={posts} />
    </div>
  );
};

export default HomePage;
