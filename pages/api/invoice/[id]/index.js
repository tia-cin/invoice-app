import { MongoClient, ObjectId } from "mongodb";

const handle = async (req, res) => {
  const { id } = req.query;
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = client.db().collection("allInvoices");

  if (req.method === "PUT") {
    await db.updateOne({ _id: ObjectId(id) }, { $set: { status: "paid" } });
    res.status(200).send({ message: "Invoice Paid!" });
    client.close();
  }
  if (req.method === "DELETE") {
    await db.deleteOne({ _id: ObjectId(id) });
    res.status(200).send({ message: "Invoice Deleted!" });
    client.close();
  }
};

export default handle;
