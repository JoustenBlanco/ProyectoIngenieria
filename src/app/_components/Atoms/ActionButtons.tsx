"use client";
import React from "react";
import Button from "./button";

interface ActionButtonsProps {
  onNew: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onNew,
  onSave,
  onDelete,
}) => {
  return (
    <div className="flex space-x-2 md:space-x-24 mt-16 justify-center items-center">
      <Button
        type="button"
        name="Nuevo"
        iconName="new"
        bgColor="#00bfe6"
        onClick={onNew}
      />

      <Button
        type="button"
        name="Guardar"
        iconName="save"
        bgColor="#10b981"
        onClick={onSave}
      />

      <Button
        type="button"
        name="Eliminar"
        iconName="delete"
        bgColor="#ef4444"
        onClick={onDelete}
      />
    </div>
  );
};

export default ActionButtons;
