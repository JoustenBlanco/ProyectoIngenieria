import { utils, writeFile } from 'xlsx';

export function exportToExcel(
  data: any[],
  reportType: string,
  studentName: string | null,
  studentId: string | null
) {
  if (data.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }


  const wb = utils.book_new();

  const displayName = studentName ?? "Nombre no disponible";
  const displayId = studentId ?? "ID no disponible";
  const now = new Date();
  const formattedDate = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });


  const exportData = [
    [`Reporte de ${reportType}`],
    [`Estudiante: ${displayName}`],
    [`Cédula: ${displayId}`],
    [`Generado el: ${formattedDate}`],
    [],
    Object.keys(data[0]).map(key =>
      key.charAt(0).toUpperCase() + key.slice(1)
    ),
    ...data.map(row =>
      Object.values(row).map(value =>
        value instanceof Date ? value.toLocaleString() : String(value)
      )
    )
  ];


  const ws = utils.aoa_to_sheet(exportData);


  const colWidths = Object.keys(data[0]).map(() => ({ wch: 20 }));
  ws['!cols'] = colWidths;


  utils.book_append_sheet(wb, ws, "Reporte");


  const fileName = `Reporte_${reportType}_${displayName.replace(/[^a-z0-9]/gi, '_')}.xlsx`;

  writeFile(wb, fileName);
}