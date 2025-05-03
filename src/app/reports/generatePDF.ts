import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export async function exportToPDF(
data: any[], reportType: string, studentName: string | null, studentId: string | null, user: User | null) {
  if (data.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }
  console.log("Datos a exportar");
  console.log(data);
  const doc = new jsPDF();

  const primaryColor = "#3498db";
  const secondaryColor = "#2c3e50";
  const fontSizeLarge = 16;
  const fontSizeMedium = 12;
  const fontSizeSmall = 10;


  doc.setFontSize(fontSizeLarge);
  doc.setTextColor(secondaryColor);
  doc.setFont("helvetica", "bold");
  doc.text(`Reporte ${reportType}`, 105, 20, { align: "center" });

  doc.setFontSize(fontSizeMedium);
  doc.setTextColor(primaryColor);
  doc.text(`Estudiante: ${studentName}`, 14, 35);
  doc.text(`Cedula: ${studentId}`, 14, 45);

  const funcionarioText = user
  ? `Generado por: ${user.FirstName} ${user.LastName} (${user.Cedula})`
  : "Generado por: Sistema";

  doc.text(funcionarioText, 14, 55);


  const now = new Date();
  const formattedDate = now.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  doc.setFontSize(fontSizeSmall);
  doc.setTextColor(100);
  doc.text(`Generado el: ${formattedDate}`, 14, 65);

  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.5);
  doc.line(14, 70, 196, 70);

  const columns = Object.keys(data[0]).map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    dataKey: key,
  }));

  const tableData = data.map((item) => {
    const row: Record<string, string> = {};
    Object.keys(item).forEach((key) => {
      row[key] = String(item[key]);
    });
    return row;
  });
  autoTable(doc, {
    startY: 75,
    head: [columns.map((col) => col.title)],
    body: tableData.map((row) => columns.map((col) => row[col.dataKey])),
    headStyles: {
      fillColor: secondaryColor,
      textColor: 255,
      fontStyle: "bold",
      fontSize: fontSizeSmall,
    },
    bodyStyles: {
      fontSize: fontSizeSmall - 1,
      textColor: 50,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { horizontal: 14 },
    styles: {
      cellPadding: 2,
      overflow: "linebreak",
      valign: "middle",
    },
    columnStyles: {
      default: {
        cellWidth: "auto",
        minCellHeight: 10,
      },
    },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(fontSizeSmall);
    doc.setTextColor(100);
    doc.text(
      `Página ${i} de ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  const fileName = `Reporte_${reportType}_${
    studentName?.replace(/\s+/g, "_") ?? "estudiante"
  }.pdf`;

  doc.save(fileName);
}
