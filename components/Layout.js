import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="w-full h-screen overflow-auto bg-[#0A0E1A] cursor-default text-[#f9f9f9]">
        <Navbar />
        <div className="py-2 px-10">{props.children}</div>
      </div>
    </main>
  );
};

export default Layout;
