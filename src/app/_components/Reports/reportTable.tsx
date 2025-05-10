import { useState } from "react";
import { Table, Button } from "flowbite-react";

interface ReportTableProps {
  reportType: string;
  data: any[];
}

export default function ReportTable({ reportType, data }: ReportTableProps) {
  if (!reportType) return null;

  const reportColumns: Record<string, string[]> = {
    "Por Estudiante": ["fecha", "clase", "asistio"],
    "Por Curso": ["Fecha", "Estudiante", "Asistencia"],
    "Por Sección": ["Fecha", "Curso", "Estudiante", "Asistencia"],
    "Por Docente": ["Fecha", "Sección", "Curso", "Asistencia"],
    "Por Grado": ["Fecha", "Curso", "Asistencia"],
    "General LSP": ["Fecha", "Sección", "Curso", "Estudiante", "Asistencia"],
  };


  const columns = reportColumns[reportType] || [];
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-500 dark:text-gray-400">Vista Previa del Reporte</h2>

      <Table>
        <Table.Head>
          {columns.map((col) => (
            <Table.HeadCell key={col}>{col}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <Table.Row key={idx}>
                {columns.map((col) => (
                  <Table.Cell key={col}>{row[col]}</Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="text-center">
                No hay datos para mostrar.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
