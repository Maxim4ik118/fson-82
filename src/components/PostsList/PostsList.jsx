import PostListItem from 'components/PostListItem/PostListItem';
import React from 'react';

const PostsList = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 &&
        posts.map(post => (
          <PostListItem key={post.id} post={post}  />
        ))}
    </div>
  );
};

export default PostsList;
