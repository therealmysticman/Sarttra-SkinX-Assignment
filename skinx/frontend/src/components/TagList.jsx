import React from 'react';
import './styles/TagList.css';

function TagList({ availableTags, selectedTags, onTagToggle, isVisible }) {
  if (!isVisible) return null;
  
  return (
    <div className="tag-list">
      <div className="tag-list-content">
        <h4>Select Tags</h4>
        <div className="tags-container">
          {availableTags.map((tag, index) => (
            <div key={index} className="tag-item">
              <label>
                <input
                  type="checkbox"
                  className="tag-checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onTagToggle(tag)}
                />
                <span>{tag}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagList;