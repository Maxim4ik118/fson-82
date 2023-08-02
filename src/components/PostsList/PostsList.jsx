import PostListItem from 'components/PostListItem/PostListItem';
import React from 'react';

const PostsList = ({ posts, onSelectPostId }) => {
  return (
    <div>
      {posts.length > 0 &&
        posts.map(post => (
          <PostListItem post={post} onSelectPostId={onSelectPostId} />
        ))}
    </div>
  );
};

export default PostsList;
