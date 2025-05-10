"use client";
import React from 'react';

const Icon: React.FC<{ type: 'user' | 'section' | 'history' }> = ({ type }) => {
  switch (type) {
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a5 5 0 1110 0A5 5 0 015 10zm0 6a6 6 0 0110 0H5z" clipRule="evenodd" />
        </svg>
      );
    case 'section':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 102 0V5a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v10a1 1 0 102 0V5a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v10a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case 'history':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 10a5 5 0 1110 0A5 5 0 015 10zm5 4a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-4-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
  }
};

export default Icon;