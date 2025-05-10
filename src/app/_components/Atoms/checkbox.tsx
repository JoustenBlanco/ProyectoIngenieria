"use client";
import React from "react";

interface ButtonProps {
  name: string;
  iconName: string;
  bgColor: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  name,
  iconName,
  bgColor,
  onClick,
}) => {
  return (
    <div className="flex items-center mb-6">
      <input
        type="checkbox"
        id="check"
        name="check"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label
        htmlFor="check"
        className="ml-2 text-lg font-medium text-gray-700"
      >
        Recordarme
      </label>
    </div>
  );
};

export default Button;
