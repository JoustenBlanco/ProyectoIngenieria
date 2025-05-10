'use client';

import React from 'react';


const ExcelFilePicker = ( {onFileLoaded} : {onFileLoaded: (file: ArrayBuffer) => void}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    onFileLoaded(arrayBuffer);
  };

  return (
    <div className='flex space-x-2 justify-end items-end'>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded dark:bg-green-500 dark:hover:bg-green-600 cursor-pointer"
      >
        Seleccionar archivo Excel
      </label>
    </div>
  );
};

export default ExcelFilePicker;
