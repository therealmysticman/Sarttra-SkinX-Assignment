import React from 'react';
import Button from './Button';
import './styles/Pagination.css';

function Pagination({ currentPage, totalPages, paginate, prevPage, nextPage }) {
  return (
    <div className="pagination">
      <Button 
        text="&lt; Previous" 
        onClick={prevPage} 
        disabled={currentPage === 1}
        className={currentPage === 1 ? "disabled" : ""}
      />
      
      <div className="page-numbers">
        {/* Always show first page */}
        {currentPage > 3 && (
          <Button
            text="1"
            onClick={() => paginate(1)}
            className={currentPage === 1 ? "active" : ""}
          />
        )}
        
        {/* Show ellipsis if not near the beginning */}
        {currentPage > 4 && <span className="ellipsis">...</span>}
        
        {/* Show page before current if not first page */}
        {currentPage > 1 && (
          <Button
            text={currentPage - 1}
            onClick={() => paginate(currentPage - 1)}
          />
        )}
        
        {/* Current page */}
        <Button 
          text={currentPage}
          onClick={() => {}}
          className="active"
        />
        
        {/* Show page after current if not last page */}
        {currentPage < totalPages && (
          <Button
            text={currentPage + 1}
            onClick={() => paginate(currentPage + 1)}
          />
        )}
        
        {/* Show ellipsis if not near the end */}
        {currentPage < totalPages - 3 && <span className="ellipsis">...</span>}
        
        {/* Always show last page if not already shown */}
        {currentPage < totalPages - 2 && (
          <Button
            text={totalPages}
            onClick={() => paginate(totalPages)}
            className={currentPage === totalPages ? "active" : ""}
          />
        )}
      </div>
      
      <Button 
        text="Next &gt;" 
        onClick={nextPage} 
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "disabled" : ""}
      />
    </div>
  );
}

export default Pagination;