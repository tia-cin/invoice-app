import { MongoClient, ObjectId } from "mongodb";

const handle = async (req, res) => {
  const { id } = req.query;
  const client = await MongoClient.connect(
    "mongodb+srv://mongoDB:mongoDB123@cluster0.deg35s0.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = client.db().collection("allInvoices");

  console.log(req.body);

  if (req.method === "PUT") {
    const { invoice } = req.body;
    await db.updateOne(
      { _id: ObjectId(id) },
      {
        $set: { ...invoice },
      }
    );
    res.status(200).send({ message: "Invoice Updated!" });
  }
  client.close();
};

export default handle;
