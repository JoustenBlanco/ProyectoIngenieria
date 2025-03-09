import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import { exportToExcel } from "@/app/reports/generateExcel"
import { ExportButtonsProps } from "../../../../types"
import {exportToPDF} from "@/app/reports/generatePDF"
import {exportToCSV} from "@/app/reports/generateCSV"


// Aún solo exportan la tabla
export default function ExportButtons({ reportType, data }: ExportButtonsProps) {
  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Reporte");
  //   XLSX.writeFile(wb, `Reporte_${reportType}.xlsx`);
  // };

  // const exportToCSV = () => {
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const csv = XLSX.utils.sheet_to_csv(ws);
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `Reporte_${reportType}.csv`;
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // const exportToPDF = () => {
  //   if (data.length === 0) {
  //     alert("No hay datos para exportar.");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   const columns = Object.keys(data[0]);
  //   const rows = data.map((row) => columns.map((col) => String(row[col])));

  //   autoTable(doc, {
  //     head: [columns],
  //     body: rows,
  //   });

  //   doc.save(`Reporte_${reportType}.pdf`);
  // };

  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={()=>(exportToExcel(data, reportType))}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        📊 Exportar a Excel
      </button>
      <button
        onClick={() => (exportToCSV(data, reportType))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        📄 Exportar a CSV
      </button>
      <button
        onClick={()=>(exportToPDF(data,reportType))}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        📜 Exportar a PDF
      </button>
    </div>
  );
}
