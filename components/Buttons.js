import React from "react";

function Buttons({ handle, width, text, color }) {
  return (
    <button
      onClick={handle}
      className={`${width ? "w-full" : "w-30 h-10 px-2"} ${
        color ? color : "bg-liliac"
      } rounded-lg mx-2`}
    >
      {text}
    </button>
  );
}

export default Buttons;
