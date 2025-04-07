"use client";
import React from 'react';
import { InputProps } from "../../../../types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  id,
  pattern,
  name,
  type,
  label,
  placeholder,
  required,
  className,
  value,
  onChange,
  error
}, ref) => {
  return (
    <div className={`mb-7 ${className}`}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        id={id}
        pattern={pattern}	
        name={name}
        placeholder={placeholder}
        className={`mt-1 block w-full bg-gray-100 dark:bg-gray-800 border-2 ${error ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} rounded-md focus:border-blue-100 dark:focus:border-blue-900 focus:ring-blue-200 dark:focus:ring-blue-900 shadow-sm text-lg h-10 hover:border-gray-200 dark:text-gray-400`}
        required={required}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
