"use client";

import { Datepicker, Select, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
import SelectionModal from "@/app/components/Reports/selectionModal";
import ReportTable from "@/app/components/Reports/reportTable";
import ReportChart from "@/app/components/Reports/reportChart";
import ExportButtons from "@/app/components/Reports/exportButtons";
interface ReportTableProps {
  reportType: string;
  data: any[];
}

export default function Reports() {
  const [isHistorical, setIsHistorical] = useState(true);
  const [selectedReportType, setSelectedReportType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const validateAndFetchData = () => {

    if (!selectedReportType) {
      alert("Seleccione un tipo de reporte.");
      return;
    }

    if (selectedReportType !== "General LSP" && !selectedItem) {
      alert(`Seleccione ${selectedReportType.replace("Por ", "")}`);
      return;
    }

    if (!isHistorical && (!startDate || !endDate)) {
      alert("Seleccione un rango de fechas válido.");
      return;
    }

    // Simulación de datos dinámicos
    const simulatedData = [
      {
        Fecha: "2024-03-10",
        Curso: "Matemáticas",
        Estudiante: "Juan Pérez",
        Asistencia: "Presente",
      },
      {
        Fecha: "2024-03-10",
        Curso: "Historia",
        Estudiante: "María López",
        Asistencia: "Presente",
      },
      {
        Fecha: "2024-04-10",
        Curso: "Historia",
        Estudiante: "María López",
        Asistencia: "Ausente",
      },
      {
        Fecha: "2024-05-10",
        Curso: "Historia",
        Estudiante: "María López",
        Asistencia: "Ausente",
      },
      {
        Fecha: "2024-06-10",
        Curso: "Historia",
        Estudiante: "María López",
        Asistencia: "Ausente",
      },
      {
        Fecha: "2024-07-10",
        Curso: "Historia",
        Estudiante: "María López",
        Asistencia: "Ausente",
      },
    ];

    setReportData(simulatedData);
    setShowTable(true);
  };

  const reportOptions = [
    "Por Estudiante",
    "Por Curso",
    "Por Sección",
    "Por Docente",
    "Por Grado",
    "General LSP",
  ];

  // Datos simulados según el tipo de reporte
  const getOptionsByReportType = () => {
    switch (selectedReportType) {
      case "Por Estudiante":
        return ["Juan Pérez", "María López", "Carlos Gómez"];
      case "Por Curso":
        return ["Matemáticas", "Historia", "Ciencias"];
      case "Por Sección":
        return ["Sección A", "Sección B", "Sección C"];
      case "Por Docente":
        return ["Prof. García", "Prof. Rodríguez", "Prof. Fernández"];
      case "Por Grado":
        return ["Primer Grado", "Segundo Grado", "Tercer Grado"];
      default:
        return [];
    }
  };

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
          <Select
            id="reports"
            required
            onChange={(e) => setSelectedReportType(e.target.value)}
          >
            <option value="">Seleccione un tipo</option>
            {reportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          {selectedReportType &&
            selectedReportType !== "General LSP" && ( // Si no es "General LSP", se debe seleccionar algo
              <div className="max-w-md grid grid-cols-1 gap-2 items-center">
                <Button onClick={() => setIsModalOpen(true)}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  Seleccionar {selectedReportType.replace("Por ", "")}
                </Button>

                {selectedItem && (
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <span className="text-gray-700 dark:text-gray-300">
                      {selectedReportType.replace("Por ", "")}: {selectedItem}
                    </span>
                  </div>
                )}
              </div>
            )}
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
        <Button onClick={validateAndFetchData} className="mt-6">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
          Ver Vista Previa
        </Button>
      </div>
      {showTable && (
        <>
          <ReportTable reportType={selectedReportType} data={reportData} />
          <ReportChart reportType={selectedReportType} data={reportData} />
          <ExportButtons reportType={selectedReportType} data={reportData} />
        </>
      )}
      <SelectionModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedReportType.replace("Por ", "")}
        options={getOptionsByReportType()}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
}
