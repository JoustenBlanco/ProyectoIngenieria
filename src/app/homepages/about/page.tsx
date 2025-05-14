"use client";
import Report from "../../_components/Reports/report";
import Carousel from "../../_components/Atoms/carousel";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Reports() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/homepages/auth/login");
    }
  }, [session, status]);

  const images = ["/images/escudo.svg", "/images/To-do-list.svg"];
  const titles = ["Liceo San Pedro", "Control de Asistencias LSP"];
  const descriptions = [
    "Cada día es una nueva oportunidad para aprender, crecer y brillar",
    "Controla la asistencia de tus estudiantes",
  ];

  return (
    <div className="p-6 flex flex-col justify-start items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">Información</h1>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded-2xl p-6 space-y-6 transition-colors duration-300">
        <Carousel images={images} titles={titles} descriptions={descriptions} />

        <div className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
          <p>
            Este sistema fue desarrollado con el propósito de mejorar el control de asistencia
            de los estudiantes del <strong>Liceo San Pedro</strong>, promoviendo una gestión
            más organizada y eficiente para el cuerpo docente y administrativo.
          </p>
          <p className="mt-4">
            El proyecto fue realizado por <strong>Jousten Blanco Fonseca</strong> y <strong>Sebastián Granados Barrantes</strong>,
            en los periodos lectivos de <strong>2024-2025</strong>, como parte de los cursos de <strong>Ingeniería en Sistemas I, II y III </strong>
            de la <strong>Universidad Nacional de Costa Rica</strong>, <em>Sede Regional Brunca, Pérez Zeledón</em>.
          </p>
          <p className="mt-4">
            Utilizando tecnologías modernas como <strong>React</strong>, <strong>Next.js</strong> y <strong>Tailwind CSS</strong>,
            se logró desarrollar una interfaz intuitiva, segura y accesible para registrar asistencias, generar reportes
            y facilitar la toma de decisiones dentro de la institución.
          </p>
          <p className="mt-4 italic text-sm text-gray-500 dark:text-gray-400">
            “La educación no cambia el mundo: cambia a las personas que van a cambiar el mundo.” – Paulo Freire
          </p>
        </div>
      </div>
    </div>
  );
}
