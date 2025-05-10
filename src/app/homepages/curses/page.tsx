"use client";

import { useState, useEffect } from "react";
import useAuthStore from "../../../../provider/store";
import Curse from "../../_components/curses/curse";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Curses() {
  const user = useAuthStore((state) => state.user);
  const [clases, setClases] = useState<ClaseXSessiones[]>([]); 
  const idFuncionario = user?.Id;
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
  if (status == "unauthenticated"){
    console.log("No autenticado");
    redirect("/homepages/auth/login");
  }
},
 [session, status]);

  
  useEffect(() => {
    const fetchClases = async () => {
      if (idFuncionario) {
        try {
          const response = await fetch(`/api/funcionarios_x_clases?Id_funcionario=${idFuncionario}`);
          const data = await response.json();
          console.log('El data es ', user);
          setClases(data);
        } catch (error) {
          console.error("Error fetching clases:", error);
        }
      }
    };

    fetchClases();
  }, [idFuncionario]);
  return (
    <div className="p-6 flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-500 dark:text-gray-400">Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full justify-center items-center transition-all duration-300">
        {clases.map((clase:ClaseXSessiones) => (
            <Curse
              key={`${clase.Id_clase}`}
              image="/images/students.svg"
              title={`Sección ${clase.RAE_Secciones.Nombre} - ${clase.RAE_Materia.Nombre}`}
              description={clase.Descripcion || "Sin descripción"}
              route="/homepages/curses/studentsList"
              sectionId={clase.Id_seccion.toString()}
              claseId={clase.Id_clase.toString()} // Pasar el ID de la sección
            />
        ))}
      </div>
    </div>
  );
}
