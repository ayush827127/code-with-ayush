import { MongoClient } from "mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url); // Parse the request URL
    const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1
    const limit = parseInt(url.searchParams.get("limit")) || 8; // Default to 8 designs per page

    // MongoDB connection
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const collection = db.collection("designs");

    const skip = (page - 1) * limit; // Calculate documents to skip

    // Fetch designs with pagination
    const designs = await collection.find().skip(skip).limit(limit).toArray();

    client.close();

    return new Response(JSON.stringify(designs), { status: 200 });
  } catch (error) {
    console.error("Error in MongoDB connection:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
