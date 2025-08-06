import React from 'react';
import PostBox from './PostBox';
import './styles/PostsList.css';

function PostsList({ posts, onViewPost, loading, error }) {
  if (loading) {
    return <p>Loading posts...</p>;
  }
  
  if (error) {
    return <p className="error">{error}</p>;
  }
  
  if (posts.length === 0) {
    return <p>No posts found</p>;
  }
  
  return (
    <div className="posts-list">
      {posts.map(post => (
        <PostBox 
          key={post.id} 
          post={post} 
          onClick={onViewPost}
        />
      ))}
    </div>
  );
}

export default PostsList;