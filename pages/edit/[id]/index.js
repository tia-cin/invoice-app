import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Inputs from "../../../components/Inputs";
import Buttons from "../../../components/Buttons";
import { MongoClient, ObjectId } from "mongodb";

function EditItem(props) {
  const { data } = props;
  console.log(data);
  const router = useRouter();

  return (
    <div className="w-full">
      <h1 className="text-center text-4xl font-semibold">New Invoice</h1>
      <div>
        <div>
          <p className="font-medium text-xl">Bill from </p>
          <Inputs name={"senderStreet"} text="Streer Address" />
          <div className="flex justify-between">
            <Inputs text={"City"} name="senderCity" />
            <Inputs text={"Postal Code"} name="senderPostalCode" />
            <Inputs text={"Country"} name="senderCountry" />
          </div>
        </div>
        <div>
          <p className="font-medium text-xl">Bill to </p>
          <Inputs text={"Client Name"} name="clientName" />
          <Inputs text={"Client Email"} name="clientEmail" />
          <Inputs text={"Client Street Address"} name="clientStreet" />
          <div className="flex justify-between">
            <Inputs text={"Client City"} name="clientCity" />
            <Inputs text={"Client Postal Code"} name="clientPostalCode" />
            <Inputs text={"Client Country"} name="clientCountry" />
          </div>
          <div className="flex justify-between">
            <Inputs text={"Invoice Date"} name="createdAt" type="date" />
            <Inputs text={"Payment Terms"} name="paymentTerms" />
          </div>
          <Inputs text={"Project Description"} name="description" />
        </div>
        <div>
          <div>
            <h3 className="mb-5">Item List</h3>
            <div className="overflow-auto">
              {items?.map((item, i) => (
                <div key={i} className="flex justify-between mb-3">
                  <Inputs text={"Item Name"} name="name" />
                  <Inputs text={"Quantity"} name="quantity" type={"number"} />
                  <Inputs text={"Price"} name="price" type={"number"} />
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
