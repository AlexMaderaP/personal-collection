import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkAdmin } from "@/utils/roles";
import { checkRequireSignOut } from "@/utils/api/signOutUtils";

export async function POST(req: Request) {
  if (!checkAdmin()) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const { id, role } = await req.json();
    const { userId } = auth();
    if (!id || !role) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const res = await clerkClient().users.updateUser(id as string, {
      publicMetadata: { role },
    });

    const requiresSignOut =
      checkRequireSignOut(userId, id) && res.publicMetadata.role !== "admin";

    return new NextResponse(
      JSON.stringify({
        message: `Role updated to ${res.publicMetadata.role}`,
        requiresSignOut,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse("Error updating user role", { status: 500 });
  }
}
