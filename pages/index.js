import Link from "next/link";
import { useRouter } from "next/router";

export default function Invoices() {
  const router = useRouter();
  const navigate = () => router.push("/new-invoice");
  return (
    <div className="w-full p-10 flex flex-col text-[#191919] cursor-default">
      <div className="my-5 pb-5">
        <h1 className="text-center text-4xl font-semibold">
          Hello User, Welcome to Finances Invoice
        </h1>
      </div>
      <div className="flex justify-between items-center my-3">
        <h3 className="font-medium text-xl">Invoices</h3>
        <div className="flex justify-around">
          <p className="mt-1">There are a total of 3 invoices</p>
          <button
            onClick={navigate}
            className="bg-[#7971ea] rounded px-2 pb-1 pt-0.5 text-[#f9f9f9] ml-2"
          >
            New Invoice
          </button>
        </div>
      </div>
      <div className="mt-2 bg-[#8e98f5] rounded h-full px-5 py-3">
        <div className="flex justify-between ">
          <p>INVOICE ID</p>
          <p>INVOICE NAME</p>
          <p>INVOICE DATE</p>
          <p>INVOICE TOTAL</p>
          <p>STATE</p>
        </div>
        <Link href={`/invoice/id`} passHref>
          <div className="flex justify-between cursor-pointer hover:bg-[#7971ea] rounded px-2 pt-5 pb-3">
            <p>#278313</p>
            <p>Project A</p>
            <p>8.12.2021</p>
            <p>$258</p>
            <p className="bg-[#fce982] rounded-md py-1 px-1.5">pending</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
