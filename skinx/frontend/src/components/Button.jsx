import React from 'react';
import './styles/Button.css';

function Button({ text, onClick, disabled, className }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={className}
    >
      {text}
    </button>
  );
}

export default Button;