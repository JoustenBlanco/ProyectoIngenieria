"use client";
import React from "react";
import Button from "./button";

interface ActionButtonsProps {
  onNew: () => void;
  onModify: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onNew,
  onModify,
  onSave,
  onDelete,
}) => {
  return (
    <div className="flex space-x-24 mt-16 justify-center items-center">
      <Button
        name="Nuevo"
        iconName="new"
        bgColor="#00bfe6"
        onClick={onNew}
      />

      <Button
        name="Modificar"
        iconName="modify"
        bgColor="#3b82f6"
        onClick={onModify}
      />

      <Button
        name="Guardar"
        iconName="save"
        bgColor="#10b981"
        onClick={onSave}
      />

      <Button
        name="Eliminar"
        iconName="delete"
        bgColor="#ef4444"
        onClick={onDelete}
      />
    </div>
  );
};

export default ActionButtons;
