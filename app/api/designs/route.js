import { MongoClient } from "mongodb";

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const designs = await db.collection("designs").find().toArray();
  client.close();

  return new Response(JSON.stringify(designs), { status: 200 });
}
