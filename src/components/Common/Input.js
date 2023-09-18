import React from "react";

function Input(props) {
  return (
    <>
      <div className={`bg-transparent w-auto mt-auto ${props.className}`}>
        <h2 className="bg-transparent text-black opacity-80 text-[12px] whitespace-pre-wrap">
          {props.label}
        </h2>
        <div className="bg-white w-full p-3 rounded-md mt-1 text-[14px] text-black border border-gray-300">
          {props.InputName}
        </div>
      </div>
    </>
  );
}

export default Input;
