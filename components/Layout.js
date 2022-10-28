import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <main className="flex scroll-smooth">
      <Sidebar />
      <div className="w-full h-screen bg-[#0A0E1A] text-[#f9f9f9]  cursor-default p-10 ">
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
