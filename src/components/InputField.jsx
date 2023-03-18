import React from "react";

const InputField = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <label className="text-white">{props.label}</label>
        {props.required ? <p className="text-accent">*</p> : null}
      </div>
      <input
        className="w-80 h-12 rounded-md border border-white bg-transparent p-2"
        {...props}
      />
    </div>
  );
};

export default InputField;
