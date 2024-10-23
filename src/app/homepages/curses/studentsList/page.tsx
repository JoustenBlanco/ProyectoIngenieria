"use client";
import React, { useState, useEffect } from "react";
import Student from "@/app/components/students/student";
import { Student as StudentType } from "../../../../../types";
import { useSearchParams } from "next/navigation";

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");

  useEffect(() => {
    const fetchStudents = async () => {
      if (sectionId) {
        try {
          const response = await fetch(`/api/alumnos_x_secciones?Id_seccion=${sectionId}`);
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [sectionId]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Lista de Estudiantes</h1>
      <div className="bg-white rounded-2xl">
        <div className="h-12 flex flex-row px-8 justify-start text-gray-500">
          <span>Nombre</span>
          <span className="ml-80">Cédula</span>
          <span className="ml-12">Estado</span>
          <span className="ml-36">Presente</span>
        </div>
        <div>
          {students.map((student) => (
            <Student
              key={student.Id_alumno}
              image="/images/user.svg"
              name={`${student.Primer_nombre} ${student.Segundo_nombre} ${student.Primer_apellido} ${student.Segundo_apellido}`}
              id={student.Cedula}
              status={student.Estado}
              present="N/A"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
