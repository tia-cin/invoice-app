import Link from "next/link";
import { useRouter } from "next/router";
import Buttons from "../components/Buttons";
import { BsClock, BsCheck, BsDash } from "react-icons/bs";
import { MongoClient } from "mongodb";

export default function Invoices(props) {
  const { data } = props;
  const router = useRouter();
  const navigate = () => router.push("/new-invoice");
  return (
    <div>
      <div className="my-5 pb-5">
        <h1 className="text-center text-4xl font-semibold">
          Hello User, Welcome to Finances Invoice
        </h1>
      </div>
      <div className="flex justify-between items-center my-3">
        <p className="font-medium text-xl">Invoices</p>
        <div className="flex justify-around">
          <p className="mt-1">There are a total of {data.length} invoices</p>
          <Buttons
            handle={navigate}
            text="New Invoice"
            styles={"mx-2 w-100 h-10"}
          />
        </div>
      </div>
      <div className="mt-2 bg-liliac rounded h-full px-5 py-3">
        <div className="flex justify-between">
          <p className="ml-2">INVOICE ID</p>
          <p>INVOICE NAME</p>
          <p>INVOICE DATE</p>
          <p>INVOICE TOTAL</p>
          <p className="mr-5">STATE</p>
        </div>
        {data?.map((item, i) => (
          <Link href={`/invoice/${item.id}`} passHref key={i}>
            <div className="flex justify-between cursor-pointer hover:bg-third-dark rounded px-2 pt-5 pb-3">
              <p className="uppercase">#{item.id.slice(15)}</p>
              <p>{item.client.clientName}</p>
              <p>{item.createdAt}</p>
              <p>{item.total}</p>
              <p className="bg-third-light rounded-md text-xl p-2 mr-4 text-center">
                {item.status === "pending" ? (
                  <BsClock />
                ) : item.status === "paid" ? (
                  <BsCheck />
                ) : (
                  <BsDash />
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = client.db().collection("allInvoices");
  const invoices = await db.find({}).toArray();

  return {
    props: {
      data: invoices.map((i) => ({
        id: (i._id = String(i._id)),
        ...i,
      })),
    },
  };
}
