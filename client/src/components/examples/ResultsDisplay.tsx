import ResultsDisplay from "../ResultsDisplay";

export default function ResultsDisplayExample() {
  return (
    <ResultsDisplay
      results={{ P: 1.0, V: 22.414, n: 1.0, T: 273.15 }}
      calculatedVariable="V"
    />
  );
}
