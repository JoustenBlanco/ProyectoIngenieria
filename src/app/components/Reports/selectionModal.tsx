import { Modal } from "flowbite-react";

interface SelectionModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  onSelect: (item: string) => void;
}

export default function SelectionModal({
  show,
  onClose,
  title,
  options,
  onSelect,
}: SelectionModalProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Seleccionar {title}</Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />

        <ul className="mt-4">
          {options.map((item) => (
            <li
              key={item}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-500 dark:text-gray-400"
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
