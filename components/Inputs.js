import React from "react";

const Inputs = ({ name, width, ref, value, type, onChange }) => (
  <div>
    <p>{name}</p>
    <input
      type={type}
      ref={ref}
      value={value}
      onChange={onChange}
      className={`${width && "w-full"} rounded-lg`}
    />
  </div>
);

export default Inputs;
