import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <main className="flex scroll-smooth h-screen">
      <Sidebar />
      <div className="w-full bg-[#0A0E1A] text-[#f9f9f9]  cursor-default py-2 px-10">
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
