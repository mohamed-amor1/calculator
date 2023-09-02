import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  IconBackspace,
  IconDivide,
  IconPercentage,
  IconPlusMinus,
  IconMinus,
  IconEqual,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

import "./Calculator.css";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [inputValue, setInputValue] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>("0");

  const handleNumberClick = (number: string) => {
    // Check if the input value is "Can't divide by zero" or if it already contains a decimal point
    if (inputValue === "Can't divide by zero") {
      setInputValue(number);
    } else if (inputValue === "0") {
      setInputValue(number);
      setCurrentOperation(number);
    } else if (inputValue.includes(".") && number === ".") {
      // Prevent adding multiple decimal points in one number
      return;
    } else {
      setInputValue(inputValue + number);
      setCurrentOperation(currentOperation + number);
    }
  };

  const handlePercentClick = () => {
    if (inputValue !== "Can't divide by zero") {
      const percentValue = (parseFloat(inputValue) / 100).toString();
      setHistory((prevHistory) => [
        ...prevHistory,
        currentOperation + "% = " + percentValue,
      ]);
      setInputValue(percentValue);
      setCurrentOperation(percentValue);
    }
  };

  const handlePlusMinusClick = () => {
    if (inputValue !== "Can't divide by zero" && inputValue !== "0") {
      const invertedValue = (parseFloat(inputValue) * -1).toString();
      setHistory((prevHistory) => [
        ...prevHistory,
        currentOperation + " ± = " + invertedValue,
      ]);
      setInputValue(invertedValue);
      setCurrentOperation(invertedValue);
    }
  };

  const handleOperatorClick = (newOperator: string) => {
    // Clear the history by setting it to an empty array
    setHistory([]);

    if (inputValue !== "Can't divide by zero") {
      // Check if the current input value is "0" without a decimal point
      if (inputValue === "0" && !inputValue.includes(".")) {
        setInputValue("0" + newOperator); // Add the operator without leading zeros
        setCurrentOperation("0" + newOperator);
      } else {
        setInputValue(inputValue + newOperator);
        setCurrentOperation(currentOperation + newOperator);
      }
    }
  };

  const handleEqualsClick = () => {
    try {
      const expression = inputValue.replace(/(^|[^.])\b0+(\d)/g, "$1$2"); // Remove leading zeros
      let result = eval(expression); // Use eval to calculate the result

      // Format the result to remove unnecessary decimal places and trailing zeros
      result = parseFloat(result)
        .toFixed(6)
        .replace(/\.?0+$/, "");

      if (isNaN(result) || !isFinite(result)) {
        setInputValue("Can't divide by zero");
      } else {
        const newOperation = currentOperation + " = ";
        // Check if the new operation is different from the last one before adding to history
        if (
          history.length === 0 ||
          history[history.length - 1] !== newOperation
        ) {
          setHistory((prevHistory) => [...prevHistory, newOperation]);
        }
        setInputValue(result);
        setCurrentOperation(result);
      }
    } catch (error) {
      console.error(error);
      setInputValue("Error");
    }
  };

  const handleClearClick = () => {
    setInputValue("0");
    setHistory([]);
    setCurrentOperation("");
  };

  const handleBackspace = () => {
    setInputValue((prevValue) =>
      prevValue.length > 1 ? prevValue.slice(0, -1) : "0"
    );
    setCurrentOperation(currentOperation.slice(0, -1));
  };

  return (
    <Card
      className=" container flex-1 justify-center items-center max-w-[500px] h-fit  m-8"
      shadow="lg"
    >
      <CardHeader
        id="display"
        className="flex-1 w-max-[30%] h-full bg-[#264099] text-5xl font-light min-h-[40%]		 text-white text-right font-mono flex justify-end items-center truncate "
      >
        <div className="text-right truncate font-light">
          {history.map((item, index) => (
            <div key={index} className="text-xl text-gray-100">
              {item}
            </div>
          ))}
          <Divider />
          <div className=" w-fit	"> {currentOperation}</div>
        </div>
      </CardHeader>

      <CardBody
        id="card-body"
        className="grid gap-x-0 gap-y-0 space-x-0 space-y-0 grid-cols-4 bg-[#202328] text-[#ced2d5] text-4xl text-center"
      >
        <div className="orange-text cursor-pointer">
          <motion.div whileTap={{ scale: 0.8 }} onClick={handleClearClick}>
            C
          </motion.div>
        </div>
        <div id="plus-minus" className="orange-text cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handlePlusMinusClick()}
          >
            <IconPlusMinus stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
        <div id="percent" className="orange-text cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handlePercentClick()}
          >
            <IconPercentage stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
        <div id="divide" className="orange-text cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleOperatorClick("/")}
          >
            <IconDivide stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
        <div id="seven" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("7")}
          >
            7
          </motion.div>
        </div>
        <div id="eight" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("8")}
          >
            8
          </motion.div>
        </div>
        <div id="nine" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("9")}
          >
            9
          </motion.div>
        </div>
        <div id="multiply" className="orange-text cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleOperatorClick("*")}
          >
            <IconX stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>

        <div id="four" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("4")}
          >
            4
          </motion.div>
        </div>
        <div id="five" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("5")}
          >
            5
          </motion.div>
        </div>
        <div id="six" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("6")}
          >
            6
          </motion.div>
        </div>
        <div id="subtract" className="orange-text cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleOperatorClick("-")}
          >
            <IconMinus stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
        <div id="one" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("1")}
          >
            1
          </motion.div>
        </div>
        <div id="two" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("2")}
          >
            2
          </motion.div>
        </div>
        <div id="three" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("3")}
          >
            3
          </motion.div>
        </div>
        <div id="add" className="orange-text cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleOperatorClick("+")}
          >
            <IconPlus stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
        <div id="decimal" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleOperatorClick(".")}
          >
            .
          </motion.div>
        </div>
        <div id="zero" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => handleNumberClick("0")}
          >
            0
          </motion.div>
        </div>
        <div id="delete" className="cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.8, transition: { duration: 2 } }}
            onClick={handleBackspace}
          >
            <IconBackspace stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
        <div id="equals" className="cursor-pointer">
          <motion.div whileTap={{ scale: 0.8 }} onClick={handleEqualsClick}>
            <IconEqual stroke="1" className="flex mx-auto" />
          </motion.div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Calculator;
