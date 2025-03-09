import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { spotId: string } }
) {
  try {
    const spot = await prisma.spot.findUnique({
      where: {
        id: params.spotId
      },
      include: {
        owner: {
          select: {
            name: true,
            rating: true,
            reviewCount: true
          }
        }
      }
    });

    if (!spot) {
      return NextResponse.json(
        { error: "Spot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(spot);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching spot" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { spotId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const spot = await prisma.spot.findUnique({
      where: { id: params.spotId }
    });

    if (!spot) {
      return NextResponse.json(
        { error: "Spot not found" },
        { status: 404 }
      );
    }

    if (spot.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "Not authorized to update this spot" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const updatedSpot = await prisma.spot.update({
      where: { id: params.spotId },
      data: body
    });

    return NextResponse.json(updatedSpot);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating spot" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { spotId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const spot = await prisma.spot.findUnique({
      where: { id: params.spotId }
    });

    if (!spot) {
      return NextResponse.json(
        { error: "Spot not found" },
        { status: 404 }
      );
    }

    if (spot.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "Not authorized to delete this spot" },
        { status: 403 }
      );
    }

    await prisma.spot.delete({
      where: { id: params.spotId }
    });

    return NextResponse.json({ message: "Spot deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting spot" },
      { status: 500 }
    );
  }
}