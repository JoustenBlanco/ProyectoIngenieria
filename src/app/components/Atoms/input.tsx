import React from 'react';
import {InputProps} from "../../../../types";

const Input: React.FC<InputProps> = ({ id, name, type, label, placeholder, required, className }) => {
  return (
    <div className={`mb-7 ${className}`}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full bg-gray-100 border-2 border-gray-100 rounded-md focus:border-blue-100 focus:ring-blue-200 shadow-sm text-lg h-10 hover:border-gray-200"
        required={required}
      />
    </div>
  );
};

export default Input;
