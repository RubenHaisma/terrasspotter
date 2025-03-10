// app/api/bookings/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Explicitly export POST handler
export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { spotId, price } = body;

    const spot = await prisma.spot.findUnique({
      where: { id: spotId },
    });

    if (!spot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 });
    }

    if (spot.status !== "AVAILABLE") {
      return NextResponse.json(
        { error: "Spot is not available" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        spotId,
        buyerId: session.user.id,
        price: parseFloat(price),
      },
    });

    await prisma.spot.update({
      where: { id: spotId },
      data: { status: "RESERVED" },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating booking" },
      { status: 500 }
    );
  }
};

// Explicitly export GET handler
export const GET = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        buyerId: session.user.id,
      },
      include: {
        spot: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching bookings" },
      { status: 500 }
    );
  }
};