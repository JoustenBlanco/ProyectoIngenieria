"use client";
import React, { useState } from "react";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import Button from "../../../components/Atoms/button";
import DateInput from "../../../components/Atoms/dateInput";

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">
        Mantenimiento - Estudiantes
      </h1>
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
      <div className="flex space-x-24 mt-16 justify-center items-center">
        <Button
          name="Nuevo"
          iconName="new"
          bgColor="#00bfe6"
          onClick={handleNew}
        />

        <Button
          name="Modificar"
          iconName="modify"
          bgColor="#3b82f6"
          onClick={handleModify}
        />

        <Button
          name="Guardar"
          iconName="save"
          bgColor="#10b981"
          onClick={handleSave}
        />

        <Button
          name="Eliminar"
          iconName="delete"
          bgColor="#ef4444"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
