"use client";
import Report from "../../components/Reports/report";

export default function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Reportes</h1>
      <div className="grid grid-col gap-16 w-full">
        <Report
          image="/images/user.svg"
          title="Estudiante por Materia"
        />
        <Report
          image="/images/students.svg"
          title="Sección por Materia"
        />
        <Report
          image="/images/historyclock.svg"
          title="Histórico"
        />
      </div>
    </div>
  );
}
