import React from "react";

function Buttons({ handle, width, text, color, margin }) {
  return (
    <button
      onClick={handle}
      className={`${width ? "w-full h-10" : "w-30 h-10 px-2"} ${
        color ? color : "bg-liliac"
      } rounded-lg ${margin}`}
    >
      {text}
    </button>
  );
}

export default Buttons;
