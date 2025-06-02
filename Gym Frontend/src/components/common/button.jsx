import React from 'react';

export function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
