import React from "react";

const Title = (props) => {
  return (
    <div className="font-semibold text-[32px] text-white">
      {props.innerText}
    </div>
  );
};

export default Title;
