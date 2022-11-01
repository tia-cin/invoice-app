import { useRouter } from "next/router";
import React from "react";
import { links } from "../data";
import Buttons from "./Buttons";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-between w-300 bg-liliac">
      <div>
        <div className="flex p-5">
          <p className="text-3xl mx-2 mt-1 text-black font-semibold">
            Invoices
          </p>
        </div>
        <div className="ml-5">
          {links.map((item, i) => (
            <div
              key={i}
              onClick={() => router.push(item.link)}
              className="flex items-center my-5 cursor-pointer"
            >
              <button>{item.icon}</button>
              <span className="ml-5 text-lg">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
