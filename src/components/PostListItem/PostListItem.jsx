import React
// , { useContext } 
from 'react';
// import { PostsContext } from 'context/PostsContextProvider';

const PostListItem = ({ onSelectPostId, post }) => {
//   const { todayDate } = useContext(PostsContext);

  return (
    <button
      className="post"
      onClick={() => onSelectPostId(post.id)}
      type="button"
      key={post.id}
    >
      <strong>Id: {post.id}</strong>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </button>
  );
};

export default PostListItem;
