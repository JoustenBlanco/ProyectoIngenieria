"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import DateInput from "../../../components/Atoms/dateInput";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import { CreateStudent } from "../../../../../types";

export default function Students() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CreateStudent>();

  const handleSave = async (data: CreateStudent) => {
    const studentData = {
      ...data,
      Id_seccion: Number(data.Id_seccion),
    };
    console.log("Datos a enviar:", studentData );
    try {
      const response = await fetch("/api/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData ),
      });
      if (response.ok) {
        alert("Estudiante guardado exitosamente");
        reset();
      } else {
        alert("Error al guardar el estudiante");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }
  };

  const handleNew = () => {
    reset();
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">
        Mantenimiento - Estudiantes
      </h1>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            type="text"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            {...register("Primer_nombre", {
              required: "Este campo es requerido",
            })}
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
            {...register("Primer_apellido", {
              required: "Este campo es requerido",
            })}
            error={errors.Primer_apellido?.message}
          />

          <Input
            id="secondLastName"
            type="text"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            {...register("Segundo_apellido")}
            error={errors.Segundo_apellido?.message}
          />

          <DateInput
            id="birthDate"
            label="Fecha de Nacimiento"
            value={watch("Fecha_nacimiento") || ""}
            {...register("Fecha_nacimiento", {
              required: "Este campo es requerido",
            })}
            onChange={(e) => setValue("Fecha_nacimiento", e.target.value)}
            error={errors.Fecha_nacimiento?.message}
          />

          <Select
            id="level"
            label="Nivel"
            options={["7", "8", "9", "10", "11"]}
            {...register("Grado", { required: "Este campo es requerido" })}
            error={errors.Grado?.message}
          />

          <Input
            id="idNumber"
            type="text"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            {...register("Cedula", { required: "Este campo es requerido" })}
            error={errors.Cedula?.message}
          />

          <Input
            id="email"
            type="email"
            label="Correo MEP"
            placeholder="Ingresa el correo MEP"
            {...register("Correo_mep", {
              required: "Este campo es requerido",
            })}
            error={errors.Correo_mep?.message}
          />

          <Input
            id="section"
            type="text"
            label="Sección"
            placeholder="Ingresa la sección"
            {...register("Id_seccion", {
              required: "Este campo es requerido",
            })}
            error={errors.Id_seccion?.message}
          />

          <Select
            id="status"
            label="Estado"
            options={["Activo", "Inactivo"]}
            {...register("Estado", { required: "Este campo es requerido" })}
            error={errors.Estado?.message}
          />
        </div>
        <ActionButtons
          onNew={handleNew}
          onModify={() => alert("Modificar estudiante")}
          onSave={handleSubmit(handleSave)}
          onDelete={() => alert("Eliminar estudiante")}
        />
      </form>
    </div>
  );
}
