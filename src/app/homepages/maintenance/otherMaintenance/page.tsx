"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../components/Atoms/input";
import ActionButtons from "../../../components/Atoms/ActionButtonsSimplified";
import Select from "../../../components/Atoms/select";
import Modal from "../../../components/Atoms/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Seccion, Clase, Materia, Funcionarios } from "../../../../../types";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const MaintenancePage = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
  if (status == "unauthenticated"){
    console.log("No autenticado");
    redirect("/homepages/auth/login");
  }
},
 [session, status]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const [sections, setSections] = useState<Seccion[]>([]);
  const [classes, setClasses] = useState<Clase[]>([]);
  const [subjects, setSubjects] = useState<Materia[]>([]);

  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);

  const [sectionToEdit, setSectionToEdit] = useState<Seccion | null>(null);
  const [classToEdit, setClassToEdit] = useState<Clase | null>(null);
  const [subjectToEdit, setSubjectToEdit] = useState<Materia | null>(null);

  // Formulario para Sección
  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    formState: { errors: errorsSection },
    reset: resetSection,
  } = useForm<Seccion>();

  // Formulario para Clase
  const {
    register: registerClass,
    handleSubmit: handleSubmitClass,
    formState: { errors: errorsClass },
    reset: resetClass,
  } = useForm<Clase>();

  // Formulario para Materia
  const {
    register: registerSubject,
    handleSubmit: handleSubmitSubject,
    formState: { errors: errorsSubject },
    reset: resetSubject,
  } = useForm<Materia>();

  const fetchSections = async () => {
    try {
      const response = await fetch("/api/secciones");
      if (response.ok) {
        const data = await response.json();
        setSections(data);
      } else {
        throw new Error("Error al obtener las Secciones");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("/api/clases");
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        throw new Error("Error al obtener las Clases");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/materias");
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        throw new Error("Error al obtener las Materias");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch("/api/funcionarios");
      if (response.ok) {
        const data = await response.json();
        setFuncionarios(data);
      } else {
        throw new Error("Error al obtener las Materias");
      }
    } catch (error) {
      console.error("Error al cargar funcionarios:", error);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchClasses();
    fetchSubjects();
    fetchFuncionarios();
  }, []);

  const handleCreateSection = async (data: Seccion) => {
    data.Id_funcionario = Number(data.Id_funcionario);
    console.log("Datos a enviar:", data);
    try {
      const response = await fetch("/api/secciones", {
        method: sectionToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Seccion guardada exitosamente");
        fetchSections();
        handleNew();
      } else {
        alert("Error al guardar la Seccion");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }

    console.log("Sección creada:", data);

    setIsSectionModalOpen(false);
    setSectionToEdit(null);
  };

  const handleEditSection = (section: Seccion) => {
    setSectionToEdit(section);
    setIsSectionModalOpen(true);
    resetSection(section); // Cargar datos en los inputs
  };

  const handleDeleteSection = async (data: Seccion) => {
    try {
      const response = await fetch("/api/secciones", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_seccion: data.Id_seccion }),
      });

      if (response.ok) {
        alert("Seccion eliminada exitosamente");
        handleNew();
        fetchSections();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar la seccion: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar la seccion");
    }
  };

  const handleNew = () => {
    resetSection({
      Estado: "",
      Comentarios: "",
      Grado: "",
      Nombre: "",
    });
    resetClass({               
      Descripcion: "",         
      Estado: "",      
    });
    resetSubject({               
        Descripcion: "",         
        Tipo_materia: "", 
        Nombre: "",     
      });
  };

  const handleCreateClass = async (data: Clase) => {
    data.Id_funcionario = Number(data.Id_funcionario);
    data.Id_materia = Number(data.Id_materia);
    data.Id_seccion = Number(data.Id_seccion);
    console.log("Datos a enviar:", data);
    try {
      const response = await fetch("/api/clases", {
        method: classToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Clase guardada exitosamente");
        fetchClasses();
        handleNew();
      } else {
        alert("Error al guardar la Clase");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }

    console.log("Sección creada:", data);

    setIsClassModalOpen(false);
    setClassToEdit(null);
  };

  const handleEditClass = (clase: Clase) => {
    setClassToEdit(clase);
    setIsClassModalOpen(true);
    resetClass(clase);
  };

  const handleDeleteClass = async (data: Clase) => {
    try {
      const response = await fetch("/api/clases", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_clase: data.Id_clase }),
      });

      if (response.ok) {
        alert("Clase eliminada exitosamente");
        handleNew();
        fetchClasses();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar la clase: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar la clase");
    }
  };

  const handleCreateSubject = async (data: Materia) => {
    console.log("Datos a enviar:", data);
    try {
      const response = await fetch("/api/materias", {
        method: subjectToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Materia guardada exitosamente");
        fetchSubjects();
        handleNew();
      } else {
        alert("Error al guardar la Materia");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }

    console.log("Materia creada:", data);

    setIsSubjectModalOpen(false);
    setSubjectToEdit(null);
  };

  const handleEditSubject = (subject: Materia) => {
    setSubjectToEdit(subject);
    setIsSubjectModalOpen(true);
    resetSubject(subject);
  };

  const handleDeleteSubject = async (data: Materia) => {
    try {
      const response = await fetch("/api/materias", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id_materia: data.Id_materia }),
      });

      if (response.ok) {
        alert("Materia eliminada exitosamente");
        handleNew();
        fetchSubjects();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar la materia: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar la materia");
    }
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Mantenimiento de Secciones, Clases y Materias
      </h1>

      {/* Secciones */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Secciones
          </h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => setIsSectionModalOpen(true)}
          >
            + Agregar Sección
          </button>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 dark:bg-gray-700">
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Grado</th>
              <th className="py-3 px-6">Funcionario</th>
              <th className="py-3 px-6">Estado</th>
              <th className="py-3 px-6 text-right pr-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr
                key={section.Id_seccion}
                className="border-b dark:border-gray-700"
              >
                <td className="py-4 px-6 text-center">{section.Nombre}</td>
                <td className="py-4 px-6 text-center">{section.Grado}</td>
                <td className="py-4 px-6 text-center">
                  {section.RAE_Funcionarios.Primer_nombre}
                </td>
                <td className="py-4 px-6 text-center">{section.Estado}</td>
                <td className="py-4 px-6">
                  <ActionButtons
                    onEdit={() => {
                      handleEditSection(section);
                    }}
                    onDelete={() => {
                      handleDeleteSection(section);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clases */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Clases
          </h2>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-green-500 dark:hover:bg-green-600"
            onClick={() => setIsClassModalOpen(true)}
          >
            + Agregar Clase
          </button>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 dark:bg-gray-700">
              <th className="py-3 px-6">Descripción</th>
              <th className="py-3 px-6">Materia</th>
              <th className="py-3 px-6">Sección</th>
              <th className="py-3 px-6">Funcionario</th>
              <th className="py-3 px-6">Estado</th>
              <th className="py-3 px-6 text-right pr-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((clase) => (
              <tr
                key={clase.Id_clase}
                className="border-b dark:border-gray-700"
              >
                <td className="py-4 px-6 text-center">{clase.Descripcion}</td>
                <td className="py-4 px-6 text-center">{clase.RAE_Materia.Nombre}</td>
                <td className="py-4 px-6 text-center">{clase.RAE_Secciones.Nombre}</td>
                <td className="py-4 px-6 text-center">
                  {clase.RAE_Funcionarios.Primer_nombre + " " + clase.RAE_Funcionarios.Primer_apellido}
                </td>
                <td className="py-4 px-6 text-center">{clase.Estado}</td>
                <td className="py-4 px-6 text-center">
                  <ActionButtons
                    onEdit={() => {
                        handleEditClass(clase);
                    }}
                    onDelete={() => {
                        handleDeleteClass(clase);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Materias */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Materias
          </h2>
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded dark:bg-purple-700 dark:hover:bg-purple-800"
            onClick={() => setIsSubjectModalOpen(true)}
          >
            + Agregar Materia
          </button>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 dark:bg-gray-700">
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Tipo</th>
              <th className="py-3 px-6">Descripción</th>
              <th className="py-3 px-6 text-right pr-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject.Id_materia}
                className="border-b dark:border-gray-700"
              >
                <td className="py-4 px-6 text-center">{subject.Nombre}</td>
                <td className="py-4 px-6 text-center">
                  {subject.Tipo_materia}
                </td>
                <td className="py-4 px-6 text-center">{subject.Descripcion}</td>
                <td className="py-4 px-6 text-center">
                  <ActionButtons
                    onEdit={() => {
                        handleEditSubject(subject);
                    }}
                    onDelete={() => {
                      handleDeleteSubject(subject);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {/* Modal para agregar sección */}
      <Modal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        title={sectionToEdit ? "Editar Sección" : "Agregar Sección"}
      >
        <form onSubmit={handleSubmitSection(handleCreateSection)}>
          <Input
            label="Nombre de la Sección"
            id="Nombre"
            type="text"
            {...registerSection("Nombre", {
              required: "Debe seleccionar un funcionario",
            })}
            error={errorsSection.Nombre?.message}
          />
          <Input
            id="Grado"
            type="text"
            label="Grado"
            {...registerSection("Grado", { required: true })}
            error={errorsSection.Grado?.message}
          />
          <Select
            id="Id_funcionario"
            label="Funcionario Encargado"
            register={registerSection}
            options={funcionarios.map((funcionario) => ({
              label: `${funcionario.Primer_nombre} ${funcionario.Primer_apellido}`,
              value: funcionario.Id_funcionario,
            }))}
            {...registerSection("Id_funcionario", { required: true })}
            error={errorsSection.Id_funcionario?.message}
          />
          <Select
            id="Estado"
            register={registerSection}
            label="Estado"
            options={["A", "I"]}
            {...registerSection("Estado", { required: true })}
            error={errorsSection.Estado?.message}
          />
          <Input
            label="Comentarios"
            id="Commentarios"
            type="text"
            {...registerSection("Comentarios")}
          />
          <ActionButtons
            onSubmit={() => {
              /* Logica de editar */
            }}
          />
        </form>
      </Modal>

      {/* Modal para agregar clase */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        title={sectionToEdit ? "Editar Clase" : "Agregar Clase"}
      >
        <form onSubmit={handleSubmitClass(handleCreateClass)}>
          <Input
            id="Desc"
            type="text"
            label="Descripción de la Clase"
            {...registerClass("Descripcion", { required: true })}
            error={errorsClass.Descripcion?.message}
          />
          <Select
            id="Id_materia"
            register={registerClass}
            label="Materia"
            options={subjects.map((subject) => ({
              label: `${subject.Nombre}`,
              value: subject.Id_materia,
            }))}
            {...registerClass("Id_materia", { required: true })}
            error={errorsClass.Id_materia?.message}
          />
          <Select
            id="Id_funcionario"
            register={registerClass}
            label="Funcionario"
            options={funcionarios.map((funcionario) => ({
              label: `${funcionario.Primer_nombre} ${funcionario.Primer_apellido}`,
              value: funcionario.Id_funcionario,
            }))}
            {...registerClass("Id_funcionario", { required: true })}
            error={errorsClass.Id_funcionario?.message}
          />
          <Select
            id="Id_seccion"
            register={registerClass}
            label="Seccion"
            options={sections.map((section) => ({
              label: `${section.Nombre} ${section.Comentarios}`,
              value: section.Id_seccion,
            }))}
            {...registerClass("Id_seccion", { required: true })}
            error={errorsClass.Id_seccion?.message}
          />
          <Select
            id="Estado"
            register={registerClass}
            label="Estado"
            options={["A", "I"]}
            {...registerClass("Estado", { required: true })}
            error={errorsClass.Estado?.message}
          />
          <ActionButtons
            onSubmit={() => {
              /* Logica de editar */
            }}
          />
        </form>
      </Modal>

      {/* Modal para agregar materia */}
      <Modal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        title="Agregar Materia"
      >
        <form onSubmit={handleSubmitSubject(handleCreateSubject)}>
          <Input
            id="Nombre"
            type="text"
            label="Nombre de la Materia"
            {...registerSubject("Nombre", { required: true })}
            error={errorsSubject.Nombre?.message}
          />
          <Input
            id="Desc"
            type="text"
            label="Descripción de la Materia"
            {...registerSubject("Descripcion", { required: true })}
            error={errorsSubject.Descripcion?.message}
          />
          <Select
            register={registerSubject}
            id="Tipo_materia"
            label="Tipo de Materia"
            options={["Obligatoria", "Optativa"]}
            {...registerSubject("Tipo_materia", { required: true })}
            error={errorsSubject.Tipo_materia?.message}
          />
          <ActionButtons
            onSubmit={() => {
              /* Logica de editar */
            }}
          />
        </form>
      </Modal>
    </div>
  );
};

export default MaintenancePage;
