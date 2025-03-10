import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
    const minCapacity = Number(searchParams.get("minCapacity")) || 1;
    const amenities = searchParams.get("amenities")?.split(",") || [];

    const spots = await prisma.spot.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { address: { contains: query, mode: 'insensitive' } }
            ]
          },
          { price: { gte: minPrice, lte: maxPrice } },
          { capacity: { gte: minCapacity } },
          amenities.length > 0 ? { amenities: { hasEvery: amenities } } : {},
          { status: "AVAILABLE" }
        ]
      },
      include: {
        owner: {
          select: {
            name: true,
            rating: true,
            reviewCount: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(spots);
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching spots" },
      { status: 500 }
    );
  }
}