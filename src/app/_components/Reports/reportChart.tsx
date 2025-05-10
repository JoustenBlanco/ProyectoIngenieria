import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
// Aún no funcionan los graficos
interface ReportChartProps {
  reportType: string;
  data: any[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ReportChart({ reportType, data }: ReportChartProps) {
  if (data.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-500 dark:text-gray-400">Resumen Visual con Graficos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de Barras */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="Curso" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Asistencia" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Gráfico de Pastel */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="Asistencia" nameKey="Curso" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
