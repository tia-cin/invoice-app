import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="w-full h-screen overflow-auto bg-[#0A0E1A] cursor-default text-[#f9f9f9] py-2 px-10">
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
