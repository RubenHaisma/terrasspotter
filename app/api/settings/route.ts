// app/api/settings/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Explicitly export GET handler
export const GET = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.userSettings.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching settings" },
      { status: 500 }
    );
  }
};

// Explicitly export PATCH handler
export const PATCH = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const settings = await prisma.userSettings.upsert({
      where: {
        userId: session.user.id,
      },
      update: body,
      create: {
        userId: session.user.id,
        ...body,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating settings" },
      { status: 500 }
    );
  }
};