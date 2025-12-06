import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

declare global {
  interface Window {
    Chart: any;
  }
}

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

const variableColors: Record<Variable, { bg: string; border: string }> = {
  P: { bg: "rgba(59, 130, 246, 0.2)", border: "rgb(59, 130, 246)" },
  V: { bg: "rgba(16, 185, 129, 0.2)", border: "rgb(16, 185, 129)" },
  n: { bg: "rgba(245, 158, 11, 0.2)", border: "rgb(245, 158, 11)" },
  T: { bg: "rgba(239, 68, 68, 0.2)", border: "rgb(239, 68, 68)" },
};

const variableLabels: Record<Variable, string> = {
  P: "Presión (atm)",
  V: "Volumen (L)",
  n: "Moles (mol)",
  T: "Temperatura (K)",
};

export default function HistoryChart({ history }: HistoryChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const labels = history.map((_, i) => `#${i + 1}`);
    const dataByVariable: Record<Variable, (number | null)[]> = {
      P: [],
      V: [],
      n: [],
      T: [],
    };

    history.forEach((entry) => {
      (["P", "V", "n", "T"] as Variable[]).forEach((v) => {
        dataByVariable[v].push(entry.variableCalculada === v ? entry[v] : null);
      });
    });

    const datasets = (["P", "V", "n", "T"] as Variable[]).map((v) => ({
      label: variableLabels[v],
      data: dataByVariable[v],
      borderColor: variableColors[v].border,
      backgroundColor: variableColors[v].bg,
      fill: false,
      tension: 0.3,
      spanGaps: false,
      pointRadius: 6,
      pointHoverRadius: 8,
    }));

    chartInstanceRef.current = new window.Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top" as const,
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                if (context.parsed.y !== null) {
                  return `${context.dataset.label}: ${context.parsed.y.toFixed(4)}`;
                }
                return "";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(128, 128, 128, 0.2)",
            },
          },
          x: {
            grid: {
              color: "rgba(128, 128, 128, 0.2)",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [history]);

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="max-w-4xl mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <LineChart className="w-5 h-5" />
          Gráfica de Valores Calculados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video md:aspect-[16/9]" data-testid="chart-container">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
