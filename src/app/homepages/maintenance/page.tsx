"use client";
import Mainten from "../../_components/maintenance/maintenance";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Loading from "../../_components/feedBack/loading"; // Importa Loading

export default function Maintenance() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
    if (status == "unauthenticated") {
      console.log("No autenticado");
      redirect("/homepages/auth/login");
    }
  }, [session, status]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">Mantenimiento</h1>
      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
        <Mainten
          image="/images/userBold.svg"
          title="Usuarios"
          route="/homepages/maintenance/users"
        />
        <Mainten
          image="/images/student.svg"
          title="Estudiantes"
          route="/homepages/maintenance/students"
        />
        <Mainten
          image="/images/guardians.svg"
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
