import { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterByTag from '../components/FilterByTag';
import PostsList from '../components/PostsList';
import Pagination from '../components/Pagination';
import './styles/PostListPage.css';
import '../components/styles/CommonBackground.css';

function PostListPage({ onViewPost, isLoggedIn, onLogout }) {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, []);

  // Extract unique tags from posts
  useEffect(() => {
    if (allPosts.length > 0) {
      const tagsSet = new Set();
      allPosts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => tagsSet.add(tag));
        }
      });
      setAvailableTags(Array.from(tagsSet).sort());
      setFilteredPosts(allPosts);
    }
  }, [allPosts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setAllPosts(data);
      setFilteredPosts(data);
      setCurrentPage(1); // Reset to first page when fetching new posts
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle tag selection without immediate search
  const handleTagSelection = (tag) => {
    setSelectedTags(prevTags => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag];
      
      // No automatic search - will apply when search button is clicked
      return newTags;
    });
  };

  // Search posts by title or content and apply tag filters
  const searchPosts = (term) => {
    setSearchTerm(term);
    
    // Start with all posts
    let filtered = allPosts;
    
    // Apply search term filter if present
    if (term.trim()) {
      const searchLower = term.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.postedBy.toLowerCase().includes(searchLower) ||
        post.postedAt.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply tag filters if any are selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => {
        if (!post.tags) return false;
        return selectedTags.every(tag => post.tags.includes(tag));
      });
    }
      
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };


  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
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

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="post-list-page">
      <div className="animated-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="content">
        <div className="main-content">
          
          <FilterByTag 
            filter={searchTerm}
            onChange={handleSearchChange}
            onSearch={searchPosts}
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagSelection}
          />
          
          <h2 className="section-title">
            {filteredPosts.length === allPosts.length 
              ? 'All Posts' 
              : `Filtered Posts (${filteredPosts.length})`}
          </h2>
          
          <PostsList 
            posts={currentPosts}
            onViewPost={onViewPost}
            loading={loading}
            error={error}
          />
              
          {filteredPosts.length > postsPerPage && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostListPage;