import HistoryChart from "../HistoryChart";

const mockHistory = [
  { id: "1", timestamp: new Date(Date.now() - 180000), P: 1.0, V: 22.414, n: 1.0, T: 273.15, variableCalculada: "V" as const },
  { id: "2", timestamp: new Date(Date.now() - 120000), P: 2.0, V: 11.207, n: 1.0, T: 273.15, variableCalculada: "P" as const },
  { id: "3", timestamp: new Date(Date.now() - 60000), P: 1.5, V: 14.943, n: 1.0, T: 273.15, variableCalculada: "T" as const },
];

export default function HistoryChartExample() {
  return <HistoryChart history={mockHistory} />;
}
