import React from "react";

interface ParentsListItemProps {
  parent: Parents;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const ParentListItem: React.FC<ParentsListItemProps> = ({
  parent,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <div
      onClick={onToggleSelect}
      className={`p-4 border rounded-lg cursor-pointer transition select-none
        ${isSelected ? "bg-blue-100 dark:bg-blue-900 border-blue-500" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
      `}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {parent.Primer_nombre} {parent.Primer_apellido}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{parent.Cedula}</p>
    </div>
  );
};

export default ParentListItem;
