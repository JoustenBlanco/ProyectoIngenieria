import * as XLSX from "xlsx";

export function exportToCSV (data: any, reportType: string, studentName: string | null, studentId: string| null) {
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Reporte_${reportType}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };