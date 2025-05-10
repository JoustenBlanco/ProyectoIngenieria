"use client";
import React from 'react';
import Navbar from '../navbar';

const Header = () => {
  return (
    <header className="bg-blue-900 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">RAE LSP</h1>
      <Navbar />
    </header>
  );
};

export default Header;
