import React from "react";

const Button = (props) => {
  return (
    <button onClick={props.handleClick} disabled={props.handleDisabled} className="bg-black w-80 h-12 rounded-md text-white flex items-center justify-center font-medium cursor-pointer">
      {props.innerText}
    </button>
  );
};

export default Button;
