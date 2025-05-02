// /app/api/users/sync/route.js
import User from "@/models/User";

export async function POST(req) {
  try {
    const userData = await req.json();
    const existingUser = await User.findByUid(userData.uid);
    
    if (!existingUser) {
      const newUser = await User.create(userData);
      return Response.json({ success: true, user: newUser });
    }
    
    return Response.json({ success: true, user: existingUser });
  } catch (error) {
    console.error("Error in user sync:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}