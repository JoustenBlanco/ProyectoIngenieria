"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Atoms/input";
import Select from "../../../components/Atoms/select";
import DateInput from "../../../components/Atoms/dateInput";
import ActionButtons from "../../../components/Atoms/ActionButtons";
import { Student, Seccion } from "../../../../../types";
import StudentList from "../../../components/studentMaintenance/StudentsList";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { set } from "date-fns";

export default function Students() {
  const { data: session, status } = useSession();
  const [sections, setSections] = useState<Seccion[]>([]);
  const fetchSections = async () => {
    const response = await fetch(`/api/secciones`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching sections");
    }
    const data: Seccion[] = await response.json();
    return data;
  }

  useEffect(() => {
  if (status == "unauthenticated"){
    console.log("No autenticado");
    redirect("/homepages/auth/login");
  }
},
 [session, status]);
 useEffect(() => {
  const loadSections = async () => {
    try {
      const fetchedSections = await fetchSections(); 
      setSections(fetchedSections);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Error desconocido");
    } 
  };

  loadSections();
}, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Student>({
    defaultValues: {
      Primer_nombre: "",
      Segundo_nombre: "",
      Primer_apellido: "",
      Segundo_apellido: "",
      Fecha_nacimiento: "",
      Grado: "7",
      Cedula: "",
      Correo_mep: "",
      Estado: "A",
      Id_seccion: 0,
    }
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    null
  );
  const [showStudentList, setShowStudentList] = useState(false);

  const handleOpenStudentList = () => {
    setShowStudentList(true);
  };

  const handleCloseStudentList = () => {
    setShowStudentList(false);
  };

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
    console.log(student);
    reset(student);
  };

  const handleSave = async (data: Student) => {
    console.log("Datos del formulario:", data);
    const studentData = {
      ...data,
      Id_seccion: Number(data.Id_seccion),
    };
    console.log("Datos a enviar:", studentData);
    try {
      const response = await fetch("/api/alumnos", {
        method: selectedStudent? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        alert("Estudiante guardado exitosamente");
        handleNew();
      } else {
        alert("Error al guardar el estudiante");
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
      Fecha_nacimiento: "",
      Grado: "",
      Cedula: "",
      Correo_mep: "",
      Estado: "",
      Id_seccion: 0,
    });
    setSelectedStudent(null);
  };

  const handleDelete = async () => {
    if (!selectedStudent || !selectedStudent.Id_alumno) {
      alert("Por favor selecciona un estudiante para eliminar");
      return;
    }
  
    try {
      const response = await fetch("/api/alumnos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_alumno: selectedStudent.Id_alumno }),
      });
  
      if (response.ok) {
        alert("Estudiante eliminado exitosamente");
        handleNew();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el estudiante: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar el estudiante");
    }
  };
  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">
        Mantenimiento - Estudiantes
      </h1>
      <button
        onClick={handleOpenStudentList}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Buscar Estudiantes
      </button>
      {showStudentList && (
        <StudentList
          onClose={handleCloseStudentList}
          onSelectStudent={handleSelectStudent}
        />
      )}
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 w-full gap-x-10">
          <Input
            id="firstName"
            type="text"
            label="Primer Nombre"
            placeholder="Ingresa el primer nombre"
            {...register("Primer_nombre", {
              required: "Este campo es requerido",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
              maxLength: { value: 50, message: "El nombre no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/, message: "Solo se permiten letras y espacios" }
            })}
            error={errors.Primer_nombre?.message}
          />

          <Input
            id="secondName"
            type="text"
            label="Segundo Nombre"
            placeholder="Ingresa el segundo nombre"
            {...register("Segundo_nombre", {
              maxLength: { value: 50, message: "El nombre no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/, message: "Solo se permiten letras y espacios" }
            })}
          />

          <Input
            id="firstLastName"
            type="text"
            label="Primer Apellido"
            placeholder="Ingresa el primer apellido"
            {...register("Primer_apellido", {
              required: "Este campo es requerido",
              minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
              maxLength: { value: 50, message: "El apellido no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/, message: "Solo se permiten letras y espacios" }
            })}
            error={errors.Primer_apellido?.message}
          />

          <Input
            id="secondLastName"
            type="text"
            label="Segundo Apellido"
            placeholder="Ingresa el segundo apellido"
            {...register("Segundo_apellido", {
              maxLength: { value: 50, message: "El apellido no puede exceder 50 caracteres" },
              pattern: { value: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]*$/, message: "Solo se permiten letras y espacios" }
            })}
            error={errors.Segundo_apellido?.message}
          />

          <DateInput
            id="birthDate"
            label="Fecha de Nacimiento"
            value={watch("Fecha_nacimiento") || ""}
            {...register("Fecha_nacimiento", {
              required: "Este campo es requerido",
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const minAge = 11;
                const maxAge = 22;
                return (age >= minAge && age <= maxAge) || `La edad debe estar entre ${minAge} y ${maxAge} años`;
              }
            })}
            onChange={(e) => setValue("Fecha_nacimiento", e.target.value)}
            error={errors.Fecha_nacimiento?.message}
          />

          <Select
            id="Grado"
            label="Grado"
            options={["7", "8", "9", "10", "11"]}
            register={register}
            error={errors.Estado?.message}
            value={watch("Grado")}
            required={true}
          />

          <Input
            id="idNumber"
            type="text"
            label="Cédula"
            placeholder="Ingresa el número de cédula"
            {...register("Cedula", {
              required: "Este campo es requerido",
              pattern: { value: /^[1-9]-\d{4}-\d{4}$/, message: "Formato inválido. Use: #-####-#### (ejemplo: 1-1234-1234)" }
            })}
            error={errors.Cedula?.message}
          />

          <Input
            id="email"
            type="email"
            label="Correo MEP"
            placeholder="Ingresa el correo MEP"
            {...register("Correo_mep", {
              required: "Este campo es requerido",
              pattern: { 
                value: /^[a-zA-Z0-9._-]+@(?:est\.)?mep\.go\.cr$/, 
                message: "Debe ser un correo válido del MEP (@mep.go.cr o @est.mep.go.cr)" 
              },
              maxLength: { value: 100, message: "El correo no puede exceder 100 caracteres" }
            })}
            error={errors.Correo_mep?.message}
          />
          {/* Todo hay que cambiar esto por un select */}
          <Select
            id="Id_seccion"
            label="Sección"
            options={sections.map((section) => ({
              label: section.Nombre,  // Muestra el nombre
              value: section.Id_seccion,      // Guarda el ID (asegúrate de que sea number)
            }))}
            register={register}
            error={errors.Id_seccion?.message}
            value={watch("Id_seccion")?.toString()} 
            required={true}
          />


          <Select
            id="Estado" // Ahora es una clave válida de CrearFuncionarios
            label="Estado"
            options={["A", "I"]}
            register={register}
            error={errors.Estado?.message}
            value={watch("Estado")} // Usamos el valor observado para mantener el estado
            required={true}
          />
        </div>
        <ActionButtons
          onNew={handleNew}
          onSave={handleSubmit(handleSave)}
          onDelete={handleDelete}
        />
      </form>
    </div>
  );
}
