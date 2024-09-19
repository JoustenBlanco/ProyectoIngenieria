"use client";
import React from "react";

interface DateInputProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  label,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="mb-7">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full bg-gray-100 border-2 border-gray-100 rounded-md focus:border-blue-100 focus:ring-blue-200 shadow-sm text-lg h-10 hover:border-gray-200"
      />
    </div>
  );
};

export default DateInput;
