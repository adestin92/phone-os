import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

const buttons = [
  ["C", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["", "0", ".", "="],
];

const Calculator = () => {
  const [display, setDisplay] = useState("0");

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "=") {
      try {
        const expression = display.replace(/×/g, "*").replace(/÷/g, "/");
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
          setDisplay("Error");
          return;
        }
        const result = evaluate(expression);
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="calculator-row">
            {row.map((btn) => (
              <button
                key={btn}
                className={`calc-btn ${["÷", "×", "-", "+", "="].includes(btn) ? "operator" : ""} ${btn === "0" ? "zero" : ""}`}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
