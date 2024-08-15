import { NextResponse } from "next/server";

import { db } from "@/utils/db/db";
import { isOwnerOrAdmin } from "@/utils/roles";

export async function DELETE(
  request: Request,
  { params }: { params: { customFieldId: string; id: string } },
) {
  try {
    const collectionId = +params.id;

    const isAuthorized = await isOwnerOrAdmin(collectionId.toString());

    if (!isAuthorized) return new NextResponse("Unauthorized", { status: 401 });

    await db.customField.delete({
      where: {
        id: +params.customFieldId,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: `Custom Field Deleted` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new NextResponse("Error deleting custom field", { status: 500 });
  }
}
