import React from 'react';
import { useParams } from 'react-router-dom';

const CommentsPage = () => {
  const { postId } = useParams();

  return <div>CommentsPage Comments for post with id: {postId}</div>;
};

export default CommentsPage;
