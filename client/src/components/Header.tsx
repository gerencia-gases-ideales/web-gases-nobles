import { Calculator } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center py-8 px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Calculator className="w-10 h-10 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Calculadora de Gases Ideales
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Calcula cualquier variable de la ecuación <span className="font-mono font-semibold text-foreground">PV = nRT</span> ingresando 
        las otras tres. Selecciona la variable que deseas calcular y completa los valores conocidos.
      </p>
    </header>
  );
}
