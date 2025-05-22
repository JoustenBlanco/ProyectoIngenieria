"use client";

import { Datepicker, Select, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
import SelectionModal from "@/app/_components/Reports/selectionModal";
import ReportTable from "@/app/_components/Reports/reportTable";
import ExportButtons from "@/app/_components/Reports/exportButtons";
import Alert from "@/app/_components/feedBack/alert";

import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Reports() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
    if (status == "unauthenticated") {
      console.log("No autenticado");
      redirect("/homepages/auth/login");
    }
  }, [session, status]);
  const [isHistorical, setIsHistorical] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [cedulaEstudiante, setCedulaEstudiante] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info" | "warning"; show: boolean }>({
    message: "",
    type: "info",
    show: false,
  });

  const showAlert = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    setAlert({ message, type, show: true });
  };

  const fetchItems = async (query: string, type: string) => {
    let endpoint = "";
    if (type === "Por Estudiante")
      endpoint = `/api/reportes/estudiantes?cedula=${query}`;
    if (type === "Por Sección") endpoint = `/api/secciones?nombre=${query}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    setItems(data);
  };

  const renderItem = (item: any, onSelect: (value: string) => void) => (
    <li
      key={item.Cedula || item.Id || item.Nombre}
      className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-500 dark:text-gray-400"
      onClick={() => {
        onSelect(
          item.Primer_nombre
            ? `${item.Primer_nombre} ${item.Primer_apellido} ${item.Segundo_apellido}`
            : item.Nombre || item.Descripcion
        );
        setCedulaEstudiante(item.Cedula);
      }}
    >
      {item.Primer_nombre
        ? `${item.Primer_nombre} ${item.Primer_apellido}`
        : item.Nombre || item.Descripcion}{" "}
      - {item.Cedula || item.Id}
    </li>
  );

  const fetchDataReportStudents = async () => {
    if (!searchValue) {
      console.warn("No se ha seleccionado un estudiante.");
      showAlert("No se ha seleccionado un estudiante.", "warning");
      return;
    }

    if (!isHistorical && (!startDate || !endDate)) {
      showAlert("Seleccione un rango de fechas válido.", "warning");
      return;
    }

    try {
      const url = isHistorical
        ? `/api/reportes/estudiantes/data?cedula=${cedulaEstudiante}&historical=true`
        : `/api/reportes/estudiantes/data?startDate=${startDate}&endDate=${endDate}&cedula=${cedulaEstudiante}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      setReportData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data for report:", error);
    }
  };

  const validateAndFetchData = () => {
    if (!selectedReport) {
      showAlert("Seleccione un tipo de reporte.", "warning");
      return;
    }

    if (!searchValue) {
      showAlert(`Seleccione ${selectedReport.replace("Por ", "")}`, "warning");
      return;
    }

    if (!isHistorical && (!startDate || !endDate)) {
      showAlert("Seleccione un rango de fechas válido.", "warning");
      return;
    }
    fetchDataReportStudents();
    setShowTable(true);
  };

  const reportOptions = ["Por Estudiante"];

  return (
    <div className="p-6">
      <Alert
        type={alert.type}
        message={alert.message}
        show={alert.show}
        onClose={() => setAlert((a) => ({ ...a, show: false }))}
      />
      <h1 className="text-3xl font-bold mb-8 text-gray-500 dark:text-gray-400">
        Reportes de Asistenia
      </h1>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Selección de tipo de reporte y búsqueda */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
          <div>
            <span className="block text-gray-500 dark:text-gray-400 mb-2 font-medium">
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
          </div>
          {selectedReport && (
            <div className="space-y-2">
              <Button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2"
              >
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
                Seleccionar {selectedReport.replace("Por ", "")}
              </Button>
              {searchValue && (
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedReport.replace("Por ", "")}: {searchValue}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filtros de histórico y fechas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
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
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-500 dark:text-gray-400">Entre</span>
              <Datepicker
                title="Desde"
                value={startDate}
                onChange={setStartDate}
              />
              <span className="text-gray-500 dark:text-gray-400">y</span>
              <Datepicker
                title="Hasta"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          )}
        </div>

        {/* Botón de vista previa */}
        {(() => {
          const isReportSelected = !!selectedReport;
          const isSearchSelected = !!searchValue;
          const isDateRequired = !isHistorical;
          const isDateSelected = !isHistorical
            ? startDate && endDate
            : true;
          const canShowPreviewButton =
            isReportSelected && isSearchSelected && isDateSelected;
          return (
            canShowPreviewButton && (
              <div className="flex justify-end">
                <Button onClick={validateAndFetchData} className="mt-2">
                  Ver Vista Previa
                </Button>
              </div>
            )
          );
        })()}

        {/* Tabla y exportación */}
        {showTable && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
            <ReportTable reportType={selectedReport} data={reportData} />
            {/*<ReportChart reportType={selectedReport} data={reportData} />*/}
            <ExportButtons
              reportType={selectedReport}
              data={reportData}
              studentId={cedulaEstudiante}
              studentName={searchValue}
            />
          </div>
        )}
      </div>
      {/* Modal de selección */}
      <SelectionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="estudiante"
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
