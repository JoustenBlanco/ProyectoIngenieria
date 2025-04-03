"use client";
import Report from "../../components/Reports/report";
import Carousel from "../../components/Atoms/carousel";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";


export default function Reports() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
  if (status == "unauthenticated"){
    console.log("No autenticado");
    redirect("/homepages/auth/login");
  }
},
 [session, status]);

  const images = [
    "/images/escudo.svg",
    "/images/To-do-list.svg",
  ];

  const titles = [
    "Liceo San Pedro",
    "Control de Asistencias LSP",
  ];
  const descriptions = [
    "Cada día es una nueva oportunidad para aprender, crecer y brillar",
    "Controla la asistencia de tus estudiantes",
  ];
  return (
    <div className="p-6 flex flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Información</h1>
      <div className="md:w-96 text-white p-7 flex items-center justify-center bg-gray-100 flex-col">
        <Carousel images={images} titles={titles} descriptions={descriptions} />
      </div>
    </div>
  );
}
