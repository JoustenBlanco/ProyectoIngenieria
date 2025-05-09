import { exportToExcel } from "@/app/reports/generateExcel"
import {exportToPDF} from "@/app/reports/generatePDF"
import {exportToCSV} from "@/app/reports/generateCSV"
import useAuthStore from "../../../../provider/store";


export default function ExportButtons({ reportType, data, studentName, studentId }: ButtonsProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={()=>(exportToExcel(data, reportType, studentName, studentId, user ))}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        📊 Exportar a Excel
      </button>
      <button
        onClick={() => (exportToCSV(data, reportType, studentName, studentId, user ))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        📄 Exportar a CSV
      </button>
      <button
        onClick={()=>(exportToPDF(data,reportType, studentName, studentId, user ))}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        📜 Exportar a PDF
      </button>
    </div>
  );
}
