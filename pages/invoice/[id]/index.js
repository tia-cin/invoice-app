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
      <div className="flex justify-between bg-second-dark rounded-md p-2">
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
          />
          <Buttons
            text={"Delete"}
            handle={modalToggle}
            styles={"mx-2 w-100 h-10"}
          />
          <Buttons
            text={"Mark as Paid"}
            handle={() => updateStatus(data.id)}
            styles={"mx-2 w-100 h-10"}
          />
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
