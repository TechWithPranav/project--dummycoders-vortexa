import { db } from "@/app/_lib"; // Import your database connection

export async function GET(request) {
  try {
    const users = await db.user.findMany(); // Fetch all users

    console.log("users: ",users);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
