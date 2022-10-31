import React, { useRef } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

function InvoiceDetails() {
  const router = useRouter();
  const { data } = props;
  const modalRef = useRef(null);

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
  return <div>InvoiceDetails</div>;
}

export default InvoiceDetails;

export async function getStaticPathss() {
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
  const invoice = await db.find({ _id: ObjectId(id) });

  return {
    props: {
      data: {
        ...invoice,
        id: (invoice._id = String(invoice._id)),
      },
    },
  };
}
