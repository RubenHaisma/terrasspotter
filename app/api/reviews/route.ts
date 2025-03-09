import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, rating, bookingId } = body;

    // Verify the booking exists and belongs to the user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { spot: true }
    });

    if (!booking || booking.buyerId !== session.user.id) {
      return NextResponse.json(
        { error: "Invalid booking" },
        { status: 400 }
      );
    }

    // Update user's rating and review count
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const newReviewCount = user.reviewCount + 1;
    const newRating = ((user.rating || 0) * user.reviewCount + rating) / newReviewCount;

    await prisma.user.update({
      where: { id: userId },
      data: {
        rating: newRating,
        reviewCount: newReviewCount
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating review" },
      { status: 500 }
    );
  }
}