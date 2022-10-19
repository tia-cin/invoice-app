import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:<mongoDB123>@cluster0.deg35s0.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  if (req.method === "POST") {
    const invoice = {
      sender: {
        senderAddress: {
          street: req.body.senderStreet,
          city: req.body.senderCity,
          postalCode: req.body.senderPostalCode,
          country: req.body.senderCountry,
        },
      },
      client: {
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        clientAddress: {
          street: req.body.clientStreet,
          city: req.body.clientCity,
          postalCode: req.body.clientPostalCode,
          country: req.body.clientCountry,
        },
      },
      createdAt: req.body.createdAt,
      paymentDue: req.body.createdAt,
      paymentTerms: req.body.paymentTerms,
      description: req.body.description,
      status: req.body.status,
      items: req.body.items,
      total: req.body.total,
    };
    const db = client.db();
    const collection = db.collection("allInvoices");
    await collection.insertOne(invoice);
    res.status(200).send("Invoice added!");
  }
};

export default handler;
