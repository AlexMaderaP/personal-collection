import { NextResponse } from "next/server";

import { db } from "@/utils/db/db";

export async function GET() {
  try {
    const categories = await db.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
