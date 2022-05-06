import { useState } from "react";
import SalaryCalculation from "./components/SalaryCalculation";
import SalaryTAES from "./components/SalaryTAES";

function App() {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  return (
    <div className="h-screen w-screen flex flex-col items-center px-6 py-4 bg-gray-700">
      <h1 className="text-3xl text-gray-100">Cálculo de Salário</h1>
      <div className="flex items-center justify-center my-4">
        <button
          onClick={() => setSelectedTab(1)}
          className={`${
            selectedTab === 1
              ? "bg-gray-800 text-gray-50 hover:bg-gray-900"
              : "hover:bg-gray-600"
          } min-w-[150px] px-4 py-1 rounded-tl rounded-bl border border-r-0 transition-all
            text-gray-50`}
        >
          Salário
        </button>
        <button
          onClick={() => setSelectedTab(2)}
          className={`${
            selectedTab === 2
              ? "bg-gray-800 text-gray-50 hover:bg-gray-900"
              : "hover:bg-gray-600"
          } min-w-[150px] px-4 py-1 rounded-tr rounded-br border transition-all
            text-gray-50`}
        >
          Salário TAES
        </button>
      </div>
      <div className="w-full sm:w-8/12 lg:w-1/2">{selectedTab === 1 && <SalaryCalculation />}</div>
      <div>{selectedTab === 2 && <SalaryTAES />}</div>
    </div>
  );
}

export default App;
