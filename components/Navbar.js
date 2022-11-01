import React, { useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import Buttons from "./Buttons";
import Inputs from "./Inputs";

function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <nav className="flex justify-between p-2">
      <div className="flex items-center mx-2">
        <Inputs text={"Search"} />
        <BsSearch className="ml-3" />
      </div>
      <div
        className="flex items-center"
        onClick={() => setShow((prev) => !prev)}
      >
        <div className="w-8 h-8 mr-2 bg-user-picture bg-no-repeat bg-cover bg-center" />
        <p className="flex items-center justify-around">
          Hi, <span className="font-medium mr-2 ml-1">User</span>
          <BsChevronDown />
        </p>
      </div>
      {show && (
        <div className="fixed flex flex-col justify-between w-300 h-200 bg-second-dark rounded-lg top-20 right-2 p-5">
          <div className="flex ">
            <div className="w-24 h-24 mr-2 bg-user-picture bg-no-repeat bg-cover bg-center" />
            <div className="">
              <p className="font-semibold text-xl mt-2">User</p>
              <p className="text-second-light text-sm mt-1">Acount</p>
              <p className="text-second-light text-sm font-bold mt-1">
                username@mail.com
              </p>
            </div>
          </div>
          <Buttons styles="w-full h-10" text={"Logout"} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
