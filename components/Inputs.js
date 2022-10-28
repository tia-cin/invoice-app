import React from "react";

const Inputs = ({ name, width, ref, value, type, onChange }) => (
  <input
    type={type ? type : "text"}
    name={name}
    value={value}
    onChange={onChange}
    className={`${width && "w-full"} rounded-lg px-1.5 py-1.5 my-3`}
    placeholder={name}
  />
);

export default Inputs;
