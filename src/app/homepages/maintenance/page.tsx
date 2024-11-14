"use client";
import Mainten from "../../components/maintenance/maintenance";

export default function Maintenance() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">Mantenimiento</h1>
      <div className="grid grid-col gap-16 w-full">
        <Mainten
          image="/images/students.svg"
          title="Usuarios"
          route="/homepages/maintenance/users"
        />
        <Mainten
          image="/images/students.svg"
          title="Estudiantes"
          route="/homepages/maintenance/students"
        />
        <Mainten
          image="/images/students.svg"
          title="Encargados Legales"
          route="/homepages/maintenance/legal_guardians"
        />
        <Mainten
          image="/images/config.svg"
          title="Otros"
          route="/homepages/maintenance/otherMaintenance"
        />
      </div>
    </div>
  );
}
