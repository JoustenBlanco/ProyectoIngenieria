"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Atoms/input";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import Select from "../../../components/Atoms/select";
import { CreateParents } from "../../../../../types";
import GuardianList from "../../../components/legal_guardians/GuardiansList";

export default function Legal_Guardians() {

  const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm<CreateParents>({
    defaultValues: {
      Primer_nombre: "",
      Segundo_nombre: "",
      Primer_apellido: "",
      Segundo_apellido: "",
      Cedula: "",
      Numero: "",
      Correo: "",
      Estado: "Activo",
    },
  });

  const [showGuardianList, setShowGuardianList] = useState(false);

  const handleOpenGuardianList = () => {
    setShowGuardianList(true);
  };

  const handleCloseGuardianList = () => {
    setShowGuardianList(false);
  };

  const handleSelectGuardian = (guardian: any) => {
    reset(guardian);
  };

  const onSubmit = async (data: CreateParents) => {
    try {
      const response = await fetch("/api/encargados_legales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Encargado legal guardado exitosamente");
        reset();
      } else {
        throw new Error("Error al guardar el encargado legal");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al guardar el encargado legal");
    }
  };

  const handleNew = () => {
    reset();
  };

  const handleModify = () => {
    alert("Botón Modificar presionado");
  };

  const handleDelete = () => {
    alert("Botón Eliminar presionado");
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="w-full text-start mb-8">
        <h1 className="text-3xl font-bold text-gray-500 dark:text-gray-400">
          Mantenimiento - Encargados Legales
        </h1>
      </div>
      <button
        onClick={handleOpenGuardianList}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Buscar Encargados
      </button>
      {showGuardianList && <GuardianList onClose={handleCloseGuardianList} onSelectGuardian={handleSelectGuardian} />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            type="text"
            required
            {...register("Primer_nombre", { required: "Este campo es obligatorio" })}
            error={errors.Primer_nombre?.message}
          />
          <Input
            id="secondName"
            label="Segundo Nombre"
            placeholder="Ingresa el segundo nombre"
            type="text"
            {...register("Segundo_nombre")}
          />
          <Input
            id="firstLastName"
            label="Primer Apellido"
            placeholder="Ingresa el primer apellido"
            type="text"
            required
            {...register("Primer_apellido", { required: "Este campo es obligatorio" })}
            error={errors.Primer_apellido?.message}
          />
          <Input
            id="secondLastName"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            type="text"
            {...register("Segundo_apellido")}
          />
          <Input
            id="idNumber"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            type="text"
            required
            {...register("Cedula", { required: "Este campo es requerido" })}
            error={errors.Cedula?.message}
          />
          <Input
            id="phoneNumber"
            label="Número de Teléfono"
            placeholder="Ingresa el número de teléfono"
            type="tel"
            required
            {...register("Numero", { required: "Este campo es requerido" })}
            error={errors.Numero?.message}
          />
          <Input
            id="email"
            label="Email"
            placeholder="Ingresa el correo electrónico"
            type="email"
            required
            {...register("Correo", { required: "Este campo es requerido" })}
            error={errors.Correo?.message}
          />
          <Select
            id="status"
            label="Estado"
            options={["Activo", "Inactivo"]}
            value={watch("Estado")}
            {...register("Estado", { required: true })}
          />


        </div>
        <ActionButtons
          onNew={handleNew}
          onModify={handleModify}
          onSave={handleSubmit(onSubmit)}
          onDelete={handleDelete}
        />
      </form>
    </div>
  );
}
