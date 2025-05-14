"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../_components/Atoms/input";
import ActionButtons from "../../../_components/Atoms/ActionButtonsSimplified";
import Select from "../../../_components/Atoms/select";
import Modal from "../../../_components/Atoms/modal";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import ExcelFilePicker from "@/app/_components/maintenance/excelFilePicker";
import { parseSectionExcelFormat, parseStudentsExcelFormat } from "@/app/utils/xlsxParser";
import { createStudentPerSeccion, getFunctionaryIdByCedula } from "@/app/services/create_session_excel";
import { convertToISODate } from "@/app/utils/dateCast";

const MaintenancePage = () => {
  const { data: session, status } = useSession();
  const [selectedSection, setSelectedSection] = useState<'sections' | 'classes' | 'subjects'>('sections');

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/homepages/auth/login");
    }
  }, [session, status]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const [sections, setSections] = useState<Seccion[]>([]);
  const [classes, setClasses] = useState<Clase[]>([]);
  const [subjects, setSubjects] = useState<Materia[]>([]);
  const [ExcelSStudentsData, setExcelStudentsData] = useState<ExcelData[]>([]);

  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);

  const [sectionToEdit, setSectionToEdit] = useState<Seccion | null>(null);
  const [classToEdit, setClassToEdit] = useState<Clase | null>(null);
  const [subjectToEdit, setSubjectToEdit] = useState<Materia | null>(null);
  const handleExcelSectionData = async (arrayBuffer: ArrayBuffer) => {
    const jsonSectionData = await parseSectionExcelFormat(Buffer.from(arrayBuffer));
    const functionaryId = await getFunctionaryIdByCedula(Number(jsonSectionData[2].value));
    const jsonStudentsData = await parseStudentsExcelFormat(Buffer.from(arrayBuffer));
    console.log("jsonStudentsData", jsonStudentsData);
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

  // Formulario para Sección
  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    formState: { errors: errorsSection },
    reset: resetSection,
    setValue,
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
          console.log("Datos de estudiantes:", sectionStudents);
          try {
            createStudentPerSeccion(sectionStudents, bodyResponse.Id_seccion);
            setExcelStudentsData([]);
          }
          catch (error) {
            console.error("Error al crear estudiantes:", error);
            alert("Error al crear estudiantes de la seccion desde documento Excel");
          }

        }
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

      {/* Selector de Sección */}
      <div className="mb-8">
        <select
          className="w-full md:w-64 p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value as 'sections' | 'classes' | 'subjects')}
        >
          <option value="sections">Secciones</option>
          <option value="classes">Clases</option>
          <option value="subjects">Materias</option>
        </select>
      </div>

      {/* Contenido Dinámico */}
      <div className="relative">
        {/* Botón de Agregar */}
        <div className="flex justify-end mb-4">
          <button
            className={`font-bold py-2 px-4 rounded text-white ${selectedSection === 'sections' ? 'bg-blue-600 hover:bg-blue-700' :
              selectedSection === 'classes' ? 'bg-green-600 hover:bg-green-700' :
                'bg-purple-600 hover:bg-purple-700'}`}
            onClick={() => {
              if (selectedSection === 'sections') setIsSectionModalOpen(true);
              else if (selectedSection === 'classes') setIsClassModalOpen(true);
              else setIsSubjectModalOpen(true);
            }}
          >
            + Agregar {selectedSection === 'sections' ? 'Sección' :
              selectedSection === 'classes' ? 'Clase' : 'Materia'}
          </button>
        </div>

        {/* Tabla con scroll */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* Vista tipo tarjetas para sm */}
            <div className="block md:hidden">
              {selectedSection === 'sections' && sections.map((section) => (
                <div key={section.Id_seccion} className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow flex flex-col gap-2">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Nombre: </span>
                    <span className="text-gray-600 dark:text-gray-300">{section.Nombre}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Grado: </span>
                    <span className="text-gray-600 dark:text-gray-300">{section.Grado}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Funcionario: </span>
                    <span className="text-gray-600 dark:text-gray-300">{section.RAE_Funcionarios.Primer_nombre}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Estado: </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${section.Estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {section.Estado === 'A' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <ActionButtons
                      onEdit={() => handleEditSection(section)}
                      onDelete={() => handleDeleteSection(section)}
                    />
                  </div>
                </div>
              ))}
              {selectedSection === 'classes' && classes.map((clase) => (
                <div key={clase.Id_clase} className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow flex flex-col gap-2">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Descripción: </span>
                    <span className="text-gray-600 dark:text-gray-300">{clase.Descripcion}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Materia: </span>
                    <span className="text-gray-600 dark:text-gray-300">{clase.RAE_Materia.Nombre}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Sección: </span>
                    <span className="text-gray-600 dark:text-gray-300">{clase.RAE_Secciones.Nombre}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Funcionario: </span>
                    <span className="text-gray-600 dark:text-gray-300">{clase.RAE_Funcionarios.Primer_nombre + " " + clase.RAE_Funcionarios.Primer_apellido}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Estado: </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${clase.Estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {clase.Estado === 'A' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <ActionButtons
                      onEdit={() => handleEditClass(clase)}
                      onDelete={() => handleDeleteClass(clase)}
                    />
                  </div>
                </div>
              ))}
              {selectedSection === 'subjects' && subjects.map((subject) => (
                <div key={subject.Id_materia} className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow flex flex-col gap-2">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Nombre: </span>
                    <span className="text-gray-600 dark:text-gray-300">{subject.Nombre}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Tipo: </span>
                    <span className="text-gray-600 dark:text-gray-300">{subject.Tipo_materia}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Descripción: </span>
                    <span className="text-gray-600 dark:text-gray-300">{subject.Descripcion}</span>
                  </div>
                  <div className="flex justify-end">
                    <ActionButtons
                      onEdit={() => handleEditSubject(subject)}
                      onDelete={() => handleDeleteSubject(subject)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Tabla tradicional para md+ */}
            <table className="w-full bg-white dark:bg-gray-800 dark:text-gray-200 hidden md:table">
              {selectedSection === 'sections' && (
                <>
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
                          <span className={`px-2 py-1 rounded-full text-xs ${section.Estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {section.Estado === 'A' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <ActionButtons
                            onEdit={() => handleEditSection(section)}
                            onDelete={() => handleDeleteSection(section)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {selectedSection === 'classes' && (
                <>
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
                    {classes.map((clase) => (
                      <tr key={clase.Id_clase} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="py-4 px-6 text-center">{clase.Descripcion}</td>
                        <td className="py-4 px-6 text-center">{clase.RAE_Materia.Nombre}</td>
                        <td className="py-4 px-6 text-center">{clase.RAE_Secciones.Nombre}</td>
                        <td className="py-4 px-6 text-center">
                          {clase.RAE_Funcionarios.Primer_nombre + " " + clase.RAE_Funcionarios.Primer_apellido}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${clase.Estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {clase.Estado === 'A' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <ActionButtons
                            onEdit={() => handleEditClass(clase)}
                            onDelete={() => handleDeleteClass(clase)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {selectedSection === 'subjects' && (
                <>
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
                      <tr key={subject.Id_materia} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                </>
              )}
            </table>
          </div>
        </div>
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
            options={[{label: "Activo", value: "A"}, {label: "Inactivo", value: "I"}]}
            {...registerSection("Estado", { required: true })}
            error={errorsSection.Estado?.message}
          />
          <Input
            label="Comentarios"
            id="Commentarios"
            type="text"
            {...registerSection("Comentarios")}
          />
          <div className='flex items-center justify-end gap-4'>
            <ExcelFilePicker onFileLoaded={handleExcelSectionData} />
            <ActionButtons
              onSubmit={() => { }}
            />
          </div>
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
