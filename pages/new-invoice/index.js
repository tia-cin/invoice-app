import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Inputs from "../../components/Inputs";
import Buttons from "../../components/Buttons";

function AddNew() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    total: 0,
  });
  const [input, setInput] = useState({
    senderStreet: "",
    senderCity: "",
    senderPostalCode: "",
    senderCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPostalCode: "",
    clientCountry: "",
    createdAt: "",
    paymentDue: "",
    paymentTerms: "",
    description: "",
    status: "",
    items: [],
    total: 0,
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const senderStreet = useRef("");
  const senderCity = useRef("");
  const senderPostalCode = useRef("");
  const senderCountry = useRef("");
  const clientName = useRef("");
  const clientEmail = useRef("");
  const clientStreet = useRef("");
  const clientCity = useRef("");
  const clientPostalCode = useRef("");
  const clientCountry = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const paymentTerms = useRef("");

  const addItem = () => {
    setItems([...items, item]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  const handleDeleteItem = (i) => {
    const newData = [...items];
    newData.splice(i, 1);
    setItems(newData);
  };

  const totalAmount = items.reduce((a, c) => a + c.total, 0);

  const handleSubmit = async (status) => {
    try {
      const res = await fetch("/api/new-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      router.push("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen ">
      <h1 className="text-center text-4xl font-semibold">New Invoice</h1>
      <div>
        <div>
          <p className="font-medium text-xl">Bill from </p>
          <Inputs
            onChange={onChange}
            name={"Street Address"}
            width
            value={input.senderStreet}
          />
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              name={"City"}
              value={input.senderCity}
            />
            <Inputs
              onChange={onChange}
              name={"Postal Code"}
              value={input.senderPostalCode}
            />
            <Inputs
              onChange={onChange}
              name={"Country"}
              value={input.senderCountry}
            />
          </div>
        </div>
        <div>
          <p className="font-medium text-xl">Bill to </p>
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              name={"Client Name"}
              value={input.clientName}
            />
            <Inputs
              onChange={onChange}
              name={"Client Email"}
              value={input.clientEmail}
            />
          </div>
          <Inputs
            onChange={onChange}
            name={"Client Street Address"}
            value={input.clientStreet}
            width
          />
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              name={"Client City"}
              value={input.clientCity}
            />
            <Inputs
              onChange={onChange}
              name={"Client Postal Code"}
              value={input.clientPostalCode}
            />
            <Inputs
              onChange={onChange}
              name={"Client Country"}
              value={input.clientCountry}
            />
          </div>
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              name={"Invoice Date"}
              value={input.createdAt}
              type="date"
            />
            <Inputs
              onChange={onChange}
              name={"Payment Terms"}
              value={input.paymentTerms}
            />
          </div>
          <Inputs
            onChange={onChange}
            name={"Project Description"}
            value={input.description}
            width
          />
        </div>
        <div>
          <div>
            <h3>Item List</h3>
            {items?.map((item, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p>Item Name</p>
                  <input
                    type="text"
                    name="name"
                    onClick={(e) => handleChange(e, i)}
                  />
                </div>
                <div>
                  <p>Qty</p>
                  <input
                    type="number"
                    name="quantity"
                    onClick={(e) => handleChange(e, i)}
                  />
                </div>
                <div>
                  <p>Price</p>
                  <input
                    type="number"
                    name="price"
                    onClick={(e) => handleChange(e, i)}
                  />
                </div>
                <div>
                  <p>Total</p>
                  <h4>${item.total}</h4>
                </div>
                <Buttons text={"Delete"} handle={() => handleDeleteItem(i)} />
              </div>
            ))}
          </div>
          <Buttons width text={"Add New Item"} handle={addItem} />
          <div className="flex justify-between">
            <Buttons handle={() => router.push("/")} text="Discard" />
            <div className="flex justify-around">
              <Buttons
                text={"Save as Draft"}
                handle={() => handleSubmit("draft")}
                color="transparent"
              />
              <Buttons
                text={"Send & Save"}
                handle={() => handleSubmit("pending")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNew;
