"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import { CrearFuncionarios } from "../../../../../types";

export default function Users() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CrearFuncionarios>();

  const handleSave = async (data: CrearFuncionarios) => {
    console.log("Datos a enviar:", data);
    try {
      const response = await fetch("/api/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Funcionario guardado exitosamente");
        reset();
      } else {
        alert("Error al guardar el funcionario");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }
  };

  const handleNew = () => {
    reset();
  };

  const onSubmit = (data: CrearFuncionarios) => {
    handleSave(data);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">
        Mantenimiento - Usuarios
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            type="text"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            required
            {...register("Primer_nombre", { required: "Este campo es requerido" })}
            error={errors.Primer_nombre?.message}
          />

          <Input
            id="secondName"
            type="text"
            label="Segundo Nombre"
            placeholder="Ingresa el segundo nombre"
            {...register("Segundo_nombre")}
          />

          <Input
            id="firstLastName"
            type="text"
            label="Primer Apellido"
            placeholder="Ingresa el primer apellido"
            required
            {...register("Primer_apellido", { required: "Este campo es requerido" })}
            error={errors.Primer_apellido?.message}
          />

          <Input
            id="secondLastName"
            type="text"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            {...register("Segundo_apellido")}
          />

          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Ingresa el correo electrónico"
            required
            {...register("Email", { required: "Este campo es requerido" })}
            error={errors.Email?.message}
          />

          <Input
            id="phoneNumber"
            type="tel"
            label="Número de Teléfono"
            placeholder="Ingresa el número de teléfono"
            required
            {...register("Numero_telefono", { required: "Este campo es requerido" })}
            error={errors.Numero_telefono?.message}
          />

          <Input
            id="idNumber"
            type="text"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            required
            {...register("Cedula", { required: "Este campo es requerido" })}
            error={errors.Cedula?.message}
          />

          <Select
            id="status"
            label="Estado"
            options={["Activo", "Inactivo"]}
            value={watch("Estado")}
            required
            {...register("Estado", { required: "Este campo es requerido" })}
            error={errors.Estado?.message}
          />

          <Select
            id="substitute"
            label="Suplente"
            options={["Sí", "No"]}
            value={watch("Suplente")}
            required
            {...register("Suplente", { required: "Este campo es requerido" })}
            error={errors.Suplente?.message}
          />

          <Input
            id="password"
            type="password"
            label="Contraseña"
            placeholder="Ingresa la contraseña"
            required
            {...register("Password", { required: "Este campo es requerido" })}
            error={errors.Password?.message}
          />
        </div>
        <ActionButtons
          onNew={handleNew}
          onModify={() => alert("Botón Modificar presionado")}
          onSave={handleSubmit(onSubmit)}
          onDelete={() => alert("Botón Eliminar presionado")}
        />
      </form>
    </div>
  );
}
