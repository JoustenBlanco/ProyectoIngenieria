import Image from "next/image";


interface ParentCardListProps {
  parents: Parents[];
  onRemove: (id: number) => void;
}

const ParentCardList: React.FC<ParentCardListProps> = ({ parents, onRemove }) => {
  if (parents.length === 0) return null;
console.log("los parents:", JSON.stringify(parents, null, 2));

  return (
    <div className="mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Encargados legales asociados:
      </h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {parents.map((parent) => (
          <div
            key={parent.Id_encargado_legal}
            className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700"
          >
            <p className="text-gray-800 dark:text-gray-200">
              {parent.Primer_nombre} {parent.Segundo_nombre}{" "}
              {parent.Primer_apellido} {parent.Segundo_apellido}
            </p>
            <button
              onClick={() => onRemove(parent.Id_encargado_legal)}
              className="absolute top-2 right-2 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
              aria-label="Eliminar encargado"
            >
              <Image
                src="/images/delete.svg"
                alt="Eliminar"
                width={20}
                height={20}
                className="text-red-600"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentCardList;
