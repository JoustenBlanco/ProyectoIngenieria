"use client";

import { Datepicker, Select, Checkbox } from "flowbite-react";
import { useState } from "react";

export default function Reports() {
  const [isHistorical, setIsHistorical] = useState(true);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-5">
        <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">
          Reportes de Asistenia
        </h1>
        <div className="max-w-md grid grid-cols-1 gap-2">
          <span className="text-gray-500 dark:text-gray-400">
            Tipo de Reporte
          </span>
          <Select id="reports" required>
            <option>Por Estudiante</option>
            <option>Por Curso </option>
            <option>Por Sección</option>
            <option>Por Docente</option>
            <option>Por Grado</option>
            <option>General LSP</option>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="history"
              defaultChecked
              checked={isHistorical}
              onChange={(e) => setIsHistorical(e.target.checked)}
            />
            <span className="text-gray-500 dark:text-gray-400">Histórico</span>
          </div>
          {!isHistorical && (
            <div className="flex span  items-center justify-start gap-3">
              <span className="text-gray-500 dark:text-gray-400">Entre</span>
              <Datepicker title="Desde" />
              <span className="text-gray-500 dark:text-gray-400">y</span>
              <Datepicker title="Hasta" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
