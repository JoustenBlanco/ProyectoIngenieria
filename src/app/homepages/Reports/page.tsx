"use client";

import { Datepicker, Select, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
import SelectionModal from "@/app/components/Reports/selectionModal";
import ReportTable from "@/app/components/Reports/reportTable";
import ReportChart from "@/app/components/Reports/reportChart";
import ExportButtons from "@/app/components/Reports/exportButtons";
import { Student as StudentType } from "../../../../types";

interface ReportTableProps {
  reportType: string;
  data: any[];
}

export default function Reports() {
  const [isHistorical, setIsHistorical] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [cedulaEstudiante, setCedulaEstudiante] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] =
    useState<string>("Por Estudiante");

  const [items, setItems] = useState<any[]>([]);
  

  const fetchStudents = async (cedula: string) => {
    try {
      const response = await fetch(
        `/api/reportes/estudiantes?cedula=${cedula}`
      );
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchItems = async (query: string, type: string) => {
    let endpoint = "";
    if (type === "Por Estudiante")
      endpoint = `/api/reportes/estudiantes?cedula=${query}`;
    if (type === "Por Docente")
      endpoint = `/api/reportes/estudiantes?cedula=${query}`;
    if (type === "Por Curso") endpoint = `/api/cursos?descripcion=${query}`;
    if (type === "Por Sección") endpoint = `/api/secciones?nombre=${query}`;
    if (type === "Por Grado") endpoint = `/api/secciones?grado=${query}`;
    if (type === "General LSP") endpoint = `/api/estudiantes`; // No necesita query

    const response = await fetch(endpoint);
    const data = await response.json();
    setItems(data);
  };

const renderItem = (item: any, onSelect: (value: string) => void) => (
  <li
    key={item.Cedula || item.Id || item.Nombre}
    className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-500 dark:text-gray-400"
    onClick={() => {
      onSelect(item.Primer_nombre ? `${item.Primer_nombre} ${item.Primer_apellido}` : item.Nombre || item.Descripcion);
    }}
  >
    {item.Primer_nombre ? `${item.Primer_nombre} ${item.Primer_apellido}` : item.Nombre || item.Descripcion} - {item.Cedula || item.Id}
  </li>
);

const fetchDataReportStudents = async () => {
  if (!searchValue) {
    console.warn("No se ha seleccionado un estudiante.");
    alert("No se ha seleccionado un estudiante.");
    return;
  } if (!startDate && !endDate){
    alert("Seleccione un rango de fechas válido.");
  }
  console.log("Este es el searchValue")
  console.log(searchValue);
  let cedula = searchValue;

  try {
    const parsedValue = JSON.parse(searchValue);
    if (parsedValue && parsedValue.Cedula) {
      cedula = parsedValue.Cedula;
    }
  } catch (error) {
    console.warn("searchValue no es un JSON válido, usando el valor como está.");
    return;
  }

  try {
    const response = await fetch(`/api/reportes/estudiantes/data?startdate=${startDate}&endDate=${endDate}&cedula=${encodeURIComponent(cedula)}`);
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const data = await response.json();
    setReportData(data);
  } catch (error) {
    console.error("Error fetching data for report:", error);
  }
};


  const validateAndFetchData = () => {
    if (!selectedReport) {
      alert("Seleccione un tipo de reporte.");
      return;
    }

    if (selectedReport !== "General LSP" && !searchValue) {
      alert(`Seleccione ${selectedReport.replace("Por ", "")}`);
      return;
    }

    if (!isHistorical && (!startDate || !endDate)) {
      alert("Seleccione un rango de fechas válido.");
      return;
    }
    fetchDataReportStudents();
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
    switch (selectedReport) {
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
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="">Seleccione un tipo</option>
            {reportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          {selectedReport &&
            selectedReport !== "General LSP" && ( // Si no es "General LSP", se debe seleccionar algo
              <div className="max-w-md grid grid-cols-1 gap-2 items-center">
                <Button onClick={() => setShowModal(true)}>
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
                  Seleccionar {selectedReport.replace("Por ", "")}{" "}
                  {selectedReport}
                </Button>

                {searchValue && (
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <span className="text-gray-700 dark:text-gray-300">
                      {selectedReport.replace("Por ", "")}: {searchValue}
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
              <Datepicker title="Desde" value={startDate} onChange={setStartDate} />
              <span className="text-gray-500 dark:text-gray-400">y</span>
              <Datepicker title="Hasta" value={endDate} onChange={setEndDate}/>
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
          <ReportTable reportType={selectedReport} data={reportData} />
          <ReportChart reportType={selectedReport} data={reportData} />
          <ExportButtons reportType={selectedReport} data={reportData} />
        </>
      )}
      <SelectionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Seleccionar Filtro"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fetchItems={fetchItems}
        items={items}
        renderItem={renderItem}
        searchType={selectedReport}
        onSelect={(selectedValue) => {
          console.log("Seleccionado:", selectedValue);
          setSearchValue(selectedValue);
          setShowModal(false);
        }}
      />
    </div>
  );
}
