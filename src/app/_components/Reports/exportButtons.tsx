import { exportToExcel } from "@/app/reports/generateExcel"
import {exportToPDF} from "@/app/reports/generatePDF"
import {exportToCSV} from "@/app/reports/generateCSV"
import useAuthStore from "../../../../provider/store";


export default function ExportButtons({ reportType, data, studentName, studentId }: ButtonsProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mt-8 flex gap-4 justify-between items-center">
      <button
        onClick={()=>(exportToExcel(data, reportType, studentName, studentId, user ))}
        className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
      >
        <img src="/images/xls.svg" alt="Excel" className="w-5 h-5" />
        Excel
      </button>
      <button
        onClick={() => (exportToCSV(data, reportType, studentName, studentId, user ))}
        className="px-4 py-2 bg-lime-500 bg-opacity-80 text-white rounded flex items-center gap-2"
      >
        <img src="/images/csv.svg" alt="CSV" className="w-5 h-5" />
        CSV
      </button>
      <button
        onClick={()=>(exportToPDF(data,reportType, studentName, studentId, user ))}
        className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
      >
        <img src="/images/pdf.svg" alt="PDF" className="w-5 h-5" />
        PDF
      </button>
    </div>
  );
}
