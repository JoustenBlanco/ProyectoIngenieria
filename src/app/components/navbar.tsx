"use client";
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex space-x-4">
      <a href="#" className="hover:underline">Reportes</a>
      <a href="#" className="hover:underline">ATR</a>
      <a href="#" className="hover:underline">Mantenimientos</a>
    </nav>
  );
};

export default Navbar;