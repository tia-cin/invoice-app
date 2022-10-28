import Link from "next/link";
import { useRouter } from "next/router";
import Buttons from "../components/Buttons";
import { BsClock, BsCheck } from "react-icons/bs";

export default function Invoices() {
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
          <p className="mt-1">There are a total of 3 invoices</p>
          <Buttons handle={navigate} text="New Invoice" margin={"mx-2"} />
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
        <Link href={`/invoice/id`} passHref>
          <div className="flex justify-between cursor-pointer hover:bg-third-dark rounded px-2 pt-5 pb-3">
            <p>#278313</p>
            <p>Project A</p>
            <p>8.12.2021</p>
            <p>$258</p>
            <p className="bg-third-light rounded-md text-xl p-2 mr-4 text-center">
              <BsCheck />
            </p>
          </div>
        </Link>
        <Link href={`/invoice/id`} passHref>
          <div className="flex justify-between cursor-pointer hover:bg-third-dark rounded px-2 pt-5 pb-3">
            <p>#278313</p>
            <p>Project A</p>
            <p>8.12.2021</p>
            <p>$258</p>
            <p className="bg-third-light rounded-md text-xl p-2 mr-4 text-center">
              <BsClock />
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
