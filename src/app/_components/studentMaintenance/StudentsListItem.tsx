import React from "react";

interface Student {
  Id_alumno: number;
  Primer_nombre: string;
  Segundo_nombre?: string;
  Primer_apellido: string;
  Segundo_apellido?: string;
  Cedula?: string;
  Estado: string;
}

interface StudentListItemProps {
    student: Student;
  onSelect: () => void;
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {student.Primer_nombre} {student.Primer_apellido}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{student.Cedula}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{student.Estado}</p>
    </div>
  );
};

export default StudentListItem;
