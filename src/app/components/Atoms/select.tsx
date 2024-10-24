"use client";
import React from 'react';

interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  id,
  name,
  label,
  options,
  required = false,
  className,
  value = "",
  onChange,
  error,
}, ref) => {
  return (
    <div className={`mb-7 ${className}`}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        name={name}
        className="mt-1 block w-full bg-gray-100 border-2 border-gray-100 rounded-md focus:border-blue-100 focus:ring-blue-200 shadow-sm text-lg h-10 hover:border-gray-200"
        required={required}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select'; // Para facilitar el debugging

export default Select;
