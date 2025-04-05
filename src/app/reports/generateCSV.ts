export function exportToCSV(
  data: any[],
  reportType: string,
  studentName: string | null,
  studentId: string | null
) {
  if (data.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

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

  let csvContent = "";

  csvContent += `# Reporte de ${reportType}\n`;
  csvContent += `# Estudiante: ${displayName}\n`;
  csvContent += `# Cédula: ${displayId}\n`;
  csvContent += `# Generado el: ${formattedDate}\n\n`;

  const headers = Object.keys(data[0])
    .map(key => `"${key.charAt(0).toUpperCase() + key.slice(1)}"`)
    .join(",");
  csvContent += headers + "\n";

  data.forEach(item => {
    const row = Object.values(item)
      .map(value => {
        const strValue = value instanceof Date 
          ? value.toLocaleString() 
          : String(value).replace(/"/g, '""');
        return `"${strValue}"`;
      })
      .join(",");
    csvContent += row + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Reporte_${reportType}_${displayName.replace(/[^a-z0-9]/gi, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};