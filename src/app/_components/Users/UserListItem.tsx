import React from "react";

interface User {
  Id_funcionario: number;
  Primer_nombre: string;
  Segundo_nombre?: string;
  Primer_apellido: string;
  Segundo_apellido?: string;
  Email: string;
  Numero_telefono: string;
  Estado: string;
}

interface UserListItemProps {
  user: User;
  onSelect: () => void; // Función para manejar la selección
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {user.Primer_nombre} {user.Primer_apellido}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{user.Email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.Estado}</p>
    </div>
  );
};

export default UserListItem;
