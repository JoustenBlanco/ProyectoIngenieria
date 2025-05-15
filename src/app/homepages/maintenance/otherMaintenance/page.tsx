"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SectionsMaintenance from "./SectionsMaintenance";
import ClassesMaintenance from "./ClassesMaintenance";
import SubjectsMaintenance from "./SubjectsMaintenance";

const MaintenancePage = () => {
  const { data: session, status } = useSession();
  const [selectedSection, setSelectedSection] = useState<'sections' | 'classes' | 'subjects'>('sections');

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/homepages/auth/login");
    }
  }, [session, status]);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Mantenimiento de Secciones, Clases y Materias
      </h1>
      <div className="mb-8">
        <select
          className="w-full md:w-64 p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value as 'sections' | 'classes' | 'subjects')}
        >
          <option value="sections">Secciones</option>
          <option value="classes">Clases</option>
          <option value="subjects">Materias</option>
        </select>
      </div>
      <div className="relative">
        {selectedSection === "sections" && <SectionsMaintenance />}
        {selectedSection === "classes" && <ClassesMaintenance />}
        {selectedSection === "subjects" && <SubjectsMaintenance />}
      </div>
    </div>
  );
};

export default MaintenancePage;
