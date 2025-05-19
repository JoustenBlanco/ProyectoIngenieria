"use client";
import React, { useState, useEffect } from "react";
import Student from "@/app/_components/students/student";
import Alert from "@/app/_components/feedBack/alert";

import { Textarea, Checkbox, Modal, Button } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface ExtendedStudent extends Student {
  Asistio: boolean;
  Comentarios: string;
}

const StudentsList: React.FC = () => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activeCommentStudentId, setActiveCommentStudentId] = useState<
    number | null
  >(null);
  const [modalComment, setModalComment] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info" | "warning"; show: boolean }>({
    message: "",
    type: "info",
    show: false,
  });
  const [confirm, setConfirm] = useState<{
    show: boolean;
    message: string;
    onConfirm: (() => void) | null;
    onCancel?: (() => void) | null;
  }>({
    show: false,
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    setAlert({ message, type, show: true });
  };

  const handleOpenCommentModal = (studentId: number, comment: string) => {
    setActiveCommentStudentId(studentId);
    setModalComment(comment || "");
    setCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
    setActiveCommentStudentId(null);
    setModalComment("");
  };

  const handleSaveComment = () => {
    if (activeCommentStudentId !== null) {
      handleCommentChange(activeCommentStudentId, modalComment);
    }
    handleCloseCommentModal();
  };

  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
    if (status == "unauthenticated") {
      console.log("No autenticado");
      redirect("/homepages/auth/login");
    }
  }, [session, status]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [studentsList, setStudentsList] = useState<ExtendedStudent[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const claseId = searchParams.get("claseId");

  const fetchParentsByStuden = async (id: number) => {
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

  // Cambia el estado de attendancePanels para incluir la lista de estudiantes por panel
  const [attendancePanels, setAttendancePanels] = useState([
    {
      comments: "",
      place: "",
      startTime: null as Date | null,
      endTime: null as Date | null,
      errors: {} as { [key: string]: string },
      asistenciaId: null as number | null,
      students: [] as ExtendedStudent[], // lista de estudiantes por panel
    },
  ]);
  const [expandedPanel, setExpandedPanel] = useState(0);

  const fetchStudents = async () => {
    if (sectionId && claseId) {
      const response = await fetch(
        `/api/alumnos_x_secciones?Id_seccion=${sectionId}`
      );
      const data = await response.json();
      // Mapea los estudiantes agregando los campos de ExtendedStudent
      return (data || []).map((student: any) => ({
        ...student,
        Asistio: false,
        Comentarios: "",
      })) as ExtendedStudent[];
    }
    return [];
  };

  const checkExistingAttendance = async (date: Date) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(
        `/api/asistencia/check?sectionId=${sectionId}&classId=${claseId}&date=${formattedDate}`,
        {
          cache: "no-store",
        }
      );
      const attendanceData = await response.json();

      if (Array.isArray(attendanceData) && attendanceData.length > 0) {
        // Mapea cada asistencia a un panel, incluyendo los estudiantes
        const panels = attendanceData.map((asistencia: any) => ({
          comments: asistencia.Comentarios || "",
          place: asistencia.Lugar || "",
          startTime: asistencia.Hora_inicio
            ? parseISO(asistencia.Hora_inicio)
            : null,
          endTime: asistencia.Hora_finalizacion
            ? parseISO(asistencia.Hora_finalizacion)
            : null,
          errors: {},
          asistenciaId: asistencia.Id_asistencia,
          students: (asistencia.RAE_Asistencia_X_Alumnos || []).map(
            (student: any) => ({
              Id_alumno: student.Id_alumno,
              Primer_nombre: student.RAE_Alumnos.Primer_nombre,
              Segundo_nombre: student.RAE_Alumnos.Segundo_nombre,
              Primer_apellido: student.RAE_Alumnos.Primer_apellido,
              Segundo_apellido: student.RAE_Alumnos.Segundo_apellido,
              Cedula: student.RAE_Alumnos.Cedula,
              Estado: student.RAE_Alumnos.Estado,
              Asistio: student.Asistio === "S",
              Comentarios: student.Comentarios || "",
            })
          ),
        }));
        setAttendancePanels(panels);
        setExpandedPanel(0);
        return attendanceData;
      } else if (attendanceData.Id_asistencia) {
        setAttendancePanels([
          {
            comments: attendanceData.Comentarios || "",
            place: attendanceData.Lugar || "",
            startTime: attendanceData.Hora_inicio
              ? parseISO(attendanceData.Hora_inicio)
              : null,
            endTime: attendanceData.Hora_finalizacion
              ? parseISO(attendanceData.Hora_finalizacion)
              : null,
            errors: {},
            asistenciaId: attendanceData.Id_asistencia,
            students: (attendanceData.RAE_Asistencia_X_Alumnos || []).map(
              (student: any) => ({
                Id_alumno: student.Id_alumno,
                Primer_nombre: student.RAE_Alumnos.Primer_nombre,
                Segundo_nombre: student.RAE_Alumnos.Segundo_nombre,
                Primer_apellido: student.RAE_Alumnos.Primer_apellido,
                Segundo_apellido: student.RAE_Alumnos.Segundo_apellido,
                Cedula: student.RAE_Alumnos.Cedula,
                Estado: student.RAE_Alumnos.Estado,
                Asistio: student.Asistio === "S",
                Comentarios: student.Comentarios || "",
              })
            ),
          },
        ]);
        setExpandedPanel(0);
        return [attendanceData];
      } else {
        // No hay asistencias para la fecha, cargar estudiantes desde fetchStudents
        const studentsList = await fetchStudents();
        setStudentsList(studentsList);
        setAttendancePanels([
          {
            comments: "",
            place: "",
            startTime: null,
            endTime: null,
            errors: {},
            asistenciaId: null,
            students: studentsList,
          },
        ]);
        setExpandedPanel(0);
        return [];
      }
    } catch (error) {
      console.error("Error al verificar la asistencia:", error);
      // También cargar estudiantes si hay error
      const studentsList = await fetchStudents();
      setAttendancePanels([
        {
          comments: "",
          place: "",
          startTime: null,
          endTime: null,
          errors: {},
          asistenciaId: null,
          students: studentsList,
        },
      ]);
      setExpandedPanel(0);
      return [];
    }
  };

  useEffect(() => {
    checkExistingAttendance(selectedDate);
  }, [sectionId, selectedDate, claseId]);

  const handleAttendanceChange = (id: number, isPresent: boolean) => {
    setAttendancePanels((prevPanels) => {
      const panels = [...prevPanels];
      panels[expandedPanel].students = panels[expandedPanel].students.map(
        (student) =>
          student.Id_alumno === id
            ? { ...student, Asistio: isPresent }
            : student
      );
      return panels;
    });
  };

  const handleCommentChange = (id: number, comment: string) => {
    setAttendancePanels((prevPanels) => {
      const panels = [...prevPanels];
      panels[expandedPanel].students = panels[expandedPanel].students.map(
        (student) =>
          student.Id_alumno === id
            ? { ...student, Comentarios: comment }
            : student
      );
      return panels;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setAttendancePanels((prevPanels) => {
      const panels = [...prevPanels];
      panels[expandedPanel].students = panels[expandedPanel].students.map(
        (student) => ({
          ...student,
          Asistio: checked,
        })
      );
      return panels;
    });
  };

  useEffect(() => {
    // Keep selectAll in sync with individual checkboxes
    const students = attendancePanels[expandedPanel]?.students || [];
    if (students.length > 0) {
      const allChecked = students.every((student) => student.Asistio);
      setSelectAll(allChecked);
    }
  }, [attendancePanels, expandedPanel]);

  const validateFields = () => {
    const panel = attendancePanels[expandedPanel];
    const newErrors: { [key: string]: string } = {};

    if (!selectedDate)
      newErrors.selectedDate = "La fecha de asistencia es obligatoria.";
    if (!panel.place) newErrors.place = "El lugar es obligatorio.";
    if (!panel.startTime)
      newErrors.startTime = "La hora de inicio es obligatoria.";
    if (!panel.endTime)
      newErrors.endTime = "La hora de finalización es obligatoria.";

    // Actualiza los errores solo para el panel expandido
    setAttendancePanels((prevPanels) => {
      const panels = [...prevPanels];
      panels[expandedPanel].errors = newErrors;
      return panels;
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAttendance = async () => {
    if (!validateFields()) return;

    const panel = attendancePanels[expandedPanel];
    const claseIdNumber = claseId ? parseInt(claseId, 10) : null;

    // Formatea la fecha para quitar las horas y evitar desfase de días en el backend
    const formattedDate = selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      : null;

    const attendanceData = {
      Comentarios: panel.comments,
      Fecha: formattedDate,
      Lugar: panel.place,
      Hora_inicio: panel.startTime,
      Hora_finalizacion: panel.endTime,
      Id_clase: claseIdNumber,
    };
    console.log("asistenciaData", attendanceData);
    try {
      let asistenciaId = panel.asistenciaId;
      if (asistenciaId) {
        // Modificar asistencia existente
        const response = await fetch(`/api/asistencia`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id_asistencia: asistenciaId,
            ...attendanceData,
          }),
        });
        const result = await response.json();
        if (result) {
          showAlert("Asistencia actualizada exitosamente.", "success");
          await handleSaveStudentAttendance(
            asistenciaId,
            panel.students,
            !!asistenciaId
          );
        }
      } else {
        // Crear nueva asistencia
        const response = await fetch("/api/asistencia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceData),
        });
        const result = await response.json();
        if (result && result.Id_asistencia) {
          showAlert("Asistencia guardada exitosamente.", "success");
          await handleSaveStudentAttendance(
            result.Id_asistencia,
            panel.students,
            false
          );
          // Actualiza el panel con el nuevo Id_asistencia
          setAttendancePanels((prevPanels) => {
            const panels = [...prevPanels];
            panels[expandedPanel].asistenciaId = result.Id_asistencia;
            return panels;
          });
        }
      }
    } catch (error) {
      console.error("Error guardando o actualizando asistencia:", error);
      showAlert("Hubo un error al guardar o actualizar la asistencia.", "error");
    }
  };

  const handleSaveStudentAttendance = async (
    attendanceId: number,
    students: ExtendedStudent[],
    isEdit: boolean
  ) => {
    try {
      await Promise.all(
        students.map(async (student) => {
          const { Id_alumno, Asistio, Comentarios } = student;

          // Guardar o actualizar asistencia por estudiante
          await fetch("/api/asistencia_x_alumnos", {
            method: isEdit ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Id_asistencia: attendanceId,
              Id_alumno,
              Asistio: Asistio ? "S" : "N",
              Comentarios: Comentarios || "",
            }),
          });

          // Si el estudiante no asistió, enviar correo
          if (!Asistio) {
            const studentRes = await fetch(
              `/api/alumnos/[id]?Id_estudiante=${Id_alumno}`
            );
            const studentData: Student = await studentRes.json();

            const parents = await fetchParentsByStuden(Id_alumno);
            const parentEmail = parents?.[0]?.Correo;

            if (parentEmail) {
              const htmlMessage = `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #2c3e50;">Aviso de ausencia a clases</h2>
                <p>Estimado/a padre, madre o encargado:</p>
                <p>
                  Le informamos que el/la estudiante
                  <strong style="color: #c0392b;">${
                    studentData.Primer_nombre
                  } ${studentData.Segundo_nombre} ${
                studentData.Primer_apellido
              } ${studentData.Segundo_apellido}</strong>
                  no asistió a clases el día <strong>${new Date().toLocaleDateString()}</strong>.
                </p>
                <p style="margin-top: 20px;">
                  Lo invitamos cordialmente a acercarse a las instalaciones para justificar la ausencia o esclarecer cualquier duda. 
                  Si ya justificaron la ausencia con antelación ignoren este mensaje, es genera aútomaticamente.
                  Le recordamos que las ausencias se pueden justificar en 5 días naturales y que el proceso se puede hacer mediante
                  el estudiante.
                </p>
                <div style="margin-top: 30px; padding: 15px; background-color: #ffdddd; border-left: 6px solid #e74c3c;">
                  <strong>Nota:</strong> Este mensaje ha sido generado automáticamente. Por favor, no responda a este correo.
                  Si tiene alguna duda contactese con nosotros mediante el número telefonico que está abajo. 
                </div>
                <p style="margin-top: 40px; font-size: 0.9em; color: #888;">
                  Liceo San Pedro<br>
                  Tel: [número del colegio] | Dirección: [San Pedro centro, Pérez Zeledón San José Costa Rica]
                </p>
              </div>
            `;

              await fetch("/api/send_email/parents", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: parentEmail,
                  subject: "Ausencia de estudiante a clases",
                  html: htmlMessage,
                }),
              });
            }
          }
        })
      );

      showAlert("Asistencia guardada exitosamente.", "success");
    } catch (error) {
      console.error("Error guardando la asistencia de estudiantes:", error);
      showAlert("Hubo un error al guardar la asistencia de los estudiantes.", "error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "a":
        return "bg-green-500 text-green-800";
      case "i":
        return "bg-red-500 text-red-800";
      default:
        return "bg-gray-700";
    }
  };

  const handleDeleteAttendance = async (panelIdx: number) => {
    const panel = attendancePanels[panelIdx];
    if (!panel.asistenciaId) {
      // Si es un panel nuevo (no guardado), solo lo quitamos del array
      setAttendancePanels((prevPanels) => {
        const panels = prevPanels.filter((_, i) => i !== panelIdx);
        let newExpanded = expandedPanel;
        if (expandedPanel === panelIdx) newExpanded = 0;
        else if (expandedPanel > panelIdx) newExpanded = expandedPanel - 1;
        setExpandedPanel(panels.length === 0 ? 0 : newExpanded);
        return panels.length === 0
          ? [
              {
                comments: "",
                place: "",
                startTime: null,
                endTime: null,
                errors: {},
                asistenciaId: null,
                students: studentsList,
              },
            ]
          : panels;
      });
      return;
    }

    // Usar Alert como confirmación
    setConfirm({
      show: true,
      message: "¿Está seguro que desea eliminar esta asistencia? Esta acción no se puede deshacer.",
      onConfirm: async () => {
        setConfirm((c) => ({ ...c, show: false }));
        try {
          // 1. Eliminar todos los registros de asistencia_x_alumnos para esta asistencia
          await Promise.all(
            panel.students.map(async (student) => {
              await fetch(
                `/api/asistencia_x_alumnos?Id_asistencia=${panel.asistenciaId}&Id_alumno=${student.Id_alumno}`,
                {
                  method: "DELETE",
                }
              );
            })
          );

          // 2. Eliminar la asistencia
          await fetch(`/api/asistencia?Id_asistencia=${panel.asistenciaId}`, {
            method: "DELETE",
          });

          // 3. Quitar el panel del estado
          setAttendancePanels((prevPanels) => {
            const panels = prevPanels.filter((_, i) => i !== panelIdx);
            let newExpanded = expandedPanel;
            if (expandedPanel === panelIdx) newExpanded = 0;
            else if (expandedPanel > panelIdx) newExpanded = expandedPanel - 1;
            setExpandedPanel(panels.length === 0 ? 0 : newExpanded);
            return panels.length === 0
              ? [
                  {
                    comments: "",
                    place: "",
                    startTime: null,
                    endTime: null,
                    errors: {},
                    asistenciaId: null,
                    students: studentsList,
                  },
                ]
              : panels;
          });

          showAlert("Asistencia eliminada correctamente.", "success");
        } catch (error) {
          console.error("Error eliminando la asistencia:", error);
          showAlert("Hubo un error al eliminar la asistencia.", "error");
        }
      },
      onCancel: () => setConfirm((c) => ({ ...c, show: false })),
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Alert message */}
      <div className="w-full max-w-2xl mx-auto mt-2">
        <Alert
          type={alert.type}
          message={alert.message}
          show={alert.show}
          onClose={() => setAlert((a) => ({ ...a, show: false }))}
        />
        {/* Confirm modal */}
        <Alert
          type="warning"
          message={confirm.message}
          show={confirm.show}
          buttons={[
            {
              text: "Cancelar",
              onClick: () => confirm.onCancel && confirm.onCancel(),
              color: "gray",
            },
            {
              text: "Eliminar",
              onClick: () => confirm.onConfirm && confirm.onConfirm(),
              color: "red",
            },
          ]}
        />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-gray-500 dark:text-gray-400 text-center">
        Registrar Asistencia
      </h1>
      {/* DatePicker global para seleccionar la fecha, fuera de los paneles */}
      <div className="mb-6 flex flex-col items-center">
        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Fecha de Asistencia
        </label>
        <DatePicker
          selected={selectedDate || new Date()}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(date);
            }
          }}
          dateFormat="dd/MM/yyyy"
          className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white w-64"
        />
        {errors.selectedDate && (
          <p className="text-red-500 text-sm">{errors.selectedDate}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full flex-1">
        {/* Students List - Main Panel */}
        <div className="flex-1 bg-white rounded-2xl dark:bg-gray-800 shadow-md p-4 md:p-6 overflow-auto max-h-[70vh] min-w-[320px]">
          <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">
            Lista de Estudiantes
          </h2>
          <div className="flex justify-end items-center mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Marcar todos
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
                title="Marcar todos"
              />
            </label>
          </div>
          {/* Tabla responsiva para sm: usa bloques en vez de filas */}
          <div className="block md:hidden">
            {(attendancePanels[expandedPanel]?.students || []).map(
              (student) => (
                <div
                  key={student.Id_alumno}
                  className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow flex flex-col gap-2"
                >
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Nombre:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">{`${student.Primer_nombre} ${student.Segundo_nombre} ${student.Primer_apellido} ${student.Segundo_apellido}`}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Cédula:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {student.Cedula}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Estado:{" "}
                    </span>
                    <span
                      className={`rounded-full ${getStatusColor(
                        student.Estado
                      )} text-xs px-2 py-1`}
                    >
                      {student.Estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Presente:
                    </span>
                    <input
                      type="checkbox"
                      id={`attendance-${student.Id_alumno}`}
                      name={`attendance-${student.Id_alumno}`}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded"
                      checked={student.Asistio}
                      onChange={(e) =>
                        handleAttendanceChange(
                          student.Id_alumno,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Comentarios:
                    </span>
                    <Button
                      size="xs"
                      className="w-auto h-auto p-0 m-0 min-w-0 min-h-0"
                      color="blue"
                      onClick={() =>
                        handleOpenCommentModal(
                          student.Id_alumno,
                          student.Comentarios
                        )
                      }
                    >
                      <img
                        src={`/images/new.svg`}
                        alt="Add"
                        className="w-4 h-4 m-0"
                      />
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
          {/* Tabla tradicional para md+ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-200">
              <thead>
                <tr className="w-full bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Cédula</th>
                  <th className="py-3 px-6 hidden 2xl:block">Estado</th>
                  <th className="py-3 px-6">Presente</th>
                  <th className="py-3 hidden xl:block">
                    <div className="w-full h-full flex justify-center items-center">
                      Comentarios
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(attendancePanels[expandedPanel]?.students || []).map(
                  (student) => (
                    <tr
                      key={student.Id_alumno}
                      className="border-b dark:border-gray-700 justify-center items-center py-1"
                    >
                      <td className="py-2">
                        <h2 className="text-sm font-bold text-gray-500 pr-8 w-80 ml-4">{`${student.Primer_nombre} ${student.Segundo_nombre} ${student.Primer_apellido} ${student.Segundo_apellido}`}</h2>
                      </td>
                      <td className="justify-center items-center py-1">
                        <p className="text-sm text-gray-500 w-full text-center">
                          {student.Cedula}
                        </p>
                      </td>
                      <td className="hidden 2xl:block py-1">
                        <div className="flex justify-center items-center">
                          <div className="w-14 text-center px-4">
                            <p
                              className={`rounded-full ${getStatusColor(
                                student.Estado
                              )} text-sm p-1`}
                            >
                              {student.Estado}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-1">
                        <div className="flex justify-center items-center h-full w-full">
                          <input
                            type="checkbox"
                            id={`attendance-${student.Id_alumno}`}
                            name={`attendance-${student.Id_alumno}`}
                            className="h-4 w-4 text-green-600 focus:gray-300 bg-red-600 border-gray-300 rounded"
                            checked={student.Asistio}
                            onChange={(e) =>
                              handleAttendanceChange(
                                student.Id_alumno,
                                e.target.checked
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className="hidden xl:block h-full w-full py-1">
                        <div className="flex justify-center items-center h-full w-full">
                          <Button
                            size="xs"
                            className="w-auto h-auto p-0 m-0 min-w-0 min-h-0"
                            color="blue"
                            onClick={() =>
                              handleOpenCommentModal(
                                student.Id_alumno,
                                student.Comentarios
                              )
                            }
                          >
                            <img
                              src={`/images/pencil.svg`}
                              alt="Edit"
                              className="w-4 h-4 m-0"
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Attendance Form - Side Panel */}
        <div className="flex flex-col gap-6 w-full md:w-[340px] flex-shrink-0">
          {attendancePanels.map((panel, idx) => {
            const isExpanded = expandedPanel === idx;
            return (
              <div
                key={idx}
                className={`bg-white p-0 md:p-0 rounded-lg shadow-md dark:bg-gray-800 h-fit self-start mb-2 border transition-all duration-200 ${
                  isExpanded
                    ? "border-blue-500"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer"
                }`}
                onClick={() => {
                  if (!isExpanded) setExpandedPanel(idx);
                }}
                style={{ overflow: "hidden" }}
              >
                {/* Panel comprimido */}
                {!isExpanded && (
                  <div className="flex flex-col gap-2 p-4 select-none">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        Lugar:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {panel.place || (
                          <span className="italic text-gray-400">Sin lugar</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        Horario:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {panel.startTime
                          ? format(panel.startTime, "h:mm aa")
                          : "--:--"}{" "}
                        -{" "}
                        {panel.endTime
                          ? format(panel.endTime, "h:mm aa")
                          : "--:--"}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-sm border border-blue-200 dark:border-blue-800 transition hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer"
                        style={{ userSelect: "none" }}
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z"/>
                        </svg>
                        Click para editar
                      </span>
                    </div>
                  </div>
                )}
                {/* Panel expandido */}
                {isExpanded && (
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-blue-700 dark:text-blue-300">
                        Asistencia #{idx + 1}
                      </span>
                      {attendancePanels.length > 1 && (
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-semibold shadow-sm border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-800 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAttendance(idx);
                          }}
                          type="button"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                          Eliminar
                        </button>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Lugar
                      </label>
                      <input
                        type="text"
                        value={panel.place || ""}
                        onChange={(e) => {
                          const newPanels = [...attendancePanels];
                          newPanels[idx].place = e.target.value;
                          setAttendancePanels(newPanels);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingrese el lugar de la asistencia"
                      />
                      {panel.errors.place && (
                        <p className="text-red-500 text-sm">
                          {panel.errors.place}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Comentarios
                      </label>
                      <textarea
                        value={panel.comments || ""}
                        onChange={(e) => {
                          const newPanels = [...attendancePanels];
                          newPanels[idx].comments = e.target.value;
                          setAttendancePanels(newPanels);
                        }}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Escriba comentarios adicionales (opcional)"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Inicio
                        </label>
                        <DatePicker
                          selected={panel.startTime}
                          onChange={(date: Date | null) => {
                            const newPanels = [...attendancePanels];
                            newPanels[idx].startTime = date;
                            setAttendancePanels(newPanels);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Hora"
                          dateFormat="h:mm aa"
                          className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white w-full"
                        />
                        {panel.errors.startTime && (
                          <p className="text-red-500 text-sm">
                            {panel.errors.startTime}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Finalización
                        </label>
                        <DatePicker
                          selected={panel.endTime}
                          onChange={(date: Date | null) => {
                            const newPanels = [...attendancePanels];
                            newPanels[idx].endTime = date;
                            setAttendancePanels(newPanels);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Hora"
                          dateFormat="h:mm aa"
                          className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white w-full"
                        />
                        {panel.errors.endTime && (
                          <p className="text-red-500 text-sm">
                            {panel.errors.endTime}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí luego se ajustará la lógica para guardar la asistencia de este panel
                        handleSaveAttendance();
                      }}
                      className="mt-6 bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all w-full"
                    >
                      Guardar Asistencia
                    </button>
                    <div className="flex justify-end mt-2">
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs font-semibold border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedPanel(-1);
                        }}
                        type="button"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                        Minimizar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <button
            className="mt-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-500 transition-all w-full"
            onClick={(e) => {
              e.stopPropagation();
              setAttendancePanels([
                ...attendancePanels,
                {
                  comments: "",
                  place: "",
                  startTime: null,
                  endTime: null,
                  errors: {},
                  asistenciaId: null,
                  students: studentsList,
                },
              ]);
              setExpandedPanel(attendancePanels.length);
            }}
          >
            + Agregar otra asistencia
          </button>
        </div>
      </div>
      {/* Modal for editing comments */}
      <Modal
        show={commentModalOpen}
        onClose={handleCloseCommentModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Editar Comentario
            </h3>
            <Textarea
              value={modalComment}
              onChange={(e) => setModalComment(e.target.value)}
              placeholder="Escriba el comentario"
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button color="gray" onClick={handleCloseCommentModal}>
                Cancelar
              </Button>
              <Button color="blue" onClick={handleSaveComment}>
                Guardar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentsList;
