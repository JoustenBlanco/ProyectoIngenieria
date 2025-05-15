import React from "react";
import Input from "../../../_components/Atoms/input";
import ActionButtons from "../../../_components/Atoms/ActionButtonsSimplified";
import Select from "../../../_components/Atoms/select";
import Modal from "../../../_components/Atoms/modal";
import { useForm } from "react-hook-form";
import { useMaterias } from "../../../hooks/useMaterias";

const SubjectsMaintenance = () => {
  const { subjects, fetchSubjects } = useMaterias();
  const [isSubjectModalOpen, setIsSubjectModalOpen] = React.useState(false);
  const [subjectToEdit, setSubjectToEdit] = React.useState<Materia | null>(null);

  const {
    register: registerSubject,
    handleSubmit: handleSubmitSubject,
    formState: { errors: errorsSubject },
    reset: resetSubject,
  } = useForm<Materia>();

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
        resetSubject({
          Nombre: "",
          Tipo_materia: "",
          Descripcion: "",
        });
      } else {
        alert("Error al guardar la Materia");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }

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
    <>
      <div className="flex justify-end mb-4">
        <button
          className="font-bold py-2 px-4 rounded text-white bg-purple-600 hover:bg-purple-700"
          onClick={() => setIsSubjectModalOpen(true)}
        >
          + Agregar Materia
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          <table className="w-full bg-white dark:bg-gray-800 dark:text-gray-200">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
              <tr>
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
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6 text-center">{subject.Nombre}</td>
                  <td className="py-4 px-6 text-center">{subject.Tipo_materia}</td>
                  <td className="py-4 px-6 text-center">{subject.Descripcion}</td>
                  <td className="py-4 px-6 text-center">
                    <ActionButtons
                      onEdit={() => handleEditSubject(subject)}
                      onDelete={() => handleDeleteSubject(subject)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        title={subjectToEdit ? "Editar Materia" : "Agregar Materia"}
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
    </>
  );
};

export default SubjectsMaintenance;