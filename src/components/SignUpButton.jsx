import React from "react";

const SignUpButton = (props) => {
  return (
    <div className="bg-transparent w-80 h-12 rounded-md border-2 text-white flex justify-center items-center cursor-pointer border-white">
      {props.innerText}
    </div>
  );
};

export default SignUpButton;
