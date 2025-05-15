import React from "react";
import Input from "../../../_components/Atoms/input";
import ActionButtons from "../../../_components/Atoms/ActionButtonsSimplified";
import Select from "../../../_components/Atoms/select";
import Modal from "../../../_components/Atoms/modal";
import { useForm } from "react-hook-form";
import { useClases } from "../../../hooks/useClases";
import { useMaterias } from "../../../hooks/useMaterias";
import { useFuncionarios } from "../../../hooks/useFuncionarios";
import { useSecciones } from "../../../hooks/useSecciones";

const ClassesMaintenance = () => {
  const { classes, fetchClasses, setClasses } = useClases();
  const { subjects } = useMaterias();
  const { funcionarios } = useFuncionarios();
  const { sections } = useSecciones();

  const [isClassModalOpen, setIsClassModalOpen] = React.useState(false);
  const [classToEdit, setClassToEdit] = React.useState<Clase | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const {
    register: registerClass,
    handleSubmit: handleSubmitClass,
    formState: { errors: errorsClass },
    reset: resetClass,
  } = useForm<Clase>();

  React.useEffect(() => {
    fetchClasses();
    // Los otros hooks ya hacen fetch en su propio useEffect
  }, [fetchClasses]);

  const handleSearchClasses = async (descripcion: string) => {
    try {
      const response = await fetch(`/api/clases/like?descripcion=${encodeURIComponent(descripcion)}`);
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        setClasses([]);
      }
    } catch (error) {
      setClasses([]);
    }
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
        resetClass({
          Descripcion: "",
          Estado: "",
        });
      } else {
        alert("Error al guardar la Clase");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }

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
        resetClass({
          Descripcion: "",
          Estado: "",
        });
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

  return (
    <>
      {/* Buscador y botón de Agregar */}
      <div className="flex justify-between mb-4 items-center">
        <Input
          id="searchClass"
          name="searchClass"
          label="Buscar Clase"
          type="text"
          placeholder="Por descripción..."
          className="mr-2 w-52 md:w-72"
          value={searchTerm}
          onChange={e => {
            const value = e.target.value;
            setSearchTerm(value);
            if (value.trim() === "") {
              fetchClasses();
            } else {
              handleSearchClasses(value);
            }
          }}
        />
        <button
          className="font-bold py-2 px-4 rounded text-white bg-green-600 hover:bg-green-700"
          onClick={() => setIsClassModalOpen(true)}
        >
          + Agregar Clase
        </button>
      </div>

      {/* Tabla con scroll */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        {/* Tarjetas para sm */}
        <div className="sm:hidden flex flex-col gap-4 p-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {classes.length === 0 ? (
            <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 dark:text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <span>No se encontraron clases</span>
                    </div>
                  </td>
                </tr>
          ) : (
            classes.map((clase) => (
              <div
                key={clase.Id_clase}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2 text-gray-600 dark:text-gray-200"
              >
                <div>
                  <span className="font-semibold">Descripción: </span>
                  <span>{clase.Descripcion}</span>
                </div>
                <div>
                  <span className="font-semibold">Materia: </span>
                  <span>{clase.RAE_Materia.Nombre}</span>
                </div>
                <div>
                  <span className="font-semibold">Sección: </span>
                  <span>{clase.RAE_Secciones.Nombre}</span>
                </div>
                <div>
                  <span className="font-semibold">Funcionario: </span>
                  <span>
                    {clase.RAE_Funcionarios.Primer_nombre +
                      " " +
                      clase.RAE_Funcionarios.Primer_apellido}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Estado: </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      clase.Estado === "A"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {clase.Estado === "A" ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <div className="flex justify-end">
                  <ActionButtons
                    onEdit={() => handleEditClass(clase)}
                    onDelete={() => handleDeleteClass(clase)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        {/* Tabla tradicional para md+ */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto hidden sm:block">
          <table className="w-full bg-white dark:bg-gray-800 dark:text-gray-200">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6">Descripción</th>
                <th className="py-3 px-6">Materia</th>
                <th className="py-3 px-6">Sección</th>
                <th className="py-3 px-6">Funcionario</th>
                <th className="py-3 px-6">Estado</th>
                <th className="py-3 px-6 text-right pr-20">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 dark:text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <img src="/images/search-empty.svg" alt="Sin resultados" className="w-16 h-16 mx-auto mb-2 opacity-70" />
                      <span>No se encontraron clases</span>
                    </div>
                  </td>
                </tr>
              ) : (
                classes.map((clase) => (
                  <tr
                    key={clase.Id_clase}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6 text-center">{clase.Descripcion}</td>
                    <td className="py-4 px-6 text-center">
                      {clase.RAE_Materia.Nombre}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {clase.RAE_Secciones.Nombre}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {clase.RAE_Funcionarios.Primer_nombre +
                        " " +
                        clase.RAE_Funcionarios.Primer_apellido}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          clase.Estado === "A"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {clase.Estado === "A" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <ActionButtons
                        onEdit={() => handleEditClass(clase)}
                        onDelete={() => handleDeleteClass(clase)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar clase */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        title={classToEdit ? "Editar Clase" : "Agregar Clase"}
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
    </>
  );
};

export default ClassesMaintenance;