import React, { useEffect, useState } from "react";
import ParentListItem from "./ParentListItem";
import DarkModeWrapper from "../DarkModeWreapper/DarkModeWrapper";
import GuardianList from "../../_components/legal_guardians/GuardiansList";

interface StudentListProps {
  onClose: () => void;
  onSelectParents: (selectedParents: Parents[]) => void;
}

const ParentList: React.FC<StudentListProps> = ({
  onClose,
  onSelectParents,
}) => {
  const [parents, setParents] = useState<Parents[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedParents, setSelectedParents] = useState<Parents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetch("/api/encargados_legales");
        if (response.ok) {
          const data = await response.json();
          setParents(data);
        } else {
          throw new Error("Error al obtener la lista de encargados.");
        }
      } catch (err) {
        setError("Hubo un problema al obtener la lista de encargados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParents();
  }, []);

  const toggleSelectParent = (parent: Parents) => {
    setSelectedParents((prevSelected) => {
      const alreadySelected = prevSelected.some(
        (p) => p.Id_encargado_legal === parent.Id_encargado_legal
      );
      if (alreadySelected) {
        return prevSelected.filter(
          (p) => p.Id_encargado_legal !== parent.Id_encargado_legal
        );
      } else {
        return [...prevSelected, parent];
      }
    });
  };

  const handleSelectGuardian = (guardian: any) => {
    toggleSelectParent(guardian);
    console.log(guardian);
  };

  const handleConfirm = () => {
    onSelectParents(selectedParents);
    onClose();
  };

  const handleShowSearch = () => {
    console.log("Llega por aca");
    setShowSearch(!showSearch);
  };

  return (
    <DarkModeWrapper>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        {showSearch ? (
          <GuardianList
            onClose={handleShowSearch}
            onSelectGuardian={handleSelectGuardian}
          />
        ) : null}
        <div className="bg-white dark:bg-gray-800 w-4/5 max-w-3xl p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Selecciona encargados legales
          </h2>
          <div className="flex justify-end mb-6">
            <button
              onClick={handleShowSearch}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
            >
              Buscar Encargados
            </button>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              Cargando...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {parents.map((parent) => (
                <ParentListItem
                  key={parent.Id_encargado_legal}
                  parent={parent}
                  isSelected={selectedParents.some(
                    (p) => p.Id_encargado_legal === parent.Id_encargado_legal
                  )}
                  onToggleSelect={() => toggleSelectParent(parent)}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-150"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedParents.length === 0}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
            >
              Confirmar selección
            </button>
          </div>
        </div>
      </div>
    </DarkModeWrapper>
  );
};

export default ParentList;
