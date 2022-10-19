import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

function AddNew() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
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

  return (
    <div>
      <div>
        <div>
          <h3>New Invoice</h3>
        </div>
        <div>
          <div>
            <p>Bill from </p>
            <div>
              <p>Street Address</p>
              <input type="text" />
            </div>
            <div>
              <div>
                <p>City</p>
                <input type="text" />
              </div>
              <div>
                <p>Postal Code</p>
                <input type="text" />
              </div>
              <div>
                <p>Country</p>
                <input type="text" />
              </div>
              <div>
                <p>Street Address</p>
                <input type="text" />
              </div>
            </div>
          </div>
          <div>
            <p>Bill to </p>
            <div>
              <p>Client Name</p>
              <input type="text" />
            </div>
            <div>
              <p>Client Email</p>
              <input type="email" />
            </div>
            <div>
              <p>Street Address</p>
              <input type="text" />
            </div>
            <div>
              <div>
                <p>City</p>
                <input type="text" />
              </div>
              <div>
                <p>Postal Code</p>
                <input type="text" />
              </div>
              <div>
                <p>Country</p>
                <input type="text" />
              </div>
            </div>
            <div>
              <div>
                <p>Invoice Date</p>
                <input type="date" />
              </div>
              <div>
                <p>Payment Terms</p>
                <input type="text" />
              </div>
            </div>
            <div>
              <p>Project Description</p>
              <input type="text" />
            </div>
          </div>
          <div>
            <div>
              <h3>Item List</h3>
              {items?.map((item, i) => (
                <div key={i}>
                  <div>
                    <div>
                      <p>Item Name</p>
                      <input
                        type="text"
                        name="name"
                        onClick={(e) => handleChange(e, i)}
                      />
                    </div>
                    <div>
                      <p>Qty</p>
                      <input
                        type="number"
                        name="quantity"
                        onClick={(e) => handleChange(e, i)}
                      />
                    </div>
                    <div>
                      <p>Price</p>
                      <input
                        type="number"
                        name="price"
                        onClick={(e) => handleChange(e, i)}
                      />
                    </div>
                    <div>
                      <p>Total</p>
                      <h4>${item.total}</h4>
                    </div>
                    <button onClick={() => handleDeleteItem(i)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addItem}>Add New Item</button>
            <div>
              <button onClick={() => router.push("/")}>Discard</button>
              <div>
                <button>Save as Draft</button>
                <button>Send & Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNew;
