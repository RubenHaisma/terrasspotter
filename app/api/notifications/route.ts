// app/api/notifications/route.ts
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

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching notifications" },
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
    const { id } = body;

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating notification" },
      { status: 500 }
    );
  }
};