"use client";
import React from 'react';
import Button from './button';

const IconButton: React.FC<{ iconType: 'user' | 'section' | 'history'; label: string }> = ({ iconType, label }) => {
  return (
    <Button
      type="button"
      name={label}
      iconName={iconType}
      bgColor="#007bff"
      onClick={() => {}}
    />
  );
};

export default IconButton;