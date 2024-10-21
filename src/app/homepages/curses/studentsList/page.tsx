"use client";
import React from "react";
import Student from "@/app/components/students/student"; // Asegúrate de que el path esté correcto.

const students = [
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Activo",
    present: "N"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Inactivo",
    present: "S"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Activo",
    present: "N"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Inactivo",
    present: "S"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Activo",
    present: "S"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Inactivo",
    present: "S"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Activo",
    present: "S"
  },
  {
    image: "/images/user.svg",
    name: "Jousten Xavier Blanco Fonseca",
    id: "293492929",
    status: "Inactivo",
    present: "S"
  },

];

const StudentsList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">
        Lista de Estudiantes
      </h1>
      <div className="bg-white rounded-2xl">
        <div className="h-12 flex flex-row px-8 justify-start text-gray-500">
            <span>Nombre</span>
            <span className="ml-80">Cédula</span>
            <span className="ml-12">Estado</span>
            <span className="ml-36">Presente</span>
        </div>
        <div>
          {students.map((student, index) => (
            <Student
              key={index}
              image={student.image}
              name={student.name}
              id={student.id}
              status={student.status}
              present={student.present}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
