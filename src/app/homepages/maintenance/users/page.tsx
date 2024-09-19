"use client";
import React, { useState } from "react";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import Button from "../../../components/Atoms/button";

export default function Maintenance() {
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">
        Mantenimiento - Usuarios
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
        <Input
          id="firstName"
          name="firstName"
          type="text"
          label="Primer Nombre"
          placeholder="Ingresa tu primer nombre"
          required
        />

        <Input
          id="secondName"
          name="secondName"
          type="text"
          label="Segundo Nombre"
          placeholder="Ingresa tu segundo nombre"
          required
        />

        <Input
          id="firstLastName"
          name="firstLastName"
          type="text"
          label="Primer Apellido"
          placeholder="Ingresa tu primer apellido"
          required
        />

        <Input
          id="secondLastName"
          name="secondLastName"
          type="text"
          label="Segundo Apellido"
          placeholder="Ingresa tu segundo apellido"
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Ingresa tu correo electrónico"
          required
        />

        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          label="Número de Teléfono"
          placeholder="Ingresa tu número de teléfono"
          required
        />

        <Input
          id="idNumber"
          name="idNumber"
          type="text"
          label="Cédula"
          placeholder="Ingresa tu número de cédula"
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

        <Select
          id="substitute"
          name="substitute"
          label="Suplente"
          options={["Sí", "No"]}
          required
          value={substitute}
          onChange={(e) => setSubstitute(e.target.value)}
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          required
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
