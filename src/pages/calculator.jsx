import React, { useReducer } from "react";
import Title from "../components/Title";
import InputField from "../components/InputField";
import Button from "../components/Button";
import MenuPage from "../layout/MenuPage";

const initialValue = {
  firstValue: 0,
  secondValue: 0,
  operation: "",
  result: 0,
};

function calculateResult(first, operation, second) {
  if (operation === "sum" || operation === "add" || operation === "+") {
    return first + second;
  } else if (
    operation === "subtract" ||
    operation === "sub" ||
    operation === "-"
  ) {
    return first - second;
  } else if (
    operation === "multiply" ||
    operation === "multi" ||
    operation === "*"
  ) {
    return first * second;
  } else if (
    (operation === "divide" || operation === "div" || operation === "/") &&
    second === 0
  ) {
    return "undefined";
  } else if (
    operation === "divide" ||
    operation === "div" ||
    operation === "/"
  ) {
    return first / second;
  } else if (
    operation === "power" ||
    operation === "pow" ||
    operation === "^" ||
    operation === "**"
  ) {
    return first ** second;
  } else if (
    operation === "modulus" ||
    operation === "mod" ||
    operation === "%"
  ) {
    return first % second;
  }

  throw new Error("Invalid operation");
}

const reducer = (draft, action) => {
  switch (action.type) {
    case "setFirstValue":
      return {
        ...draft,
        firstValue: action.payload,
      };
    case "setSecondValue":
      return {
        ...draft,
        secondValue: action.payload,
      };
    case "setOperation":
      return {
        ...draft,
        operation: action.payload,
      };
    case "calculateResult":
      return {
        ...draft,
        result: calculateResult(
          draft.firstValue,
          draft.operation,
          draft.secondValue
        ),
      };
    default:
      return draft;
  }
};

const Calculator = () => {
  const [values, dispatch] = useReducer(reducer, initialValue);

  return (
    <MenuPage>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col pt-14">
          <Title innerText="Calculator" />
          <p className="text-slate-400">
            Try to apply, Sum, Subtract and Multiplication Operations
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-10 justify-center items-center">
          <div className="flex justify-center items-center flex-1 text-white w-80 text-2xl pt-8">
            {values.result}
          </div>
          <InputField
            label="First Value"
            onChange={(event) => {
              dispatch({ type: "setFirstValue", payload: +event.target.value });
            }}
            type="number"
            value={values.firstValue}
            required
          />
          <InputField
            label="Second Value"
            onChange={(event) => {
              dispatch({
                type: "setSecondValue",
                payload: +event.target.value,
              });
            }}
            type="number"
            value={values.secondValue}
            required
          />
          {/* <InputField
            label="Operations"
            onChange={(event) => {
              dispatch({ type: "setOperation", payload: event.target.value });
            }}
            value={values.operation}
            required
          /> */}
          <select
            className="bg-brand border w-80 text-white h-12 rounded-md px-2"
            onChange={(event) => {
              dispatch({ type: "setOperation", payload: event.target.value });
            }}
            value={values.operation}
          >
            <option value="">Select Operation</option>
            <option value="sum">Sum</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
            <option value="power">Power</option>
            <option value="modulus">Modulus</option>
          </select>
          <p className="text-[12px] text-accent">
            {[
              "sum",
              "add",
              "+",
              "subtract",
              "sub",
              "-",
              "multiply",
              "multi",
              "*",
              "divide",
              "div",
              "/",
              "power",
              "pow",
              "^",
              "**",
              "x",
              "modulus",
              "mod",
              "%",
            ].includes(values.operation)
              ? ""
              : "Invalid operation"}
          </p>
          <Button
            innerText="Calculate"
            handleClick={() => dispatch({ type: "calculateResult" })}
            handleDisabled={
              !values.firstValue || !values.secondValue || !values.operation
            }
          />
        </div>
      </div>
    </MenuPage>
  );
};

export default Calculator;
