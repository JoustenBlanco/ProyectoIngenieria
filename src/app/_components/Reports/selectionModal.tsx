import { Modal } from "flowbite-react";

interface SelectionModalProps<T> {
  show: boolean;
  onClose: () => void;
  title: string;
  searchValue: string | null;
  setSearchValue: (value: string) => void;
  fetchItems: (query: string, type: string) => void;
  items: T[];
  renderItem: (item: T, onSelect: (value: string) => void) => JSX.Element;
  searchType: string;
  onSelect: (value: string) => void;
}

export default function SelectionModal<T>({
  show,
  onClose,
  title,
  searchValue,
  setSearchValue,
  fetchItems,
  items,
  renderItem,
  searchType,
  onSelect,
}: SelectionModalProps<T>) {
  const getPlaceholder = () => {
    if (searchType === "Por Estudiante" || searchType === "Por Docente")
      return "Buscar por cédula...";
    if (searchType === "Por Curso") return "Buscar por descripción...";
    if (searchType === "Por Sección") return "Buscar por nombre...";
    if (searchType === "Por Grado") return "Buscar grado...";
    return "Buscar...";
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Buscar {title}</Modal.Header>
      <Modal.Body>
        {searchType !== "General LSP" && (
          <input
            type="text"
            placeholder={getPlaceholder()}
            className="w-full p-2 border rounded-md dark:bg-gray-800"
            value={searchValue || ""}
            onChange={(e) => {
              setSearchValue(e.target.value);
              fetchItems(e.target.value, searchType);
            }}
          />
        )}

        {/* Lista de resultados */}
        <ul className="mt-4">
          {items.length === 0 ? (
            <li className="p-2 text-gray-500 dark:text-gray-400">
              No se encontraron resultados
            </li>
          ) : (
            items.map((item) =>
              renderItem(item, (selectedValue) => {
                onSelect(selectedValue);
                onClose();
              })
            )
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
