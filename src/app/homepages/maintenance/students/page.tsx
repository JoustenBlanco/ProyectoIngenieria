"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../_components/Atoms/input";
import Select from "../../../_components/Atoms/select";
import DateInput from "../../../_components/Atoms/dateInput";
import ActionButtons from "../../../_components/Atoms/ActionButtons";
import StudentList from "../../../_components/studentMaintenance/StudentsList";
import ParentList from "../../../_components/studentMaintenance/ParentsList";
import ParentCardList from "@/app/_components/studentMaintenance/ParentCardList";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Alert from "../../../_components/feedBack/alert";
import Loading from "../../../_components/feedBack/loading";

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentParentsList, setStudentParentsList] = useState<Parents[]>([]);
  const [removeStudentParentList, setRemoveStudentParentList] = useState<
    Parents[]
  >([]);
  const [newStudentParentsList, newSetStudentParentsList] = useState<Parents[]>(
    []
  );
  const [showStudentList, setShowStudentList] = useState(false);
  const { data: session, status } = useSession();
  const [sections, setSections] = useState<Seccion[]>([]);
  const [showParentList, setShowParentList] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    show: boolean;
  }>({
    message: "",
    type: "info",
    show: false,
  });

  const showAlert = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setAlert({ message, type, show: true });
  };

  const fetchSections = async () => {
    const response = await fetch(`/api/secciones`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Error fetching sections");
    }
    const data: Seccion[] = await response.json();
    return data;
  };

  const fetchParentsByStuden = async (id: number) => {
    console.log("Fetching parents for student ID:", id);
    const response = await fetch(
      `/api/encargados_x_alumnos/[id]?Id_estudiante=${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok && response.status != 404) {
      throw new Error("Error fetching parents");
    }
    const data: Parents[] = await response.json();
    return data;
  };

  useEffect(() => {
    if (status == "unauthenticated") {
      console.log("No autenticado");
      redirect("/homepages/auth/login");
    }
  }, [session, status]);
  useEffect(() => {
    const loadSections = async () => {
      try {
        const fetchedSections = await fetchSections();
        setSections(fetchedSections);
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : "Error desconocido"
        );
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
    },
  });

  const handleOpenStudentList = () => {
    setShowStudentList(true);
  };

  const handleCloseStudentList = () => {
    setShowStudentList(false);
  };

  const handleSelectStudent = async (student: any) => {
    setSelectedStudent(student);
    const fetchedParents = await fetchParentsByStuden(student.Id_alumno);
    setStudentParentsList(fetchedParents);
    console.log(student);
    reset(student);
  };

  const handleOpenParentsList = async () => {
    if (selectedStudent != null) {
      const parents: Parents[] = await fetchParentsByStuden(
        selectedStudent.Id_alumno
      );
      setStudentParentsList(parents);
      console.log(parents);
    }
    setShowParentList(true);
  };

  const handleCloseParentList = () => {
    setShowParentList(false);
  };

  const handleRemoveParent = (idAEliminar: number) => {
    setStudentParentsList((prevList) => {
      if (prevList.length - 1 > 0) {
        setRemoveStudentParentList((prevListRemove) => [
          ...prevListRemove,
          prevList.find((parent) => parent.Id_encargado_legal === idAEliminar)!,
        ]);
        return prevList.filter(
          (parent) => parent.Id_encargado_legal !== idAEliminar
        );
      }
      showAlert(
        "El estudiante debe tener por lo menos un encargado legal",
        "warning"
      );
      return prevList;
    });
  };

  const handleSelectedParent = (parents: Parents[]) => {
    if (parents.length === 0) return;

    const nuevos = parents.filter(
      (nuevo) =>
        !studentParentsList.some(
          (p) => p.Id_encargado_legal === nuevo.Id_encargado_legal
        )
    );
    setStudentParentsList((prevLista) => [...prevLista, ...nuevos]);
    if (selectedStudent) {
      newSetStudentParentsList(nuevos);
    }
  };

  const handleSave = async (data: Student) => {
    if (studentParentsList.length === 0) {
      showAlert(
        "El estudiante debe tener por lo menos un encargado legal",
        "warning"
      );
      return;
    }

    const studentData = {
      ...data,
      Id_seccion: Number(data.Id_seccion),
    };
    console.log("Student data:", studentData);
    try {
      const response = await fetch("/api/alumnos", {
        method: selectedStudent ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        showAlert("Error al guardar el estudiante", "error");
        return;
      }

      let studentId: number;
      if (selectedStudent) {
        studentId = selectedStudent.Id_alumno;
      } else {
        const result = await response.json();
        studentId = result.Id_alumno;
      }
      console.log(
        "El tamanno del parent list es:",
        newStudentParentsList.length
      );
      if (newStudentParentsList.length > 0) {
        await Promise.all(
          newStudentParentsList.map((encargado) =>
            fetch("/api/encargados_x_alumnos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Id_alumno: studentId,
                Id_encargado_legal: encargado.Id_encargado_legal,
              }),
            })
          )
        );
      }

      if (removeStudentParentList.length > 0) {
        await Promise.all(
          removeStudentParentList.map((encargado) =>
            fetch("/api/encargados_x_alumnos", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Id_alumno: studentId,
                Id_encargado_legal: encargado.Id_encargado_legal,
              }),
            })
          )
        );
      }

      showAlert("Estudiante y encargados actualizados exitosamente", "success");
      handleNew();
    } catch (error) {
      console.error("Error en la petición", error);
      showAlert("Ocurrió un error", "error");
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
    newSetStudentParentsList([]);
    setRemoveStudentParentList([]);
    setStudentParentsList([]);
    setShowParentList(false);
    setSelectedStudent(null);
  };

  const handleDelete = async () => {
    if (!selectedStudent || !selectedStudent.Id_alumno) {
      showAlert("Por favor selecciona un estudiante para eliminar", "warning");
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
        showAlert("Estudiante eliminado exitosamente", "success");
        handleNew();
      } else {
        const errorData = await response.json();
        showAlert(
          `Error al eliminar el estudiante: ${errorData.error}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      showAlert("Ocurrió un error al eliminar el estudiante", "error");
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <Alert
        type={alert.type}
        message={alert.message}
        show={alert.show}
        onClose={() => setAlert((a) => ({ ...a, show: false }))}
      />
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

      <button
        onClick={handleOpenParentsList}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Agregar Encargados Legales
      </button>
      {showParentList && (
        <ParentList
          onClose={handleCloseParentList}
          onSelectParents={handleSelectedParent}
        />
      )}

      {studentParentsList.length > 0 && (
        <ParentCardList
          parents={studentParentsList}
          onRemove={handleRemoveParent}
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
                return (
                  (age >= minAge && age <= maxAge) ||
                  `La edad debe estar entre ${minAge} y ${maxAge} años`
                );
              },
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
              pattern: {
                value: /^[1-9]\d{4}\d{4}$/,
                message:
                  "Formato inválido. Use: ######### (ejemplo: 112341234)",
              },
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
                message:
                  "Debe ser un correo válido del MEP (@mep.go.cr o @est.mep.go.cr)",
              },
              maxLength: {
                value: 100,
                message: "El correo no puede exceder 100 caracteres",
              },
            })}
            error={errors.Correo_mep?.message}
          />
          <Select
            id="Id_seccion"
            label="Sección"
            options={sections.map((section) => ({
              label: section.Nombre,
              value: section.Id_seccion,
            }))}
            register={register}
            error={errors.Id_seccion?.message}
            value={watch("Id_seccion")?.toString()}
            required={true}
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
          onSave={handleSubmit(handleSave)}
          onDelete={handleDelete}
        />
      </form>
    </div>
  );
}
