import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { db } from "@/utils/db/db";
import { isOwnerOrAdmin } from "@/utils/roles";
import { getItem } from "@/utils/db/items";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = +params.id;
    const item = await getItem(params.id);

    if (!item) return new NextResponse("Item Not Found", { status: 404 });

    const collectionId = item.collectionId;

    const isAuthorized = await isOwnerOrAdmin(collectionId.toString());

    if (!isAuthorized) return new NextResponse("Unauthorized", { status: 401 });

    await db.item.delete({ where: { id } });
    revalidatePath("/es/user/dashboard");
    revalidatePath("/en/user/dashboard");
    revalidatePath(`/es/collection/${collectionId}`);
    revalidatePath(`/en/collection/${collectionId}`);

    return new NextResponse(JSON.stringify({ message: `Item Deleted` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("Error deleting Item", { status: 500 });
  }
}
