import React, { useEffect, useRef, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { fetchPostDetails } from 'services/api';
import CommentsPage from './CommentsPage';

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  console.log('location: ', location);
  const backLinkHref = useRef(location.state?.from ?? "/")

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setIsLoading(true);

        const postDetails = await fetchPostDetails(postId);
        setPostData(postDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div>
      <h1>PostDetailsPage</h1>
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
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {postData !== null && (
        <div>
          <Link to={backLinkHref.current}>{"<--"} Go Back</Link>
          <p>Id: {postData.id}</p>
          <h2>Title: {postData.title}</h2>
          <p>Body: {postData.body}</p>
        </div>
      )}
      <div>
        <Link to="comments">Comments</Link>
      </div>
      <Routes>
        <Route path="comments" element={<CommentsPage />}/>
      </Routes>
      {/* CommentsPage */}
    </div>
  );
};

export default PostDetailsPage;
