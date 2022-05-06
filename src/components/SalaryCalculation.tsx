import { ChangeEvent, useEffect, useState } from "react";

const inssTaxes: number[] = [0.075, 0.09, 0.12, 0.14];
const salaryRangeINSS: number[] = [1212, 2427.35, 3641.03, 7087.22, 7087.23];
const salaryRefValuesINSS: number[] = [1212, 1215.34, 1213.67, 9641.04, 7087.23];
const inssCeil: number = 828.39;

const irrfTaxes: number[] = [0.075, 0.15, 0.225, 0.275];
const salaryRangeIRRF: number[] = [1903.98, 2826.65, 3751.05, 4664.68, 4664.69];
const salaryRefValuesIRRF: number[] = [1903.98, 922.66, 924.39, 913.62, 4664.69];
const deductionValues: number[] = [142.80, 354.80, 636.13, 869.36];
const deductionPerDependent: number = 189.59;

export default function SalaryCalculation() {
  const [salary, setSalary] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [inss, setINSS] = useState<number>(0);
  const [irrf, setIRRF] = useState<number>(0);
  const [dependentsNumber, setDependentsNumber] = useState<number>(0);
  
  useEffect(() => {
    setINSS(calculateINSS(salary));
    setIRRF(calculateIRRF(salary));
  }, [salary]);

  const formattedNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  
  const calculateINSS = (value: number) => {
    let discount: number = 0;
    
    if (value === salaryRangeINSS[0]) {
      discount += salaryRefValuesINSS[0] * inssTaxes[0];
    }
    if (value > salaryRangeINSS[0]) {
      discount += salaryRefValuesINSS[0] * inssTaxes[0];
      if (value <= salaryRangeINSS[1]) discount += (value - salaryRangeINSS[0] + 0.01) * inssTaxes[1];
    }
    if (value > salaryRangeINSS[1]) {
      discount += salaryRefValuesINSS[1] * inssTaxes[1];
      if (value <= salaryRangeINSS[2]) discount += (value - salaryRangeINSS[1] + 0.01) * inssTaxes[2];
    }
    if (value > salaryRangeINSS[2]) {
      discount += salaryRefValuesINSS[2] * inssTaxes[2];
      if (value <= salaryRangeINSS[3]) discount += (value - salaryRangeINSS[2] + 0.01) * inssTaxes[3];
    }
    if (value > salaryRangeINSS[3]) {
      discount += salaryRefValuesINSS[3] * inssTaxes[3];
      if (value <= salaryRangeINSS[4]) discount += (value - salaryRangeINSS[3] + 0.01) * inssTaxes[3];
    }

    if (discount > 828.39) discount = 828.39;
    
    return discount;
  };

  const calculateIRRF = (value: number) => {
    let discount: number = 0;
    let range = -1;
    const salaryBase = value - inss;
    
    if (salaryBase > salaryRangeIRRF[0]) {
      range = 0;
      discount += salaryRefValuesIRRF[0] * irrfTaxes[0];
      if (salaryBase <= salaryRangeIRRF[1]) discount += (salaryBase - salaryRangeIRRF[0] + 0.01) * irrfTaxes[1];
    }
    if (salaryBase > salaryRangeIRRF[1]) {
      range = 1;
      discount += salaryRefValuesIRRF[1] * irrfTaxes[1];
      if (salaryBase <= salaryRangeIRRF[2]) discount += (salaryBase - salaryRangeIRRF[1] + 0.01) * irrfTaxes[2];
    }
    if (salaryBase > salaryRangeIRRF[2]) {
      range = 2;
      discount += salaryRefValuesIRRF[2] * irrfTaxes[2];
      if (salaryBase <= salaryRangeIRRF[3]) discount += (salaryBase - salaryRangeIRRF[2] + 0.01) * irrfTaxes[3];
    }
    if (salaryBase > salaryRangeIRRF[3]) {
      range = 3;
      discount += salaryRefValuesIRRF[3] * irrfTaxes[3];
      if (salaryBase <= salaryRangeIRRF[4]) discount += (salaryBase - salaryRangeIRRF[3] + 0.01) * irrfTaxes[3];
    }

    console.log(discount); 

    if (dependentsNumber > 0) discount -= (deductionPerDependent * dependentsNumber);
    if (discount < 0) discount = 0;
    
    return discount;
  };

  const getFormattedSalary = () => {
    let formattedSalary: string = '';
    if (inputValue.length >= 3) {
      formattedSalary = inputValue.slice(0, -2) + '.' + inputValue.slice(-2);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regEx = /^[0-9\,\.]{1,}$/g;

    if (!e.target.value.match(regEx) || e.target.value === '') {
      if (e.target.value === '') setInputValue('0');
      return;
    }

    if (e.target.value[0] === '0') e.target.value = e.target.value.slice(1,);
    const value = e.target.value.replace(',', '.');
    setInputValue(value);
    setSalary(parseFloat(value));
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-14
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
