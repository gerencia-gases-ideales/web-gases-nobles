import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Variable = "P" | "V" | "n" | "T";

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  P: number;
  V: number;
  n: number;
  T: number;
  variableCalculada: Variable;
}

interface HistoryTableProps {
  history: HistoryEntry[];
  onClearHistory?: () => void;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function HistoryTable({ history, onClearHistory }: HistoryTableProps) {
  if (history.length === 0) {
    return (
      <Card className="max-w-5xl mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Historial de Cálculos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8" data-testid="text-empty-history">
            No hay cálculos en el historial. Realiza tu primer cálculo para verlo aquí.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-5xl mx-auto mt-12">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Historial de Cálculos ({history.length})
        </CardTitle>
        {onClearHistory && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearHistory}
            data-testid="button-clear-history"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpiar
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead className="text-right">P (atm)</TableHead>
                <TableHead className="text-right">V (L)</TableHead>
                <TableHead className="text-right">n (mol)</TableHead>
                <TableHead className="text-right">T (K)</TableHead>
                <TableHead className="text-center">Calculada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={entry.id} data-testid={`row-history-${index}`}>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      {formatDate(entry.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-mono ${entry.variableCalculada === "P" ? "font-bold text-primary" : ""}`}>
                    {entry.P.toFixed(4)}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${entry.variableCalculada === "V" ? "font-bold text-primary" : ""}`}>
                    {entry.V.toFixed(4)}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${entry.variableCalculada === "n" ? "font-bold text-primary" : ""}`}>
                    {entry.n.toFixed(4)}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${entry.variableCalculada === "T" ? "font-bold text-primary" : ""}`}>
                    {entry.T.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-mono">
                      {entry.variableCalculada}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
