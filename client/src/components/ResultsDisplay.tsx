import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

type Variable = "P" | "V" | "n" | "T";

interface ResultsDisplayProps {
  results: {
    P: number;
    V: number;
    n: number;
    T: number;
  };
  calculatedVariable: Variable;
}

const variableInfo: Record<Variable, { label: string; unit: string; color: string }> = {
  P: { label: "Presión", unit: "atm", color: "text-chart-1" },
  V: { label: "Volumen", unit: "L", color: "text-chart-2" },
  n: { label: "Moles", unit: "mol", color: "text-chart-3" },
  T: { label: "Temperatura", unit: "K", color: "text-chart-4" },
};

export default function ResultsDisplay({ results, calculatedVariable }: ResultsDisplayProps) {
  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5" />
          Resultado del Cálculo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(variableInfo) as Variable[]).map((v) => {
            const isCalculated = v === calculatedVariable;
            return (
              <div
                key={v}
                className={`p-4 rounded-lg text-center ${
                  isCalculated 
                    ? "bg-primary/10 border-2 border-primary" 
                    : "bg-muted"
                }`}
                data-testid={`result-${v}`}
              >
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {variableInfo[v].label}
                </p>
                <p className={`text-2xl font-mono font-bold mt-2 ${isCalculated ? variableInfo[v].color : ""}`}>
                  {results[v].toFixed(4)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {variableInfo[v].unit}
                </p>
                {isCalculated && (
                  <span className="inline-block mt-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    Calculado
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
