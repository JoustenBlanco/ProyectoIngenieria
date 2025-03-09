import * as XLSX from "xlsx";

export function exportToExcel (data : any, reportType: string){
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, `Reporte_${reportType}.xlsx`);
  };