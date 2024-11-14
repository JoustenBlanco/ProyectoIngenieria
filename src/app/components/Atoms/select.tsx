"use client";
import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
interface SelectOption {
  label: string;
  value: any;
}interface SelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  options: string[] | SelectOption[];
  required?: boolean;
  register: UseFormRegister<T>;
  error?: string;
  value?: string; 
}

const Select = <T extends FieldValues>({
  id,
  label,
  options,
  required = false,
  register,
  error,
  value,
}: SelectProps<T>) => {
  return (
    <div className="mb-7">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>
      <select
        id={id}
        {...register(id, { required: required ? "Este campo es obligatorio" : false })}
        value={value}
        className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-md focus:border-blue-100 focus:ring-blue-200 shadow-sm text-lg h-10 hover:border-gray-200 dark:text-gray-400"
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) =>
        typeof option === 'string' ? (
          <option key={option} value={option}>
            {option}
          </option>
        ) : (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
      )}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
