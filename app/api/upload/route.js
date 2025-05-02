import Design from "@/models/Design";

export async function POST(request) {
  try {
    const body = await request.json();
    const newDesign = await Design.create(body);
    
    return new Response(
      JSON.stringify({ 
        message: "Design uploaded successfully!",
        design: newDesign 
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading design:", error);
    return new Response(
      JSON.stringify({ 
        message: error.message.includes("Missing") 
          ? error.message 
          : "Failed to upload design",
        error: error.message 
      }),
      { status: error.message.includes("Missing") ? 400 : 500 }
    );
  }
}