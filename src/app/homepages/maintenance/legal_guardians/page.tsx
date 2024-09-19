"use client";
import React, { useState } from "react";
import Input from "../../../components/Atoms/input";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import Select from "../../../components/Atoms/select";

export default function Legal_Guardians() {

  const [status, setStatus] = useState("Activo");
  const [substitute, setSubstitute] = useState("No");
  const handleNew = () => {
    alert("Botón Nuevo presionado");
  };

  const handleModify = () => {
    alert("Botón Modificar presionado");
  };

  const handleSave = () => {
    alert("Botón Guardar presionado");
  };

  const handleDelete = () => {
    alert("Botón Eliminar presionado");
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="w-full text-start mb-8">
        <h1 className="text-3xl font-bold text-gray-500">
          Mantenimiento - Encargados Legales
        </h1>
      </div>
      <div className="flex-grow">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            name="firstName"
            type="text"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            required
          />
          <Input
            id="secondName"
            name="secondName"
            type="text"
            label="Segundo Nombre"
            placeholder="Ingresa el segundo nombre"
            required
          />
          <Input
            id="firstLastName"
            name="firstLastName"
            type="text"
            label="Primer Apellido"
            placeholder="Ingresa el primer apellido"
            required
          />
          <Input
            id="secondLastName"
            name="secondLastName"
            type="text"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            required
          />
          <Input
            id="idNumber"
            name="idNumber"
            type="text"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            required
          />
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            label="Número de Teléfono"
            placeholder="Ingresa el número de teléfono"
            required
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Ingresa el correo electrónico"
            required
          />
          <Select
            id="status"
            name="status"
            label="Estado"
            options={["Activo", "Inactivo"]}
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>
      <ActionButtons
        onNew={handleNew}
        onModify={handleModify}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
