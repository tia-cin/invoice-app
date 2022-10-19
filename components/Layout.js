import React from "react";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Sidebar />
      <div>{props.children}</div>
    </React.Fragment>
  );
};

export default Layout;
