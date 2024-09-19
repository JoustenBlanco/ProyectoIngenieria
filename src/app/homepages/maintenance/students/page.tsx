"use client";
import React, { useState } from "react";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import DateInput from "../../../components/Atoms/dateInput";
import ActionButtons from "../../../components/Atoms/ActionButtons";
export default function Students() {
  const [status, setStatus] = useState("Activo");
  const [substitute, setSubstitute] = useState("No");
  const [birthDate, setBirthDate] = useState("");
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
      <h1 className="text-3xl font-bold mb-8 text-gray-500">
        Mantenimiento - Estudiantes
      </h1>
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

          <DateInput
            id="birthDate"
            name="birthDate"
            label="Fecha de Nacimiento"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />

          <Select
            id="level"
            name="level"
            label="Nivel"
            options={["7", "8", "9", "10", "11"]}
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            id="email"
            name="email"
            type="email"
            label="Correo MEP"
            placeholder="Ingresa el correo MEP"
            required
          />

          <Input
            id="section"
            name="section"
            type="text"
            label="Sección"
            placeholder="Ingresa la sección"
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
