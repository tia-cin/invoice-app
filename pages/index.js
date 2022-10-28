import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const navigate = () => router.push("/new-invoice");
  return (
    <div className="w-full">
      <div>
        <div>
          <h3 className="">Invoices</h3>
          <p>There are a total of ... invoices</p>
        </div>
        <button onClick={navigate}>Add New Invoice</button>
      </div>
      <div>
        <Link href={`/invoice/id`} passHref>
          <div>
            <div>
              <h5>INVOICE_ID</h5>
            </div>
            <div>
              <h6>INVOICE_NAME</h6>
            </div>
            <div>
              <p>INVOICE_DATE</p>
            </div>
            <div>
              <h3>INVOICE_TOTAL</h3>
            </div>
            <div>
              <button>pending</button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
