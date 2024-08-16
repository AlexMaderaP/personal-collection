import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { db } from "@/utils/db/db";
import { isOwnerOrAdmin } from "@/utils/roles";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = +params.id;
    const isAuthorized = await isOwnerOrAdmin(id.toString());

    if (!isAuthorized) return new NextResponse("Unauthorized", { status: 401 });

    await db.collection.delete({ where: { id } });
    revalidatePath("/es/user/dashboard");
    revalidatePath("/en/user/dashboard");

    return new NextResponse(JSON.stringify({ message: `Collection Deleted` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("Error deleting collection", { status: 500 });
  }
}
