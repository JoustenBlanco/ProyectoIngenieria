import React, { useEffect, useState } from "react";
import GuardianListItem from "./GuardiansListItem";
import DarkModeWrapper from "../DarkModeWreapper/DarkModeWrapper";

interface Guardian {
  Id_encargado_legal: number;
  Primer_nombre: string;
  Segundo_nombre?: string;
  Primer_apellido: string;
  Segundo_apellido?: string;
  Correo: string;
  Numero_telefono: string;
  Estado: string;
  Cedula?: string;
}

interface GuardianListProps {
  onClose: () => void;
  onSelectGuardian: (guardian: Guardian) => void;
}

const GuardianList: React.FC<GuardianListProps> = ({
  onClose,
  onSelectGuardian,
}) => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        const response = await fetch(
          `/api/encargados_legales/like?cedula=${searchValue}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setGuardians(data);
        } else {
          throw new Error("Error al obtener los encargados");
        }
      } catch (err) {
        console.log("Hubo un problema al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuardians();
  }, [searchValue]);

  return (
    <DarkModeWrapper>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 w-4/5 max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Lista de Encargados
          </h2>

          <input
            type="text"
            placeholder={"Buscar por cédula..."}
            className="w-full p-2 mb-4 border rounded-md dark:bg-gray-800"
            value={searchValue || ""}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />

          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              Cargando...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-1 max-h55vh">
              {guardians.length === 0 ? (
                <div className="p-2 text-gray-500 dark:text-gray-400">
                  <p>No se encontraron resultados</p>
                </div>
              ) : (
                guardians
                  .filter(
                    (guardian) =>
                      searchValue === "" ||
                      (guardian.Cedula &&
                        guardian.Cedula.toLowerCase().includes(
                          searchValue.toLowerCase()
                        ))
                  )
                  .map((guardian) => (
                    <GuardianListItem
                      key={guardian.Id_encargado_legal}
                      guardian={guardian}
                      onSelect={() => {
                        onSelectGuardian(guardian);
                        onClose();
                      }}
                    />
                  ))
              )}
            </div>
          )}
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

export default GuardianList;
