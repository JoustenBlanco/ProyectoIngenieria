"use client";
import React from "react";

interface ButtonProps {
  type: any;
  name: string;
  iconName: string;
  bgColor: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({type, name, iconName, bgColor, onClick }) => {
  return (
    <button
      type= {type}
      className={`flex items-center px-4 py-2 text-white rounded-md hover:opacity-90 w-60 justify-center`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <img src={`/images/${iconName}.svg`} alt={iconName} className="w-5 h-5 mr-2" />
      <span>{name}</span>
    </button>
  );
};

export default Button;
