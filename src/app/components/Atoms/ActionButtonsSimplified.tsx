import React from 'react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete, onSubmit }) => {
  return (
    <div className="flex space-x-2 justify-end items-end">
      {/* Botón para Editar */}
      {onEdit && (
        <button
          type="button"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded dark:bg-cyan-500 dark:hover:bg-cyan-600"
          onClick={onEdit}
        >
          Editar
        </button>
      )}

      {/* Botón para Eliminar */}
      {onDelete && (
        <button
          type="button"
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded dark:bg-red-700 dark:hover:bg-red-800"
          onClick={onDelete}
        >
          Eliminar
        </button>
      )}

      {/* Botón para Enviar (Submit) */}
      {onSubmit && (
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={onSubmit}
        >
          Guardar
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
