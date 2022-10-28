import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Inputs from "../../components/Inputs";
import Buttons from "../../components/Buttons";

function AddNew() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [input, setInput] = useState({
    sender: {
      senderAddress: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
    client: {
      clientName: "",
      clientEmail: "",
      clientAddress: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
    createdAt: "",
    paymentDue: "",
    paymentTerms: "",
    description: "",
    status: "",
    items: "",
    total: "",
  });

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
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
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
        body: JSON.stringify({
          senderStreet: senderStreet.current.value,
          senderCity: senderCity.current.value,
          senderPostalCode: senderPostalCode.current.value,
          senderCountry: senderCountry.current.value,
          clientName: clientName.current.value,
          clientEmail: clientEmail.current.value,
          clientStreet: clientStreet.current.value,
          clientCity: clientCity.current.value,
          clientPostalCode: clientPostalCode.current.value,
          clientCountry: clientCountry.current.value,
          description: description.current.value,
          createdAt: createdAt.current.value,
          paymentTerms: paymentTerms.current.value,
          total: totalAmount,
          status: status,
          items: items,
        }),
      });
      const data = await res.json();
      router.push("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen p-10">
      <h1 className="text-center text-4xl font-semibold">New Invoice</h1>
      <div>
        <div>
          <p className="font-medium text-xl">Bill from </p>
          {/* <Inputs name={"Street Address"} width type={"text"} /> */}
          <div>
            <p>Street Address</p>
            <input className="w-full" type="text" ref={senderStreet} />
          </div>
          <div className="flex justify-between">
            <div>
              <p>City</p>
              <input type="text" ref={senderCity} />
            </div>
            <div>
              <p>Postal Code</p>
              <input type="text" ref={senderPostalCode} />
            </div>
            <div>
              <p>Country</p>
              <input type="text" ref={senderCountry} />
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-xl">Bill to </p>
          <div>
            <p>Client Name</p>
            <input className="w-full" type="text" ref={clientName} />
          </div>
          <div>
            <p>Client Email</p>
            <input type="email" className="w-full" ref={clientEmail} />
          </div>
          <div>
            <p>Street Address</p>
            <input type="text" className="w-full" ref={clientStreet} />
          </div>
          <div className="flex justify-between">
            <div>
              <p>City</p>
              <input type="text" ref={clientCity} />
            </div>
            <div>
              <p>Postal Code</p>
              <input type="text" ref={clientPostalCode} />
            </div>
            <div>
              <p>Country</p>
              <input type="text" ref={clientCountry} />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Invoice Date</p>
              <input type="date" ref={createdAt} />
            </div>
            <div>
              <p>Payment Terms</p>
              <input type="text" ref={paymentTerms} />
            </div>
          </div>
          <div>
            <p>Project Description</p>
            <input type="text" className="w-full" ref={description} />
          </div>
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
