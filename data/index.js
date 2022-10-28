import logo from "../assets/logo.png";
import { BsViewList, BsPen, BsInbox } from "react-icons/bs";

const links = [
  {
    text: "Invoice",
    link: "/",
    icon: <BsInbox />,
  },
  {
    text: "Create Invoice",
    link: "/new-invoice",
    icon: <BsPen />,
  },
];

export { logo, links };
