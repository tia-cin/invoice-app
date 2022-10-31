import React from "react";

function Buttons({ handle, styles, text, color }) {
  return (
    <button
      onClick={handle}
      className={`${styles} ${color ? color : "bg-liliac"} rounded-lg`}
    >
      {text}
    </button>
  );
}

export default Buttons;
