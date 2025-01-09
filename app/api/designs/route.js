import { MongoClient, ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url); // Parse the request URL
    const id = url.searchParams.get("id"); // Extract id from query params
    const category = url.searchParams.get("category"); // Extract category from query params
    const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1
    const limit = parseInt(url.searchParams.get("limit")) || 8; // Default to 8 designs per page

    // MongoDB connection
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const collection = db.collection("designs");

    // Fetch a design by ID if 'id' query param is provided
    if (id) {
      const design = await collection.findOne({ _id: new ObjectId(id) });

      client.close();

      if (design) {
        return new Response(JSON.stringify(design), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: "Design not found" }), { status: 404 });
      }
    }

    // Handle fetching all or filtered designs based on category
    const skip = (page - 1) * limit; // Calculate documents to skip
    let query = {}; // Default to returning all designs
    if (category) {
      query.category = category; // If category is provided, filter by category
    }

    // Fetch designs with optional category filtering and pagination
    const designs = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    client.close();

    return new Response(JSON.stringify(designs), { status: 200 });
  } catch (error) {
    console.error("Error in MongoDB connection:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
