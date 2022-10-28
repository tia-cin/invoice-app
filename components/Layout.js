import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <main className="flex">
      <Sidebar />
      <div>{props.children}</div>
    </main>
  );
};

export default Layout;
