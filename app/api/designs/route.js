import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const designs = await db.collection("designs").find().toArray();
    client.close();

    return new Response(JSON.stringify(designs), { status: 200 });
  } catch (error) {
    console.error("Error fetching designs:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
