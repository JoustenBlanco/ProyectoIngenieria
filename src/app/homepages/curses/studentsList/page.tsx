"use client";
import React, { useState, useEffect } from "react";
import Student from "@/app/_components/students/student";

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
  const [activeCommentStudentId, setActiveCommentStudentId] = useState<number | null>(null);
  const [modalComment, setModalComment] = useState("");

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
  },
    [session, status]);
  const [comments, setComments] = useState<string | null>("");
  const [place, setPlace] = useState<string | null>("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [existingAttendance, setExistingAttendance] = useState<any | null>(
    null
  );

  const [students, setStudents] = useState<Student[]>([]);
  const [extendedStudents, setExtendedStudents] = useState<ExtendedStudent[]>(
    []
  );
  const [isExistingAttendance, setIsExistingAttendance] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const claseId = searchParams.get("claseId");

  const checkExistingAttendance = async (date: Date) => {
    try {
      console.log(
        "se esta ejecutando la revicion de asistencia de la fecha actual"
      );
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(
        `/api/asistencia/check?sectionId=${sectionId}&classId=${claseId}&date=${formattedDate}`,
        {
          cache: "no-store",
        }
      );

      const attendanceData = await response.json();

      if (attendanceData.Id_asistencia) {
        console.log("Datos de asistencia existentes:", attendanceData);
        console.log(attendanceData.RAE_Asistencia_X_Alumnos);
        const studentsData: ExtendedStudent[] =
          attendanceData.RAE_Asistencia_X_Alumnos.map((student: any) => ({
            Id_alumno: student.Id_alumno,
            Primer_nombre: student.RAE_Alumnos.Primer_nombre,
            Segundo_nombre: student.RAE_Alumnos.Segundo_nombre,
            Primer_apellido: student.RAE_Alumnos.Primer_apellido,
            Segundo_apellido: student.RAE_Alumnos.Segundo_apellido,
            Cedula: student.RAE_Alumnos.Cedula,
            Estado: student.RAE_Alumnos.Estado,
            Asistio: student.Asistio === "S",
            Comentarios: student.Comentarios || "",
          }));
        console.log(studentsData);
        setExtendedStudents(studentsData);

        setExistingAttendance(attendanceData);
        setComments(attendanceData.Comentarios || "");
        setPlace(attendanceData.Lugar || "");
        setStartTime(
          attendanceData.Hora_inicio
            ? parseISO(attendanceData.Hora_inicio)
            : null
        );
        setEndTime(
          attendanceData.Hora_finalizacion
            ? parseISO(attendanceData.Hora_finalizacion)
            : null
        );
        return attendanceData;
      } else {
        setExtendedStudents([]);
        setExistingAttendance(null);
        setComments("");
        setPlace("");
        setStartTime(null);
        setEndTime(null);
        return null;
      }
    } catch (error) {
      console.error("Error al verificar la asistencia:", error);
      return null;
    }
  };

  useEffect(() => {
    if (existingAttendance) {
      setComments(existingAttendance.Comentarios || "");
      setPlace(existingAttendance.Lugar || "");
      setStartTime(
        existingAttendance.Hora_inicio
          ? parseISO(existingAttendance.Hora_inicio)
          : null
      );
      setEndTime(
        existingAttendance.Hora_finalizacion
          ? parseISO(existingAttendance.Hora_finalizacion)
          : null
      );
    }
  }, [existingAttendance]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (sectionId && selectedDate && claseId) {
        const existing = await checkExistingAttendance(selectedDate);
        try {
          const response = await fetch(
            `/api/alumnos_x_secciones?Id_seccion=${sectionId}`
          );
          const data = await response.json();
          setStudents(data);
          if (existing) {
            setIsExistingAttendance(true);
          } else {
            setExtendedStudents(
              data.map((student: any) => ({
                ...student,
                Asistio: false,
                Comentarios: "",
              }))
            );
            setIsExistingAttendance(false);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [sectionId, selectedDate, claseId]);

  const handleAttendanceChange = (id: number, isPresent: boolean) => {
    setExtendedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.Id_alumno === id ? { ...student, Asistio: isPresent } : student
      )
    );
  };

  const handleCommentChange = (id: number, comment: string) => {
    setExtendedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.Id_alumno === id
          ? { ...student, Comentarios: comment }
          : student
      )
    );
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedDate)
      newErrors.selectedDate = "La fecha de asistencia es obligatoria.";
    if (!place) newErrors.place = "El lugar es obligatorio.";
    if (!startTime) newErrors.startTime = "La hora de inicio es obligatoria.";
    if (!endTime) newErrors.endTime = "La hora de finalización es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAttendance = async () => {
    if (!validateFields()) return;

    const claseIdNumber = claseId ? parseInt(claseId, 10) : null;

    const attendanceData = {
      Comentarios: comments,
      Fecha: selectedDate,
      Lugar: place,
      Hora_inicio: startTime,
      Hora_finalizacion: endTime,
      Id_clase: claseIdNumber,
    };

    try {
      if (existingAttendance) {
        const response = await fetch(`/api/asistencia`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id_asistencia: existingAttendance.Id_asistencia,
            ...attendanceData,
          }),
        });

        const result = await response.json();
        if (result) {
          alert("Asistencia actualizada exitosamente.");
          await handleSaveStudentAttendance(existingAttendance.Id_asistencia);
        }
      } else {
        const response = await fetch("/api/asistencia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceData),
        });

        const result = await response.json();

        if (result) {
          alert("Asistencia guardada exitosamente.");
          await handleSaveStudentAttendance(result.Id_asistencia);
        }
      }
    } catch (error) {
      console.error("Error guardando o actualizando asistencia:", error);
      alert("Hubo un error al guardar o actualizar la asistencia.");
    }
  };

  const handleSaveStudentAttendance = async (attendanceId: number) => {
    try {
      await Promise.all(
        extendedStudents.map(async (student) => {
          const { Id_alumno, Asistio, Comentarios } = student;
          const response = await fetch("/api/asistencia_x_alumnos", {
            method: isExistingAttendance ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Id_asistencia: attendanceId,
              Id_alumno: Id_alumno,
              Asistio: Asistio ? "S" : "N",
              Comentarios: Comentarios || "",
            }),
          });
          return response.json();
        })
      );
      alert("Asistencia guardada exitosamente.");
    } catch (error) {
      console.error("Error guardando la asistencia de estudiantes:", error);
      alert("Hubo un error al guardar la asistencia de los estudiantes.");
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

  return (
    <div className="flex flex-col w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-500 dark:text-gray-400 text-center">Registrar Asistencia</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full flex-1">
        {/* Students List - Main Panel */}
        <div className="flex-1 bg-white rounded-2xl dark:bg-gray-800 shadow-md p-4 md:p-6 overflow-auto max-h-[70vh] min-w-[320px]">
          <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">Lista de Estudiantes</h2>
          <div className="overflow-x-auto">
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
                {extendedStudents.map((student) => (
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
                          onClick={() => handleOpenCommentModal(student.Id_alumno, student.Comentarios)}
                        >
                          <img src={`/images/new.svg`} alt="Add" className="w-4 h-4 m-0" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Attendance Form - Side Panel */}
        <div className="w-full md:w-[340px] flex-shrink-0 bg-white p-4 md:p-6 rounded-lg shadow-md dark:bg-gray-800 h-fit self-start">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Asistencia</label>
            <DatePicker
              selected={selectedDate || new Date()}
              onChange={(date: Date | null) => {
                if (date) {
                  setSelectedDate(date);
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white w-full"
            />
            {errors.selectedDate && (
              <p className="text-red-500 text-sm">{errors.selectedDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lugar</label>
            <input
              type="text"
              value={place || ""}
              onChange={(e) => setPlace(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese el lugar de la asistencia"
            />
            {errors.place && (
              <p className="text-red-500 text-sm">{errors.place}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comentarios</label>
            <textarea
              value={comments || ""}
              onChange={(e) => setComments(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escriba comentarios adicionales (opcional)"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inicio</label>
              <DatePicker
                selected={startTime}
                onChange={(date: Date | null) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white w-full"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm">{errors.startTime}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Finalización</label>
              <DatePicker
                selected={endTime}
                onChange={(date: Date | null) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white w-full"
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm">{errors.endTime}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleSaveAttendance}
            className="mt-6 bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all w-full"
          >
            Guardar Asistencia
          </button>
        </div>
      </div>
      {/* Modal for editing comments */}
      <Modal show={commentModalOpen} onClose={handleCloseCommentModal} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editar Comentario</h3>
            <Textarea
              value={modalComment}
              onChange={(e) => setModalComment(e.target.value)}
              placeholder="Escriba el comentario"
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button color="gray" onClick={handleCloseCommentModal}>Cancelar</Button>
              <Button color="blue" onClick={handleSaveComment}>Guardar</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentsList;
