import { useRouter } from "next/router";
import React, { useState } from "react";

const Calculator: React.FC = () => {
  const router = useRouter();

  const [display, setDisplay] = useState<string>("0");
  const [prevValue, setPrevValue] = useState<string>("");
  const [operator, setOperator] = useState<string>("");

  const handleNumberClick = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (operator !== "") {
      calculate();
    }
    setPrevValue(display);
    setDisplay("0");
    setOperator(op);
  };

  const calculate = () => {
    const num1 = parseFloat(prevValue);
    const num2 = parseFloat(display);
    let result = 0;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        break;
    }
    setDisplay(result.toString());
    setPrevValue("");
    setOperator("");
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue("");
    setOperator("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-pink-600">
      <div className="w-96 h-fit bg-white rounded-lg p-4 shadow-lg">
        <div className="text-4xl font-bold mb-4">{display}</div>
        <div className="grid grid-cols-4 gap-2 ">
          <button
            className="h-20 bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("1")}
          >
            1
          </button>
          <button
            className="bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("2")}
          >
            2
          </button>
          <button
            className="bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("3")}
          >
            3
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-500 rounded-lg p-2 text-white"
            onClick={() => handleOperatorClick("+")}
          >
            +
          </button>
          <button
            className="h-20 bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className="bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className="bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-500 rounded-lg p-2 text-white"
            onClick={() => handleOperatorClick("-")}
          >
            -
          </button>
          <button
            className="h-20 bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className="bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className="bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-500 rounded-lg p-2 text-white"
            onClick={() => handleOperatorClick("x")}
          >
            x
          </button>
          <button
            className="h-20 bg-pink-400 hover:bg-pink-500 rounded-lg p-2 text-white"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 rounded-lg p-2 text-white"
            onClick={handleClear}
          >
            C
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-500 rounded-lg p-2 text-white"
            onClick={calculate}
          >
            =
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-500 rounded-lg p-2 text-white"
            onClick={() => handleOperatorClick("/")}
          >
            /
          </button>
        </div>
      </div>
      <button
        className="mt-4 ml-4 bg-blue-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
    </div>
  );
};

export default Calculator;
