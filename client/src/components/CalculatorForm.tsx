import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Loader2 } from "lucide-react";

type Variable = "P" | "V" | "n" | "T";

interface CalculatorFormProps {
  onCalculate: (data: { P: number | null; V: number | null; n: number | null; T: number | null; variableToCalculate: Variable }) => void;
  isLoading?: boolean;
}

const variableInfo: Record<Variable, { label: string; unit: string; placeholder: string }> = {
  P: { label: "Presión (P)", unit: "atm", placeholder: "ej: 1.0" },
  V: { label: "Volumen (V)", unit: "L", placeholder: "ej: 22.4" },
  n: { label: "Moles (n)", unit: "mol", placeholder: "ej: 1.0" },
  T: { label: "Temperatura (T)", unit: "K", placeholder: "ej: 273.15" },
};

export default function CalculatorForm({ onCalculate, isLoading = false }: CalculatorFormProps) {
  const [variableToCalculate, setVariableToCalculate] = useState<Variable>("P");
  const [values, setValues] = useState<Record<Variable, string>>({
    P: "",
    V: "",
    n: "",
    T: "",
  });

  const handleValueChange = (variable: Variable, value: string) => {
    setValues((prev) => ({ ...prev, [variable]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      P: variableToCalculate === "P" ? null : parseFloat(values.P),
      V: variableToCalculate === "V" ? null : parseFloat(values.V),
      n: variableToCalculate === "n" ? null : parseFloat(values.n),
      T: variableToCalculate === "T" ? null : parseFloat(values.T),
      variableToCalculate,
    };
    
    onCalculate(data);
  };

  const isFormValid = () => {
    const variables: Variable[] = ["P", "V", "n", "T"];
    return variables.every((v) => {
      if (v === variableToCalculate) return true;
      const value = values[v].trim();
      return value !== "" && !isNaN(parseFloat(value)) && parseFloat(value) > 0;
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Ingresa los valores conocidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Variable a calcular
            </Label>
            <RadioGroup
              value={variableToCalculate}
              onValueChange={(v) => setVariableToCalculate(v as Variable)}
              className="flex flex-wrap gap-4"
            >
              {(Object.keys(variableInfo) as Variable[]).map((v) => (
                <div key={v} className="flex items-center space-x-2">
                  <RadioGroupItem value={v} id={`radio-${v}`} data-testid={`radio-${v}`} />
                  <Label htmlFor={`radio-${v}`} className="cursor-pointer font-medium">
                    {v} ({variableInfo[v].unit})
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(Object.keys(variableInfo) as Variable[]).map((v) => (
              <div key={v} className="space-y-2">
                <Label htmlFor={`input-${v}`} className="text-sm font-medium">
                  {variableInfo[v].label} - {variableInfo[v].unit}
                </Label>
                <Input
                  id={`input-${v}`}
                  data-testid={`input-${v}`}
                  type="number"
                  step="any"
                  placeholder={variableToCalculate === v ? "Se calculará" : variableInfo[v].placeholder}
                  value={values[v]}
                  onChange={(e) => handleValueChange(v, e.target.value)}
                  disabled={variableToCalculate === v}
                  required={variableToCalculate !== v}
                  min="0.0001"
                  className={`h-12 font-mono ${variableToCalculate === v ? "bg-muted cursor-not-allowed" : ""}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              size="lg" 
              className="px-8"
              disabled={isLoading || !isFormValid()}
              data-testid="button-calculate"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculando...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
