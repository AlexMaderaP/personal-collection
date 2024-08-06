import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkAdmin } from "@/utils/roles";

export async function POST(req: Request) {
  if (!checkAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const { id, role } = await req.json();

    if (!id || !role) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const res = await clerkClient().users.updateUser(id as string, {
      publicMetadata: { role },
    });

    let requiresSignOut = false;
    const { userId } = auth();

    if (userId === id && res.publicMetadata.role !== "admin") {
      requiresSignOut = true;
    }

    return new NextResponse(
      JSON.stringify({
        message: `Role updated to ${res.publicMetadata.role}`,
        requiresSignOut,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new NextResponse("Error updating user role", { status: 500 });
  }
}
