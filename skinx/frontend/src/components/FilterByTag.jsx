import React, { useState } from 'react';
import TagList from './TagList';
import './styles/FilterByTag.css';

function FilterByTag({ filter, onChange, onSearch, availableTags = [], selectedTags = [], onTagToggle }) {
  const [isTagListVisible, setIsTagListVisible] = useState(false);
  
  // Handle key down event for search
  const handleKeyDown = (e) => {
    // Check if Enter key was pressed
    if (e.key === 'Enter') {
      // Prevent default form submission behavior
      e.preventDefault();
      // Call the onSearch function with current filter and selected tags
      onSearch(filter);
    }
  };

  // Toggle tag list visibility
  const toggleTagList = () => {
    setIsTagListVisible(!isTagListVisible);
  };

  // Handle search with both text and tags
  const handleSearch = () => {
    onSearch(filter);
  };

  return (
    <div className="filter-section">
      <h3>Search & Filter</h3>
      <div className="filter-controls">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search by title, content or author..."
            value={filter}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          
          <button 
            onClick={toggleTagList} 
            className={`filter-button ${isTagListVisible ? 'active' : ''}`}
            title="Filter by tags"
          >
            Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
          </button>
          
          <button onClick={handleSearch} className="search-button">
            {selectedTags.length > 0 ? 'Apply Search & Filters' : 'Search'}
          </button>
        </div>
        
        {selectedTags.length > 0 && (
          <div className="selected-tags">
            <span>{selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected - click Search to apply</span>
          </div>
        )}
      </div>
      
      <div className="tag-list-container">
        <TagList 
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagToggle={onTagToggle}
          isVisible={isTagListVisible}
        />
      </div>
    </div>
  );
}

export default FilterByTag;