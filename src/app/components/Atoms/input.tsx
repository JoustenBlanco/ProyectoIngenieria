"use client";
import React from 'react';
import { InputProps } from "../../../../types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  id,
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
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`mt-1 block w-full bg-gray-100 border-2 ${error ? 'border-red-500' : 'border-gray-100'} rounded-md focus:border-blue-100 focus:ring-blue-200 shadow-sm text-lg h-10 hover:border-gray-200`}
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
