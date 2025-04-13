"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Atoms/input";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import Select from "../../../components/Atoms/select";
import { Parents } from "../../../../../types";
import GuardianList from "../../../components/legal_guardians/GuardiansList";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Legal_Guardians() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
  if (status == "unauthenticated"){
    console.log("No autenticado");
    redirect("/homepages/auth/login");
  }
},
 [session, status]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Parents>({
    defaultValues: {
      Primer_nombre: "",
      Segundo_nombre: "",
      Primer_apellido: "",
      Segundo_apellido: "",
      Cedula: "",
      Numero: "",
      Correo: "",
      Estado: "A",
    },
  });
  const [selectedUGuardian, setSelectedGuardian] = useState<Parents | null>(
    null
  );
  const [showGuardianList, setShowGuardianList] = useState(false);

  const handleOpenGuardianList = () => {
    setShowGuardianList(true);
  };

  const handleCloseGuardianList = () => {
    setShowGuardianList(false);
  };

  const handleSelectGuardian = (guardian: any) => {
    setSelectedGuardian(guardian);
    console.log(guardian);
    reset(guardian);
  };

  const onSubmit = async (data: Parents) => {
    try {
      const response = await fetch("/api/encargados_legales", {
        method: selectedUGuardian ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Encargado legal guardado exitosamente");
        handleNew();
      } else {
        throw new Error("Error al guardar el encargado legal");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al guardar el encargado legal");
    }
  };

  const handleNew = () => {
    reset({
      Primer_nombre: "",
      Segundo_nombre: "",
      Primer_apellido: "",
      Segundo_apellido: "",
      Cedula: "",
      Estado: "",
      Numero: "",
      Correo: "",
    });
    setSelectedGuardian(null);
  };



  const handleDelete = async () => {
    if (!selectedUGuardian || !selectedUGuardian.Id_encargado_legal) {
      alert("Por favor selecciona un encargado para eliminar");
      return;
    }
  
    try {
      const response = await fetch("/api/encargados_legales", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_encargado_legal: selectedUGuardian.Id_encargado_legal}),
      });
  
      if (response.ok) {
        alert("Encargado eliminado exitosamente");
        handleNew();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el encargado: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar el encargado");
    }
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
      {showGuardianList && (
        <GuardianList
          onClose={handleCloseGuardianList}
          onSelectGuardian={handleSelectGuardian}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            type="text"
            required
            {...register("Primer_nombre", {
              required: "Este campo es obligatorio",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
              maxLength: { value: 50, message: "El nombre no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/, message: "Solo se permiten letras y espacios" }
            })}
            error={errors.Primer_nombre?.message}
          />
          <Input
            id="secondName"
            label="Segundo Nombre"
            placeholder="Ingresa el segundo nombre"
            type="text"
            {...register("Segundo_nombre", {
              maxLength: { value: 50, message: "El nombre no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/, message: "Solo se permiten letras y espacios" }
            })}
          />
          <Input
            id="firstLastName"
            label="Primer Apellido"
            placeholder="Ingresa el primer apellido"
            type="text"
            required
            {...register("Primer_apellido", {
              required: "Este campo es obligatorio",
              minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
              maxLength: { value: 50, message: "El apellido no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/, message: "Solo se permiten letras y espacios" }
            })}
            error={errors.Primer_apellido?.message}
          />
          <Input
            id="secondLastName"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            type="text"
            {...register("Segundo_apellido", {
              maxLength: { value: 50, message: "El apellido no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/, message: "Solo se permiten letras y espacios" }
            })}
          />
          <Input
            id="idNumber"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            type="text"
            required
            {...register("Cedula", { 
              required: "Este campo es requerido",
              pattern: { value: /^[1-9]-\d{4}-\d{4}$/, message: "Formato inválido. Use: #-####-#### (ejemplo: 1-1234-1234)" }
            })}
            error={errors.Cedula?.message}
          />
          <Input
            id="phoneNumber"
            label="Número de Teléfono"
            placeholder="Ingresa el número de teléfono"
            type="tel"
            required
            {...register("Numero", { 
              required: "Este campo es requerido",
              pattern: { value: /^[2-8][0-9]{3}-[0-9]{4}$/, message: "Formato inválido. Use: ####-#### (ejemplo: 2222-3333)" }
            })}
            error={errors.Numero?.message}
          />
          <Input
            id="email"
            label="Email"
            placeholder="Ingresa el correo electrónico"
            type="email"
            required
            {...register("Correo", { 
              required: "Este campo es requerido",
              pattern: { 
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
                message: "Ingrese un correo electrónico válido" 
              },
              maxLength: { value: 100, message: "El correo no puede exceder 100 caracteres" }
            })}
            error={errors.Correo?.message}
          />
          <Select
            id="Estado"
            label="Estado"
            options={["A", "I"]}
            register={register}
            error={errors.Estado?.message}
            value={watch("Estado")}
            required={true}
          />
        </div>
        <ActionButtons
          onNew={handleNew}
          onSave={handleSubmit(onSubmit)}
          onDelete={handleDelete}
        />
      </form>
    </div>
  );
}
