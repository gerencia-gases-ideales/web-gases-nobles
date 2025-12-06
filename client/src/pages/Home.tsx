import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CalculatorForm from "@/components/CalculatorForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import ErrorAlert from "@/components/ErrorAlert";
import HistoryTable, { type HistoryEntry } from "@/components/HistoryTable";
import HistoryChart from "@/components/HistoryChart";
import ThemeToggle from "@/components/ThemeToggle";

type Variable = "P" | "V" | "n" | "T";

interface CalculationResult {
  P: number;
  V: number;
  n: number;
  T: number;
}

const HISTORY_STORAGE_KEY = "gas-calculator-history";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [calculatedVariable, setCalculatedVariable] = useState<Variable | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const historyWithDates = parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
        setHistory(historyWithDates);
      } catch (e) {
        console.error("Error loading history from localStorage:", e);
      }
    }
  }, []);

  const saveHistoryToStorage = (newHistory: HistoryEntry[]) => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
  };

  const handleCalculate = async (data: {
    P: number | null;
    V: number | null;
    n: number | null;
    T: number | null;
    variableToCalculate: Variable;
  }) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("https://api-gases-nobles.onrender.com/api/calcular-gas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          P: data.P,
          V: data.V,
          n: data.n,
          T: data.T,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      const calculationResult: CalculationResult = {
        P: result.P,
        V: result.V,
        n: result.n,
        T: result.T,
      };

      setResults(calculationResult);
      setCalculatedVariable(data.variableToCalculate);

      const newEntry: HistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        P: calculationResult.P,
        V: calculationResult.V,
        n: calculationResult.n,
        T: calculationResult.T,
        variableCalculada: data.variableToCalculate,
      };

      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      saveHistoryToStorage(newHistory);
    } catch (err) {
      setError("Error de conexión con el servidor. Por favor, intenta de nuevo.");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <Header />
        
        <CalculatorForm onCalculate={handleCalculate} isLoading={isLoading} />
        
        {error && <ErrorAlert message={error} />}
        
        {results && calculatedVariable && (
          <ResultsDisplay results={results} calculatedVariable={calculatedVariable} />
        )}
        
        <HistoryTable history={history} onClearHistory={handleClearHistory} />
        
        <HistoryChart history={history} />
      </div>
    </div>
  );
}
