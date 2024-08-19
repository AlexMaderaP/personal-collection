import { NextResponse } from "next/server";

import { db } from "@/utils/db/db";

export const revalidate = 0;

export async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { tagName } = await req.json();

    if (!tagName) {
      return new NextResponse("Missing tagName in body", { status: 400 });
    }

    const newTag = await db.tag.create({
      data: {
        name: tagName.toLowerCase(),
      },
    });

    return new NextResponse(JSON.stringify(newTag), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("Error creating tag", { status: 500 });
  }
}
