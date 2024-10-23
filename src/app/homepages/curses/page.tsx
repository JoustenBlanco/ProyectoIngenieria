"use client";

import { useState, useEffect } from "react";
import useAuthStore from "../../../../provider/store";
import Curse from "../../components/curses/curse";
import { ClaseXSessiones } from "../../../../types";

export default function Curses() {
  const user = useAuthStore((state) => state.user);
  const [clases, setClases] = useState<ClaseXSessiones[]>([]); 
  const idFuncionario = user?.Id;

  
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

  console.log('El data es ', clases);
  return (
    <div className="p-6 flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-500">Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full justify-center items-center transition-all duration-300">
        {clases.map((clase:ClaseXSessiones) => (
            <Curse
              key={`${clase.Id_clase}`}
              image="/images/students.svg"
              title={`Sección ${clase.RAE_Secciones.Nombre} - ${clase.RAE_Materia.Nombre}`}
              description={clase.Descripcion || "Sin descripción"}
              route="/homepages/curses/studentsList"
              sectionId={clase.Id_seccion.toString()} // Pasar el ID del curso
            />
        ))}
      </div>
    </div>
  );
}
