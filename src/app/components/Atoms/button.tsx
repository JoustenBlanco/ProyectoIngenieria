"use client";
import React from 'react';

const Button: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => {
  return (
    <button className="flex items-center w-full p-4 bg-gray-400 hover:bg-gray-500 rounded-md">
      <span className="mr-4">{icon}</span>
      {text}
    </button>
  );
};

export default Button;