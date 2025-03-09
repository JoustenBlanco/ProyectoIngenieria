import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

export function exportToPDF (data: any, reportType: string) {
    if (data.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const doc = new jsPDF();
    const columns = Object.keys(data[0]);
    const rows = data.map((row:any) => columns.map((col) => String(row[col])));

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save(`Reporte_${reportType}.pdf`);
  };