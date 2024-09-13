import React from 'react';
import IconButton from '../Atoms/button_icons';

const ReportsOptions = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 space-y-4">
      <IconButton iconType="user" label="Estudiante por materia" />
      <IconButton iconType="section" label="Sección por materia" />
      <IconButton iconType="history" label="Histórico" />
    </div>
  );
};

export default ReportsOptions;