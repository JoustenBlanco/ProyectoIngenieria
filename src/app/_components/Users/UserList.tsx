import React, { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import DarkModeWrapper from "../DarkModeWreapper/DarkModeWrapper";

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

interface UserListProps {
  onClose: () => void;
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onClose, onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/funcionarios");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error("Error al obtener los usuarios");
        }
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DarkModeWrapper>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 w-4/5 max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Lista de Usuarios
          </h2>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <p className="text-center text-gray-600 dark:text-gray-300">Cargando...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {users.map((user) => (
                  <UserListItem
                    key={user.Id_funcionario}
                    user={user}
                    onSelect={() => {
                      onSelectUser(user); // Llamada a onSelectUser al hacer clic
                      onClose(); // Cierra el modal al seleccionar un usuario
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition duration-150"
          >
            Cerrar
          </button>
        </div>
      </div>
    </DarkModeWrapper>
  );
};

export default UserList;
