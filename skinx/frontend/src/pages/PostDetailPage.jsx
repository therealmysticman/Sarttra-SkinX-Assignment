import Header from '../components/Header';
import '../components/styles/PostDetail.css';
import './styles/PostDetailPage.css';
import '../components/styles/CommonBackground.css';

function PostDetailPage({ post, onBack, onFilterByTag, isLoggedIn, onLogout }) {
  return (
    <div className="post-detail-page">
      <div className="animated-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="content">
        <div className="main-content">
          <div className="post-detail">
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
          <button onClick={onBack} className="back-button">Back to Posts</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;