"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import { Funcionarios } from "../../../../../types";
import UserList from "../../../components/Users/UserList";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Users() {
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
    watch,
    reset,
    formState: { errors },
  } = useForm<Funcionarios>();
  const [selectedUser, setSelectedUser] = useState<Funcionarios | null>(
    null
  );
  const [showUserList, setShowUserList] = useState(false);

  const handleOpenUserList = () => {
    setShowUserList(true);
  };

  const handleCloseUserList = () => {
    setShowUserList(false);
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    console.log(user);
    reset(user);
  };

  const handleSave = async (data: Funcionarios) => {
    console.log("Datos a enviar:", data);
    try {
      const response = await fetch("/api/funcionarios", {
        method: selectedUser? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Funcionario guardado exitosamente");
        handleNew();
      } else {
        alert("Error al guardar el funcionario");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }
  };

  const handleNew = () => {
    reset({
      Primer_nombre: "",
      Segundo_nombre: "",
      Primer_apellido: "",
      Segundo_apellido: "",
      Email: "",
      Numero_telefono: "",
      Cedula: "",
      Estado: "",
      Suplente: "",
      Password: ""
    });
    setSelectedUser(null);
  };

  const onSubmit = (data: Funcionarios) => {
    handleSave(data);
  };

  const handleDelete = async () => {
    if (!selectedUser || !selectedUser.Id_funcionario) {
      alert("Por favor selecciona un funcionario para eliminar");
      return;
    }
  
    try {
      const response = await fetch("/api/funcionarios", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_funcionario: selectedUser.Id_funcionario }),
      });
  
      if (response.ok) {
        alert("Funcionario eliminado exitosamente");
        handleNew();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el funcionario: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar el funcionario");
    }
  };
  

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">
        Mantenimiento - Usuarios
      </h1>
      <button
        onClick={handleOpenUserList}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Buscar Usuarios
      </button>
      {showUserList && (
        <UserList
          onClose={handleCloseUserList}
          onSelectUser={handleSelectUser}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            type="text"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            required
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
            required
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
            {...register("Numero_telefono", {
              required: "Este campo es requerido",
            })}
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
            id="Estado"
            label="Estado"
            options={["A", "I"]}
            register={register}
            error={errors.Estado?.message}
            value={watch("Estado")}
            required={true}
          />

          <Select
            id="Suplente"
            label="Suplente"
            options={["S", "N"]}
            register={register}
            error={errors.Suplente?.message}
            value={watch("Suplente")}
            required={true}
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
          onSave={handleSubmit(onSubmit)}
          onDelete={handleDelete}
        />
      </form>
    </div>
  );
}
