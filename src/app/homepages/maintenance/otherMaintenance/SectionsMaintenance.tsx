import React from "react";
import Input from "../../../_components/Atoms/input";
import ActionButtons from "../../../_components/Atoms/ActionButtonsSimplified";
import Select from "../../../_components/Atoms/select";
import Modal from "../../../_components/Atoms/modal";
import ExcelFilePicker from "@/app/_components/maintenance/excelFilePicker";
import { useForm } from "react-hook-form";
import { parseSectionExcelFormat, parseStudentsExcelFormat } from "@/app/utils/xlsxParser";
import { createStudentPerSeccion, getFunctionaryIdByCedula } from "@/app/services/create_session_excel";
import { convertToISODate } from "@/app/utils/dateCast";
import { useSecciones } from "../../../hooks/useSecciones";
import { useFuncionarios } from "../../../hooks/useFuncionarios";

const SectionsMaintenance = () => {
  const { sections, fetchSections } = useSecciones();
  const { funcionarios } = useFuncionarios();
  const [ExcelSStudentsData, setExcelStudentsData] = React.useState<ExcelData[]>([]);
  const [isSectionModalOpen, setIsSectionModalOpen] = React.useState(false);
  const [sectionToEdit, setSectionToEdit] = React.useState<Seccion | null>(null);

  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    formState: { errors: errorsSection },
    reset: resetSection,
    setValue,
  } = useForm<Seccion>();

  const handleExcelSectionData = async (arrayBuffer: ArrayBuffer) => {
    const jsonSectionData = await parseSectionExcelFormat(Buffer.from(arrayBuffer));
    const functionaryId = await getFunctionaryIdByCedula(Number(jsonSectionData[2].value));
    const jsonStudentsData = await parseStudentsExcelFormat(Buffer.from(arrayBuffer));
    setExcelStudentsData(jsonStudentsData);

    const dataFromExcel: CreateSeccion = {
      Id_funcionario: functionaryId,
      Nombre: String(jsonSectionData[0].value),
      Grado: String(jsonSectionData[1].value),
      Estado: String(jsonSectionData[3].value),
      Comentarios: String(jsonSectionData[4].value),
    };
    setValue("Nombre", dataFromExcel.Nombre);
    setValue("Grado", dataFromExcel.Grado);
    setValue("Id_funcionario", dataFromExcel.Id_funcionario);
    setValue("Estado", dataFromExcel.Estado);
    setValue("Comentarios", dataFromExcel.Comentarios);
  };

  const handleCreateSection = async (data: Seccion) => {
    data.Id_funcionario = Number(data.Id_funcionario);
    try {
      const response = await fetch("/api/secciones", {
        method: sectionToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const bodyResponse: Seccion = await response.json();
        if (ExcelSStudentsData.length > 0 && bodyResponse.Id_seccion !== null) {
          const sectionStudents: CreateStudent[] = ExcelSStudentsData.map((student: ExcelData) => ({
            Id_seccion: bodyResponse.Id_seccion,
            Primer_nombre: String(student.Primer_nombre),
            Segundo_nombre: String(student.Segundo_Nombre),
            Primer_apellido: String(student.Primer_apellido),
            Segundo_apellido: String(student.Segundo_apellido),
            Cedula: String(student.Cedula),
            Fecha_nacimiento: convertToISODate(String(student.Fecha_nacimiento)),
            Grado: String(student.Grado),
            Estado: String(student.Estado),
            Correo_mep: String(student.Correo_mep),
          }));
          try {
            createStudentPerSeccion(sectionStudents, bodyResponse.Id_seccion);
            setExcelStudentsData([]);
          } catch (error) {
            console.error("Error al crear estudiantes:", error);
            alert("Error al crear estudiantes de la sección desde documento Excel");
          }
        }
        alert("Sección guardada exitosamente");
        fetchSections();
        handleNew();
      } else {
        alert("Error al guardar la Sección");
      }
    } catch (error) {
      console.error("Error en la petición", error);
      alert("Ocurrió un error");
    }

    setIsSectionModalOpen(false);
    setSectionToEdit(null);
  };

  const handleEditSection = (section: Seccion) => {
    setSectionToEdit(section);
    setIsSectionModalOpen(true);
    resetSection(section);
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
        alert("Sección eliminada exitosamente");
        handleNew();
        fetchSections();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar la sección: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación", error);
      alert("Ocurrió un error al eliminar la sección");
    }
  };

  const handleNew = () => {
    resetSection({
      Estado: "",
      Comentarios: "",
      Grado: "",
      Nombre: "",
    });
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="font-bold py-2 px-4 rounded text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsSectionModalOpen(true)}
        >
          + Agregar Sección
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          <table className="w-full bg-white dark:bg-gray-800 dark:text-gray-200">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6">Nombre</th>
                <th className="py-3 px-6">Grado</th>
                <th className="py-3 px-6">Funcionario</th>
                <th className="py-3 px-6">Estado</th>
                <th className="py-3 px-6 text-right pr-20">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.Id_seccion} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6 text-center">{section.Nombre}</td>
                  <td className="py-4 px-6 text-center">{section.Grado}</td>
                  <td className="py-4 px-6 text-center">{section.RAE_Funcionarios.Primer_nombre}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        section.Estado === "A" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {section.Estado === "A" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <ActionButtons onEdit={() => handleEditSection(section)} onDelete={() => handleDeleteSection(section)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
              required: "Debe nombrar la sección",
            })}
            error={errorsSection.Nombre?.message}
          />
          <Select
            id="Grado"
            register={registerSection}
            label="Grado"
            options={["Setimo", "Octavo", "Noveno", "Decimo", "Undecimo"]}
            {...registerSection("Grado", { required: true })}
            error={errorsSection.Estado?.message}
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
            options={[
              { label: "Activo", value: "A" },
              { label: "Inactivo", value: "I" },
            ]}
            {...registerSection("Estado", { required: true })}
            error={errorsSection.Estado?.message}
          />
          <Input label="Comentarios" id="Commentarios" type="text" {...registerSection("Comentarios")} />
          <div className="flex items-center justify-end gap-4">
            <ExcelFilePicker onFileLoaded={handleExcelSectionData} />
            <ActionButtons onSubmit={() => {}} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SectionsMaintenance;