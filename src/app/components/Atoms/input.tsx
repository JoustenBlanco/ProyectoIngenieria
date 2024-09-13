import React from 'react';
import {InputProps} from "../../../../types";

const Input: React.FC<InputProps> = ({ id, name, type, label, placeholder, required, className }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
        required={required}
      />
    </div>
  );
};

export default Input;
