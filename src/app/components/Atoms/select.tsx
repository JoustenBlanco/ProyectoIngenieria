"use client";
import React from 'react';

interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  required = false,
  className,
  value,
  onChange,
}) => {
  return (
    <div className={`mb-7 ${className}`}>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <select
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
    </div>
  );
};

export default Select;
