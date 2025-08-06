import React from 'react';
import './styles/InputBar.css';

function InputBar({ placeholder, value, onChange, buttonText, onButtonClick }) {
  return (
    <div className="input-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {buttonText && (
        <button onClick={onButtonClick}>{buttonText}</button>
      )}
    </div>
  );
}

export default InputBar;