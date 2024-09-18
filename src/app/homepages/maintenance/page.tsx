"use client";
import Mainten from "../../components/maintenance/maintenance";

export default function Maintenance() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Mantenimiento</h1>
      <div className="grid grid-col gap-16 w-full">
        <Mainten
          image="/images/students.svg"
          title="Usuarios"
        />
        <Mainten
          image="/images/students.svg"
          title="Estudiantes"
        />
        <Mainten
          image="/images/students.svg"
          title="Encargados Legales"
        />
      </div>
    </div>
  );
}
