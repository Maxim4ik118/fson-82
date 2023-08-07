import React from 'react';
import { Link } from 'react-router-dom';

const PostListItem = ({ post }) => {
  return (
    <li>
      <Link className="post" to={`/posts/${post.id}`}>
        <strong>Id: {post.id}</strong>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </Link>
    </li>
  );
};

export default PostListItem;
