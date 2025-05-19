"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../_components/Atoms/input";
import Select from "../../../_components/Atoms/select";
import ActionButtons from "../../../_components/Atoms/ActionButtons";
import UserList from "../../../_components/Users/UserList";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  generateRandomPassword,
  newUserPassword,
} from "../../../services/password_mail";
import { send } from "process";

type FormValues = Funcionarios & {
  rol_funcionario?: number;
};

export default function Users() {
  const { data: session, status } = useSession();
  const [roles, setRoles] = useState<RolFuncionario[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [funcionarioRoles, setFuncionarioRoles] = useState<FuncionariosXRol[]>(
    []
  );

  useEffect(() => {
    if (status == "unauthenticated") {
      console.log("No autenticado");
      redirect("/homepages/auth/login");
    } else if (status === "authenticated") {
      fetchRoles();
    }
  }, [session, status]);

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/rol_funcionario");
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        console.error("Error al obtener los roles");
      }
    } catch (error) {
      console.error("Error en la petición de roles", error);
    }
  };

  const fetchFuncionarioRoles = async (funcionarioId: number) => {
    try {
      const response = await fetch(
        `/api/funcionarios_x_rol?Id_funcionario=${funcionarioId}`
      );
      if (response.ok) {
        const data = await response.json();
        setFuncionarioRoles(data);
        console.log("Fuera del IF");
        console.log(data);
        // Establecer el primer rol como seleccionado (si existe)
        if (data) {
          console.log("Dentro del IF");
          console.log(data);
          setValue("rol_funcionario", data.Id_rol_funcionario);
        } else {
          setValue("rol_funcionario", undefined);
        }
      }
    } catch (error) {
      console.error("Error al obtener los roles del funcionario", error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Primer_nombre: "",
      Segundo_nombre: "",
      Primer_apellido: "",
      Segundo_apellido: "",
      Email: "",
      Numero_telefono: "",
      Cedula: "",
      Estado: "A",
      Suplente: "N",
      rol_funcionario: undefined,
    },
  });
  const [selectedUser, setSelectedUser] = useState<Funcionarios | null>(null);
  const [showUserList, setShowUserList] = useState(false);

  const handleOpenUserList = () => {
    setShowUserList(true);
  };

  const handleCloseUserList = () => {
    setShowUserList(false);
  };

  const handleSelectUser = async (user: any) => {
    setSelectedUser(user);
    console.log(user);
    reset(user);
    if (user.Id_funcionario) {
      await fetchFuncionarioRoles(user.Id_funcionario);
    }
  };

  const handleFuncionarioRol = async (
    funcionarioId: number,
    rolId?: number
  ) => {
    if (!rolId) return;
    try {
      const rolIdNumber = Number(rolId);
      console.log(funcionarioId);
      console.log(rolId);
      // Eliminar relaciones existentes
      const response2 = await fetch("/api/funcionarios_x_rol", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_funcionario: funcionarioId }),
      });
      if (response2.ok) {
        const response = await fetch("/api/funcionarios_x_rol", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id_funcionario: funcionarioId,
            Id_rol_funcionario: rolIdNumber,
          }),
        });
        if (!response.ok) {
          console.error("Error al guardar la relación funcionario-rol");
        }
      } else {
        console.error("Error al eliminar la relación funcionario-rol");
      }
    } catch (error) {
      console.error("Error en la petición de relación funcionario-rol", error);
    }
  };

  const handleSave = async (data: FormValues) => {
    console.log("Datos a enviar:", data);
    try {
      const rolId = data.rol_funcionario
        ? Number(data.rol_funcionario)
        : undefined;
      const { rol_funcionario, ...funcionarioData } = data;
      const finalFuncionarioData: Funcionarios = {
        ...funcionarioData,
        Password: generateRandomPassword(),
      };

      const response = await fetch("/api/funcionarios", {
        method: selectedUser ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFuncionarioData),
      });
      if (response.ok) {
        const result = await response.json();
        alert("Funcionario guardado exitosamente");
        if (rolId) {
          const funcionarioId =
            selectedUser?.Id_funcionario || result.Id_funcionario;
          await handleFuncionarioRol(funcionarioId, rolId);
        }
        if (!selectedUser) {
          newUserPassword(finalFuncionarioData);
        }
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
      rol_funcionario: undefined,
    });
    setSelectedUser(null);
    setFuncionarioRoles([]);
  };

  const onSubmit = (data: FormValues) => {
    handleSave(data);
  };

  const handleDelete = async () => {
    if (!selectedUser || !selectedUser.Id_funcionario) {
      alert("Por favor selecciona un funcionario para eliminar");
      return;
    }

    try {
      await fetch("/api/funcionarios_x_rol", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_funcionario: selectedUser.Id_funcionario }),
      });

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

  const rolOptions = roles.map((rol) => ({
    value: Number(rol.Id_rol_funcionario),
    label: rol.Nombre,
  }));

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
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder 50 caracteres",
              },
              pattern: {
                value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                message: "Solo se permiten letras y espacios",
              },
            })}
            error={errors.Primer_nombre?.message}
          />

          <Input
            id="secondName"
            type="text"
            label="Segundo Nombre"
            placeholder="Ingresa el segundo nombre"
            {...register("Segundo_nombre", {
              maxLength: {
                value: 50,
                message: "El nombre no puede exceder 50 caracteres",
              },
              pattern: {
                value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/,
                message: "Solo se permiten letras y espacios",
              },
            })}
          />

          <Input
            id="firstLastName"
            type="text"
            label="Primer Apellido"
            placeholder="Ingresa el primer apellido"
            required
            {...register("Primer_apellido", {
              required: "Este campo es requerido",
              minLength: {
                value: 2,
                message: "El apellido debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El apellido no puede exceder 50 caracteres",
              },
              pattern: {
                value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                message: "Solo se permiten letras y espacios",
              },
            })}
            error={errors.Primer_apellido?.message}
          />

          <Input
            id="secondLastName"
            type="text"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            {...register("Segundo_apellido", {
              maxLength: {
                value: 50,
                message: "El apellido no puede exceder 50 caracteres",
              },
              pattern: {
                value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/,
                message: "Solo se permiten letras y espacios",
              },
            })}
          />

          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Ingresa el correo electrónico"
            required
            {...register("Email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Ingrese un correo electrónico válido",
              },
              maxLength: {
                value: 100,
                message: "El correo no puede exceder 100 caracteres",
              },
            })}
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
              pattern: {
                value: /^[2-8][0-9]{3}-[0-9]{4}$/,
                message:
                  "Formato inválido. Use: ####-#### (ejemplo: 2222-3333)",
              },
            })}
            error={errors.Numero_telefono?.message}
          />

          <Input
            id="idNumber"
            type="text"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            required
            {...register("Cedula", {
              required: "Este campo es requerido",
              pattern: {
                value: /^\d{9}$/,
                message:
                  "Formato inválido. Use: ######### (ejemplo: 112341234)",
              },
            })}
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

          <Select
            id="rol_funcionario"
            label="Rol del Funcionario"
            options={rolOptions}
            register={register}
            error={errors.rol_funcionario?.message}
            value={watch("rol_funcionario")}
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
