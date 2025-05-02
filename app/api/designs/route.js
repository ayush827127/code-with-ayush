import Design from "@/models/Design";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 8;

    if (id) {
      const design = await Design.findById(id);
      return design 
        ? new Response(JSON.stringify(design), { status: 200 })
        : new Response(JSON.stringify({ error: "Design not found" }), { status: 404 });
    }

    const designs = await Design.findAll({ category, page, limit });
    return new Response(JSON.stringify(designs), { status: 200 });
  } catch (error) {
    console.error("Error in design route:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}