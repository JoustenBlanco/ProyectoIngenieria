import React from "react";

interface Guardian {
  Id_encargado_legal: number;
  Primer_nombre: string;
  Segundo_nombre?: string;
  Primer_apellido: string;
  Segundo_apellido?: string;
  Email: string;
  Numero_telefono: string;
  Estado: string;
}

interface GuardianListItemProps {
    guardian: Guardian;
  onSelect: () => void;
}

const GuardianListItem: React.FC<GuardianListItemProps> = ({ guardian, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {guardian.Primer_nombre} {guardian.Primer_apellido}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{guardian.Email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{guardian.Estado}</p>
    </div>
  );
};

export default GuardianListItem;
