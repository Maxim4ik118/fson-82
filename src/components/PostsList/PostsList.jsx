import PostListItem from 'components/PostListItem/PostListItem';
import React from 'react';

const PostsList = ({ posts }) => {
  const showPosts = Array.isArray(posts) && posts.length > 0;
  return (
    <div>
      {showPosts &&
        posts.map(post => <PostListItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostsList;
