import { MongoClient } from "mongodb";

export async function GET() {
  try {
    // console.log("Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    // console.log("Connected to MongoDB.");

    const db = client.db();
    const designs = await db.collection("designs").find().toArray();
    client.close();
    // console.log("Data fetched successfully.");

    return new Response(JSON.stringify(designs), { status: 200 });
  } catch (error) {
    console.error("Error in MongoDB connection:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
