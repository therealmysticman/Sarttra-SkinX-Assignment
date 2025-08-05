function PostDetailPage({ post, onBack, onFilterByTag, isLoggedIn, onLogout }) {
  return (
    <div className="post-detail-page">
      <header>
        <h1>SkinX Blog</h1>
        {isLoggedIn && (
          <div className="user-info">
            <span>Welcome, User!</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </header>

      <div className="content">
        <div className="main-content">
          <div className="post-detail">
            <button onClick={onBack} className="back-button">Back to Posts</button>
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span>Posted: {new Date(post.postedAt).toLocaleDateString()}</span>
              <span>By: {post.postedBy}</span>
            </div>
            <div className="tags">
              {post.tags && post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="tag" 
                  onClick={() => onFilterByTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div 
              className="post-content" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;