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
          <img
            src="https://cdn-icons-png.flaticon.com/512/87/87388.png?w=740&t=st=1666964877~exp=1666965477~hmac=64e6534298801bcfe121b4962db027e213d07b774241a7a57829fe2b9a21da76"
            alt="invoice-logo"
            className="w-10 h-10 bg-white rounded-full p-1"
          />
          <p className="text-2xl mx-2 mt-1 text-black font-semibold">Invoice</p>
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
      <Buttons styles="w-200 h-10 bg-third-dark m-5" text={"Logout"} />
    </div>
  );
};

export default Sidebar;
