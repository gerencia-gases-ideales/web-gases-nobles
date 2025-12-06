import CalculatorForm from "../CalculatorForm";

export default function CalculatorFormExample() {
  const handleCalculate = (data: any) => {
    console.log("Calculate triggered:", data);
  };

  return <CalculatorForm onCalculate={handleCalculate} isLoading={false} />;
}
