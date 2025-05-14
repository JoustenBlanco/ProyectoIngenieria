import React, { useEffect, useState } from "react";
import StudentListItem from "./StudentsListItem";
import DarkModeWrapper from "../DarkModeWreapper/DarkModeWrapper";

interface Student {
  Id_alumno: number;
  Primer_nombre: string;
  Segundo_nombre?: string;
  Primer_apellido: string;
  Segundo_apellido?: string;
  Cedula?: string;
  Estado: string;
}

interface StudentListProps {
  onClose: () => void;
  onSelectStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  onClose,
  onSelectStudent,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/alumnos");
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          throw new Error("Error al obtener los alumnos");
        }
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <DarkModeWrapper>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 w-4/5 max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Lista de Estudiantes
          </h2>

          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              Cargando...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-1"
              style={{ maxHeight: "55vh" }}
            >
              {students.map((student) => (
                <StudentListItem
                  key={student.Id_alumno}
                  student={student}
                  onSelect={() => {
                    onSelectStudent(student);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 transition duration-150"
          >
            Cerrar
          </button>
        </div>
      </div>
    </DarkModeWrapper>
  );
};

export default StudentList;
