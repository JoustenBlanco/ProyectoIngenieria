import * as XLSX from 'xlsx';
import { ExcelData, ExcelKeyValuePair } from '../../../types';

export const parseStudentsExcelFormat = (fileBuffer: Buffer): ExcelData[] => {
  try {
    const data = new Uint8Array(fileBuffer);
    const workbook = XLSX.read(data, { type: 'array' });

    const secondSheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[secondSheetName];

    if (!worksheet || secondSheetName !== "Estudiantes") {
      return [];
    }
    const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  } catch (error) {
    console.error('Error al procesar el archivo Excel:', error);
    throw error;
  }
};


export const parseSectionExcelFormat = (fileBuffer: Buffer): ExcelKeyValuePair[] => {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const result: ExcelKeyValuePair[] = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i] as string[];
    if (row.length >= 2) {
      result.push({
        key: row[0].toString().trim(),
        value: isNaN(Number(row[1])) ? row[1].toString().trim() : Number(row[1])
      });
    }
  }

  return result;
};

