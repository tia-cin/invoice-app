import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  if (req.method === "POST") {
    const { input } = req.body;
    const invoice = {
      sender: {
        street: input.senderStreet,
        city: input.senderCity,
        postalCode: input.senderPostalCode,
        country: input.senderCountry,
      },
      client: {
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        clientAddress: {
          street: input.clientStreet,
          city: input.clientCity,
          postalCode: input.clientPostalCode,
          country: input.clientCountry,
        },
      },
      createdAt: input.createdAt,
      paymentDue: input.createdAt,
      paymentTerms: input.paymentTerms,
      description: input.description,
      status: req.body.status,
      items: req.body.items,
      total: req.body.total,
    };
    const db = client.db();
    const collection = db.collection("allInvoices");
    await collection.insertOne(invoice);
    res.status(200).send({ message: "Invoice added!" });
    client.close();
  }
};

export default handler;
