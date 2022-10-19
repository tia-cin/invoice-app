import React from "react";
import { useRouter } from "next/router";

function InvoiceDetails() {
  const router = useRouter();
  const goBack = () => router.push("/");
  return (
    <div>
      <div>
        <h6 onClick={goBack}>Go back</h6>
      </div>
      <div>
        <div>
          <p>Status</p>
          <button>pending</button>
        </div>
        <div>
          <button>Edit</button>
          <button>Delete</button>
          <button>Mark ad Paid</button>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h4>INVOICE_ID</h4>
            <p>Re-branding</p>
          </div>
          <div>
            <p>Block - B, Road - 41</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>Invoice Date</p>
              <h4>INVOICE_DATE</h4>
            </div>
            <div>
              <p>Invoice Due</p>
              <h4>INVOICE_DUE</h4>
            </div>
          </div>
          <div>
            <p>Invoice Date</p>
            <h4>INVOICE_DATE</h4>
            <div>
              <p>Block - B, Road - 41</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div>
            <p>Send to</p>
            <h4>name@email.com</h4>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <p>Item name</p>
              <p>Qty</p>
              <p>Price</p>
              <p>Total</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
