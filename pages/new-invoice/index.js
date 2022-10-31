import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Inputs from "../../components/Inputs";
import Buttons from "../../components/Buttons";

function AddNew() {
  const router = useRouter();
  const [items, setItems] = useState([]);
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
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
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

  const totalAmount = items.reduce((prev, curr) => prev.total + curr.total, 0);

  const handleSubmit = async (status) => {
    try {
      const res = await fetch("/api/new-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, status, items, total: totalAmount }),
      });
      const data = await res.json();
      router.push("/");
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-4xl font-semibold">New Invoice</h1>
      <div>
        <div>
          <p className="font-medium text-xl">Bill from </p>
          <Inputs
            onChange={onChange}
            name={"senderStreet"}
            text="Streer Address"
            width
            value={input.senderStreet}
          />
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              text={"City"}
              name="senderCity"
              value={input.senderCity}
            />
            <Inputs
              onChange={onChange}
              text={"Postal Code"}
              name="senderPostalCode"
              value={input.senderPostalCode}
            />
            <Inputs
              onChange={onChange}
              text={"Country"}
              name="senderCountry"
              value={input.senderCountry}
            />
          </div>
        </div>
        <div>
          <p className="font-medium text-xl">Bill to </p>
          <Inputs
            onChange={onChange}
            text={"Client Name"}
            name="clientName"
            width
            value={input.clientName}
          />
          <Inputs
            onChange={onChange}
            text={"Client Email"}
            name="clientEmail"
            width
            value={input.clientEmail}
          />
          <Inputs
            onChange={onChange}
            text={"Client Street Address"}
            name="clientStreet"
            value={input.clientStreet}
            width
          />
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              text={"Client City"}
              name="clientCity"
              value={input.clientCity}
            />
            <Inputs
              onChange={onChange}
              text={"Client Postal Code"}
              name="clientPostalCode"
              value={input.clientPostalCode}
            />
            <Inputs
              onChange={onChange}
              text={"Client Country"}
              name="clientCountry"
              value={input.clientCountry}
            />
          </div>
          <div className="flex justify-between">
            <Inputs
              onChange={onChange}
              text={"Invoice Date"}
              name="createdAt"
              value={input.createdAt}
              type="date"
            />
            <Inputs
              onChange={onChange}
              text={"Payment Terms"}
              name="paymentTerms"
              value={input.paymentTerms}
            />
          </div>
          <Inputs
            onChange={onChange}
            text={"Project Description"}
            name="description"
            value={input.description}
            width
          />
        </div>
        <div>
          <div>
            <h3 className="mb-5">Item List</h3>
            <div className="overflow-auto">
              {items?.map((item, i) => (
                <div key={i} className="flex justify-between mb-3">
                  <Inputs
                    text={"Item Name"}
                    name="name"
                    onChange={(e) => handleChange(e, i)}
                  />
                  <Inputs
                    text={"Quantity"}
                    name="quantity"
                    type={"number"}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <Inputs
                    text={"Price"}
                    name="price"
                    type={"number"}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <div>
                    <p>Total</p>
                    <h4>${item.total}</h4>
                  </div>
                  <Buttons text={"Delete"} handle={() => handleDeleteItem(i)} />
                </div>
              ))}
            </div>
          </div>
          <Buttons
            styles={"w-full h-10"}
            text={"Add New Item"}
            handle={addItem}
          />
          <div className="flex justify-between my-5">
            <Buttons
              handle={() => router.push("/")}
              text="Discard"
              styles=" w-100 h-10"
            />
            <div className="flex justify-around">
              <Buttons
                text={"Save as Draft"}
                handle={() => handleSubmit("draft")}
                color="transparent w-100 h-10 mx-2"
              />
              <Buttons
                text={"Send & Save"}
                handle={() => handleSubmit("pending")}
                styles=" w-100 h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNew;
