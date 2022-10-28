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

const inputsData = {
  sender: [
    {
      type: "text",
      text: "Street Address",
      name: "senderStreet",
      width: true,
    },
    {
      type: "text",
      text: "City",
      name: "senderCity",
      width: false,
    },
    {
      type: "text",
      text: "Postal Code",
      name: "senderPostalCode",
      width: false,
    },
    {
      type: "text",
      text: "Country",
      name: "senderCountry",
      width: false,
    },
  ],
  client: [
    {
      type: "text",
      text: "Client Name",
      name: "clientName",
      width: false,
    },
    {
      type: "email",
      text: "Client Email",
      name: "clientEmail",
      width: false,
    },
    {
      type: "text",
      text: "Client Street Address",
      name: "clientStreet",
      width: true,
    },
    {
      type: "text",
      text: "Client City",
      name: "clientCity",
      width: false,
    },
    {
      type: "text",
      text: "Client Postal Code",
      name: "clientPostalCode",
      width: false,
    },
    {
      type: "text",
      text: "Client Country",
      name: "clientCountry",
      width: false,
    },
  ],
};

export { logo, links, inputsData };
