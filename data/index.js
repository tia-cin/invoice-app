import logo from "../assets/logo.png";
import { BsViewList, BsPen } from "react-icons/bs";

const links = [
  {
    text: "Invoices",
    link: "/invoice",
    icon: <BsViewList />,
  },
  {
    text: "Create Invoice",
    link: "/new-invoice",
    icon: <BsPen />,
  },
];

export { logo, links };
