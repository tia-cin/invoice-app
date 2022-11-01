import React, { useState } from "react";
import { useRouter } from "next/router";
import Inputs from "../../../components/Inputs";
import Buttons from "../../../components/Buttons";
import { MongoClient, ObjectId } from "mongodb";

function EditItem(props) {
  const { data } = props;
  const router = useRouter();
  const [invoice, setInvoice] = useState({
    senderStreet: data.sender.street,
    senderCity: data.sender.city,
    senderPostalCode: data.sender.postalCode,
    senderCountry: data.sender.country,
    clientName: data.client.clientName,
    clientEmail: data.client.clientEmail,
    clientStreet: data.client.clientAddress.street,
    clientCity: data.client.clientAddress.city,
    clientPostalCode: data.client.clientAddress.postalCode,
    clientCountry: data.client.clientAddress.country,
    createdAt: data.createdAt,
    paymentDue: data.paymentDue,
    paymentTerms: data.paymentTerms,
    description: data.description,
  });
  const [items, setItes] = useState(data.items);

  const onChange = (e) => {
    setInvoice({
      ...invoice,
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

  const totalAmount = items.reduce((prev, curr) => prev + curr.total, 0);

  const handleSubmit = async (id, status) => {
    try {
      const res = await fetch(`/api/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoice, status, items, total: totalAmount }),
      });
      const data = await res.json();
      router.push(`/invoice/${id}`);
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-4xl font-semibold">Edit Invoice</h1>
      <div>
        <div>
          <p className="font-medium text-xl">Bill from </p>
          <Inputs
            name="senderStreet"
            text="Streer Address"
            value={invoice.senderStreet}
            onChange={onChange}
            width
          />
          <div className="flex justify-between">
            <Inputs
              text="City"
              name="senderCity"
              value={invoice.senderCity}
              onChange={onChange}
            />
            <Inputs
              text="Postal Code"
              name="senderPostalCode"
              value={invoice.senderPostalCode}
              onChange={onChange}
            />
            <Inputs
              text="Country"
              name="senderCountry"
              value={invoice.senderCountry}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <p className="font-medium text-xl">Bill to </p>
          <Inputs
            text="Client Name"
            name="clientName"
            width
            value={invoice.clientName}
            onChange={onChange}
          />
          <Inputs
            text="Client Email"
            name="clientEmail"
            width
            value={invoice.clientEmail}
            onChange={onChange}
          />
          <Inputs
            text="Client Street Address"
            name="clientStreet"
            width
            value={invoice.clientStreet}
            onChange={onChange}
          />
          <div className="flex justify-between">
            <Inputs
              text="Client City"
              name="clientCity"
              value={invoice.clientCity}
              onChange={onChange}
            />
            <Inputs
              text="Client Postal Code"
              name="clientPostalCode"
              value={invoice.clientPostalCode}
              onChange={onChange}
            />
            <Inputs
              text="Client Country"
              name="clientCountry"
              value={invoice.clientCountry}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-between">
            <Inputs
              text="Invoice Date"
              name="createdAt"
              type="date"
              value={invoice.paymentDue}
              onChange={onChange}
            />
            <Inputs
              text="Payment Terms"
              name="paymentTerms"
              value={invoice.paymentTerms}
              onChange={onChange}
            />
          </div>
          <Inputs
            text="Project Description"
            name="description"
            value={invoice.description}
            onChange={onChange}
            width
          />
        </div>
        <div>
          <div>
            <h3 className="mb-5">Item List</h3>
            <div className="overflow-auto">
              {items?.map((item, i) => (
                <div key={i} className="flex justify-between mb-3 items-center">
                  <Inputs text="Item Name" name="name" value={item.name} />
                  <Inputs
                    text="Quantity"
                    name="quantity"
                    type="number"
                    value={item.quantity}
                  />
                  <Inputs
                    text="Price"
                    name="price"
                    type="number"
                    value={item.price}
                  />
                  <p>${item.total}</p>
                  <Buttons
                    text="Delete"
                    styles={"w-20 h-10"}
                    handle={() => handleDeleteItem(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Buttons styles="w-full h-10" text="Add New Item" handle={addItem} />
          <div className="flex justify-between my-5">
            <Buttons
              text="Cancel"
              styles="w-100 h-10"
              handle={() => router.push(`/invoice/${invoice.id}`)}
            />
            <Buttons
              text="Save"
              styles="w-100 h-10"
              handle={() => handleSubmit(invoice.id, invoice.status)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItem;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = client.db().collection("allInvoices");
  const invoices = await db.find({}, { _id: 1 }).toArray();

  return {
    fallback: "blocking",
    paths: invoices.map((i) => ({
      params: {
        id: (i._id = String(i._id)),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = client.db().collection("allInvoices");
  const invoice = await db.findOne({ _id: ObjectId(id) });

  return {
    props: {
      data: {
        id: (invoice._id = String(invoice._id)),
        ...invoice,
      },
    },
    revalidate: 1,
  };
}
