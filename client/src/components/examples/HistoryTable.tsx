import HistoryTable, { type HistoryEntry } from "../HistoryTable";

const mockHistory: HistoryEntry[] = [
  { id: "1", timestamp: new Date(), P: 1.0, V: 22.414, n: 1.0, T: 273.15, variableCalculada: "V" },
  { id: "2", timestamp: new Date(Date.now() - 60000), P: 2.0, V: 11.207, n: 1.0, T: 273.15, variableCalculada: "P" },
];

export default function HistoryTableExample() {
  return <HistoryTable history={mockHistory} onClearHistory={() => console.log("Clear history")} />;
}
