import React from 'react';
import './styles/PostBox.css';

function PostBox({ post, onClick }) {
  return (
    <div className="post-card" onClick={() => onClick(post)}>
      <h3>{post.title}</h3>
      <div className="post-meta">
        <span>Posted: {new Date(post.postedAt).toLocaleDateString()}</span>
        <span>By: {post.postedBy}</span>
      </div>
      <div className="tags">
        {post.tags && post.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default PostBox;