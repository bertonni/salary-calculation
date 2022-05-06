import { ChangeEvent, useState } from "react";


export default function SalaryCalculation() {
  const [salary, setSalary] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [inss, setINSS] = useState<number>(0);
  const [irrf, setIRRF] = useState<number>(0);
  
  const acceptedChars: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'];

  const formattedNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateINSS = (value: number) => {
    let discount = 0;

    return discount;
  };

  const calculateIRRF = (value: number) => {
    let discount = 0;

    return discount;
  };

  const getFormattedSalary = () => {
    let formattedSalary: string = '';
    if (inputValue.length >= 3) {
      formattedSalary = inputValue.slice(0, -2) + '.' + inputValue.slice(-2);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regEx = /[0-9]/g;

    if (!e.target.value.match(regEx)) {
      console.log('not a number')
      return;
    }
    console.log(e.target.value);
    const value = e.target.value;
    setInputValue(value);
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <label
          htmlFor="salary"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Informe o Salário
        </label>
        <input
          type="text"
          id="salary"
          value={inputValue}
          maxLength={10}
          onChange={(e) => handleChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <h1 className="text-xl text-gray-100 mb-4">Descontos</h1>
        <div className="flex items-center justify-between border-b border-dashed
          border-gray-500 pt-1">
          <span className="font-medium text-gray-200 text-lg">INSS:</span>
          <span className="text-gray-300">{formattedNumber(inss)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-dashed
          border-gray-500 pt-1">
          <span className="font-medium text-gray-200 text-lg">IRRF:</span>
          <span className="text-gray-300">{formattedNumber(irrf)}</span>
        </div>
      </div>
    </div>
  );
}
