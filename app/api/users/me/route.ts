import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        rating: true,
        reviewCount: true,
        createdAt: true,
        _count: {
          select: {
            spots: true,
            bookings: true
          }
        }
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phoneNumber } = body;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phoneNumber
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        rating: true,
        reviewCount: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating user data" },
      { status: 500 }
    );
  }
}