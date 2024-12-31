import { MongoClient } from "mongodb";

export async function POST(request) {
  const body = await request.json();
  const { title, description, htmlContent, cssContent, jsContent } = body;

  if (!title || !htmlContent || !cssContent) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  await db.collection("designs").insertOne({
    title,
    description,
    htmlContent,
    cssContent,
    jsContent,
    createdAt: new Date(),
  });

  client.close();
  return new Response(JSON.stringify({ message: "Design uploaded successfully!" }), { status: 201 });
}
