"use client";
import React from "react";

interface DateInputProps {
  id: string;
  label: string;
  required?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(({
  id,
  label,
  required = false,
  value = "",
  onChange,
  error,
}, ref) => {
  
  const formattedValue = value ? new Date(value).toISOString().split('T')[0] : '';

  return (
    <div className="mb-7">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>
      <input
        ref={ref}
        type="date"
        id={id}
        name={id}
        value={formattedValue}  
        onChange={onChange}
        required={required}
        className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-md focus:border-blue-100 focus:ring-blue-200 shadow-sm text-lg h-10 hover:border-gray-200 dark:text-gray-400"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
