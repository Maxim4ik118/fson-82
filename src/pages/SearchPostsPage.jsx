import PostsList from 'components/PostsList/PostsList';
import React, { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';
import { fetchPostDetails } from 'services/api';

const SearchPostsPage = () => {
  const [searchPosts, setSearchPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.get('query');



  useEffect(() => {
    if (!queryString) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const posts = await fetchPostDetails(queryString);
        setSearchPosts([posts]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [queryString]);

  const handleSubmit = event => {
    event.preventDefault();

    const searchValue = event.currentTarget.elements.searchValue.value;
    setSearchParams({
      query: searchValue,
    })
  };

  return (
    <div>
      <h1>SearchPostsPage</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchValue"
          defaultValue={queryString ?? ''}
          required
          placeholder="Enter post id..."
        />
        <button type="submit">Search</button>
      </form>
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
      <PostsList posts={searchPosts} />
    </div>
  );
};

export default SearchPostsPage;
