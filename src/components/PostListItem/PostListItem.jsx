import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PostListItem = ({ post }) => {
  const location = useLocation();

  return (
    <li>
      <Link
        state={{ from: location }}
        className="post"
        to={`/posts/${post.id}`}
      >
        <strong>Id: {post.id}</strong>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </Link>
    </li>
  );
};

export default PostListItem;
