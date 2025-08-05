import { useState, useEffect } from 'react';

function PostListPage({ onViewPost, isLoggedIn, onLogout }) {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setAllPosts(data);
      setCurrentPage(1); // Reset to first page when fetching new posts
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Filter posts by tag
  const filterPostsByTag = async (tag) => {
    if (!tag) {
      fetchPosts();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/posts/tag/${tag}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setAllPosts(data);
      setCurrentPage(1); // Reset to first page when filtering
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calculate total pages
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle post creation
  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          postedBy: 'User'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Reset form and fetch updated posts
      setFormData({ title: '', content: '', tags: '' });
      fetchPosts();
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Apply filter
  const handleApplyFilter = () => {
    filterPostsByTag(filter);
  };

  return (
    <div className="post-list-page">
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
          {isLoggedIn && (
            <div className="create-post">
              <h3>Create New Post</h3>
              <form onSubmit={handleCreatePost}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content (HTML allowed)"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                <button type="submit">Create Post</button>
              </form>
            </div>
          )}
          
          <div className="filter-section">
            <h3>Filter by Tag</h3>
            <div className="filter-input">
              <input
                type="text"
                placeholder="Enter tag"
                value={filter}
                onChange={handleFilterChange}
              />
              <button onClick={handleApplyFilter}>Apply</button>
            </div>
          </div>
          
          <h2 className="section-title">Recent Posts</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <div className="posts-list">
                {allPosts.length === 0 ? (
                  <p>No posts found</p>
                ) : currentPosts.length === 0 ? (
                  <p>No posts on this page</p>
                ) : (
                  currentPosts.map(post => (
                    <div key={post.id} className="post-card" onClick={() => onViewPost(post)}>
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
                  ))
                )}
              </div>
              
              {allPosts.length > postsPerPage && (
                <div className="pagination">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "disabled" : ""}
                  >
                    &lt; Previous
                  </button>
                  
                  <div className="page-numbers">
                    {/* Always show first page */}
                    {currentPage > 3 && (
                      <button
                        onClick={() => paginate(1)}
                        className={currentPage === 1 ? "active" : ""}
                      >
                        1
                      </button>
                    )}
                    
                    {/* Show ellipsis if not near the beginning */}
                    {currentPage > 4 && <span className="ellipsis">...</span>}
                    
                    {/* Show page before current if not first page */}
                    {currentPage > 1 && (
                      <button
                        onClick={() => paginate(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </button>
                    )}
                    
                    {/* Current page */}
                    <button className="active">
                      {currentPage}
                    </button>
                    
                    {/* Show page after current if not last page */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => paginate(currentPage + 1)}
                      >
                        {currentPage + 1}
                      </button>
                    )}
                    
                    {/* Show ellipsis if not near the end */}
                    {currentPage < totalPages - 3 && <span className="ellipsis">...</span>}
                    
                    {/* Always show last page if not already shown */}
                    {currentPage < totalPages - 2 && (
                      <button
                        onClick={() => paginate(totalPages)}
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "disabled" : ""}
                  >
                    Next &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostListPage;