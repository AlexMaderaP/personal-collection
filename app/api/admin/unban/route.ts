import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkAdmin } from "@/utils/roles";

export async function POST(req: Request) {
  if (!checkAdmin()) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const { id } = await req.json();

    if (!id) {
      return new NextResponse("Missing Id in body", { status: 400 });
    }

    const res = await clerkClient().users.unbanUser(id);

    return new NextResponse(
      JSON.stringify({ message: `User blocked status: ${res.banned}` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new NextResponse("Error updating user status", { status: 500 });
  }
}
