// app/api/reviews/route.ts
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
    const { spotId, bookingId, rating, content } = body;

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

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating,
        content,
        userId: booking.spot.ownerId,
        reviewerId: session.user.id,
        spotId,
        bookingId
      }
    });

    // Update spot rating
    const spotReviews = await prisma.review.findMany({
      where: { spotId }
    });

    const newSpotRating = spotReviews.reduce((acc: any, review: { rating: any; }) => acc + review.rating, 0) / spotReviews.length;

    await prisma.spot.update({
      where: { id: spotId },
      data: {
        rating: newSpotRating,
        reviewCount: spotReviews.length
      }
    });

    // Update user rating
    const userReviews = await prisma.review.findMany({
      where: { userId: booking.spot.ownerId }
    });

    const newUserRating = userReviews.reduce((acc: any, review: { rating: any; }) => acc + review.rating, 0) / userReviews.length;

    await prisma.user.update({
      where: { id: booking.spot.ownerId },
      data: {
        rating: newUserRating,
        reviewCount: userReviews.length
      }
    });

    // Create notification for spot owner
    await prisma.notification.create({
      data: {
        type: "REVIEW_RECEIVED",
        title: "New Review Received",
        message: `You received a new ${rating}-star review`,
        userId: booking.spot.ownerId,
        metadata: { reviewId: review.id, spotId }
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating review" },
      { status: 500 }
    );
  }
};

// Optionally export GET as a 405 Method Not Allowed if you don't want GET support
export const GET = () => {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
};