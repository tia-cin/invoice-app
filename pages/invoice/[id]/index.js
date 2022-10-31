import React, { useRef } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Buttons from "../../../components/Buttons";
import { BsClock, BsCheck, BsDash } from "react-icons/bs";

function InvoiceDetails(props) {
  const { data } = props;
  const router = useRouter();
  const modalRef = useRef(null);

  console.log(data);

  const goBack = () => router.push("/");

  const updateStatus = async (invoiceId) => {
    const res = await fetch(`/api/invoice/${invoiceId}`, {
      method: "PUT",
    });
    const data = await res.json();
  };

  const deleteInvoice = async (invoiceId) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const modalToggle = () => modalRef.current.classList.toggle("showModal");
  return (
    <div>
      <h1 className="font-semibold text-3xl">
        Invoice <span className="text-lg uppercase">#{data.id.slice(15)}</span>
      </h1>
      <div className="flex justify-between bg-second-dark rounded-md p-2 my-3">
        <div className="flex items-center">
          <p className="bg-third-light rounded-md text-xl p-2 mr-4 text-center">
            {data.status === "pending" ? (
              <BsClock />
            ) : data.status === "paid" ? (
              <BsCheck />
            ) : (
              <BsDash />
            )}
          </p>
        </div>
        <div>
          <Buttons
            text={"Edit"}
            handle={() => router.push(`/edit/${data.id}`)}
            styles={"mx-2 w-100 h-10"}
            color="transparent"
          />
          <Buttons
            text={"Delete"}
            handle={modalToggle}
            styles={"mx-2 w-100 h-10 "}
            color="bg-red"
          />
          <Buttons
            text={"Mark as Paid"}
            handle={() => updateStatus(data.id)}
            styles={"mx-2 w-100 h-10"}
          />
        </div>
      </div>
      <div className="bg-second-dark mt-5 rounded-md p-5">
        <div className="flex justify-between mb-5">
          <div>
            <p className="uppercase text-lg font-medium">{data.id.slice(15)}</p>
            <p className="text-second-light capitalize">{data.description}</p>
          </div>
          <div className="flex">
            <div className="capitalize text-start text-second-light mr-3">
              <p>{data.sender.street}</p>
              <p>{data.sender.city}</p>
              <p>{data.sender.postalCode}</p>
              <p>{data.sender.country}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div>
            <div className="">
              <p className="text-second-light capitalize">Invoice Date</p>
              <p className="uppercase text-lg font-medium">{data.createdAt}</p>
            </div>
            <div>
              <p className="text-second-light capitalize">Payment Due</p>
              <p className="uppercase text-lg font-medium">{data.paymentDue}</p>
            </div>
          </div>
          <div className="">
            <p className="text-second-light capitalize">Bill to</p>
            <p className="capitalize text-lg font-medium">
              {data.client.clientName}
            </p>
            <div>
              <p className="text-second-light capitalize">
                {data.client.clientAddress.street}
              </p>
              <p className="text-second-light capitalize">
                {data.client.clientAddress.city}
              </p>
              <p className="text-second-light capitalize">
                {data.client.clientAddress.postalCode}
              </p>
              <p className="text-second-light capitalize">
                {data.client.clientAddress.country}
              </p>
            </div>
          </div>
          <div>
            <p className="text-second-light capitalize">Send to</p>
            <p className="text-lg font-medium">{data.client.clientEmail}</p>
          </div>
        </div>
        <div className=" bg-third-dark rounded-md py-2 px-5 mb-5">
          <ul className="flex justify-between">
            <li className="">
              <p className="text-second-light text-lg">Item Name</p>
              <p className="text-second-light text-lg">Quantity</p>
              <p className="text-second-light text-lg">Price</p>
              <p className="text-second-light text-lg">Total</p>
            </li>
            {data.items?.map((item, i) => (
              <li className="text-center" key={i}>
                <p className="font-medium text-lg">{item.name}</p>
                <p className="text-second-light text-lg">{item.quantity}</p>
                <p className="text-second-light text-lg">${item.price}</p>
                <p className="font-medium text-lg">${item.total}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <p className="text-second-light">Grand Total</p>
          <p className="font-medium">${data.total}</p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = client.db().collection("allInvoices");
  const invoices = await db.find({}, { _id: 1 }).toArray();

  return {
    fallback: "blocking",
    paths: invoices.map((invoice) => ({
      params: {
        id: (invoice._id = String(invoice._id)),
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
