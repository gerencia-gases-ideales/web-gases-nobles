import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as LineChartIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Variable = "P" | "V" | "n" | "T";

interface HistoryEntry {
  id: string;
  timestamp: Date;
  P: number;
  V: number;
  n: number;
  T: number;
  variableCalculada: Variable;
}

interface HistoryChartProps {
  history: HistoryEntry[];
}

const variableColors: Record<Variable, string> = {
  P: "#3b82f6",
  V: "#10b981",
  n: "#f59e0b",
  T: "#ef4444",
};

const variableLabels: Record<Variable, string> = {
  P: "Presión (atm)",
  V: "Volumen (L)",
  n: "Moles (mol)",
  T: "Temperatura (K)",
};

export default function HistoryChart({ history }: HistoryChartProps) {
  if (history.length === 0) {
    return null;
  }

  const chartData = [...history].reverse().map((entry) => {
    const date = new Date(entry.timestamp);
    const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    return {
      time,
      P: entry.variableCalculada === "P" ? entry.P : null,
      V: entry.variableCalculada === "V" ? entry.V : null,
      n: entry.variableCalculada === "n" ? entry.n : null,
      T: entry.variableCalculada === "T" ? entry.T : null,
    };
  });

  return (
    <Card className="max-w-5xl mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <LineChartIcon className="w-5 h-5" />
          Evolución de Variables Calculadas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]" data-testid="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                formatter={(value: any) => value !== null ? value.toFixed(4) : "N/A"}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="P"
                stroke={variableColors.P}
                name={variableLabels.P}
                strokeWidth={2}
                dot={{ r: 6 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="V"
                stroke={variableColors.V}
                name={variableLabels.V}
                strokeWidth={2}
                dot={{ r: 6 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="n"
                stroke={variableColors.n}
                name={variableLabels.n}
                strokeWidth={2}
                dot={{ r: 6 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="T"
                stroke={variableColors.T}
                name={variableLabels.T}
                strokeWidth={2}
                dot={{ r: 6 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Solo se muestran los valores que fueron calculados en cada operación
          </p>
          <p className="text-sm text-muted-foreground text-center font-medium">
            Haz clic en las etiquetas de la leyenda para mostrar u ocultar variables específicas
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
