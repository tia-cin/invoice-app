import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  if (req.method === "POST") {
    console.log(req.body);
    const db = client.db();
    const collection = db.collection("allInvoices");
    await collection.insertOne(req.body);
    res.status(200).send({ message: "Invoice added!" });
    client.close();
  }
};

export default handler;
