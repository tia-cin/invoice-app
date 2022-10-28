import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full bg-[#edeef8]">{props.children}</div>
    </main>
  );
};

export default Layout;
