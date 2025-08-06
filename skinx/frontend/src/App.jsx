import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'

function App() {
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Handle login
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPost(null);
  };

  // Handle view post details
  const handleViewPost = (post) => {
    setCurrentPost(post);
  };

  // Handle back to posts
  const handleBackToPosts = () => {
    setCurrentPost(null);
  };

    // Render the appropriate page based on state
  const renderPage = () => {
    if (!isLoggedIn) {
      return <LoginPage onLogin={handleLogin} />;
    }

    if (currentPost) {
      return (
        <PostDetailPage
          post={currentPost}
          onBack={handleBackToPosts}
          onFilterByTag={() => {
            setCurrentPost(null);
          }}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      );
    }

    return (
      <PostListPage
        onViewPost={handleViewPost}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
    );
  };

  // Apply different container class for login page
  const containerClass = !isLoggedIn ? "app-container login-container-full" : "app-container";

  return (
    <div className={containerClass}>
      {renderPage()}
    </div>
  )
}

export default App
