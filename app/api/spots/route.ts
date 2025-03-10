// app/api/spots/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Define the type for the raw query result
interface RawSpot {
  id: string;
  title: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  address: string;
  capacity: number;
  ownerId: string;
  status: string;
  ownerName: string;
  ownerRating: number | null;
  ownerReviewCount: number;
}

// Explicitly export GET handler
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const distance = searchParams.get("distance") || "5000"; // Default 5km radius

    let spots;
    if (latitude && longitude) {
      spots = await prisma.$queryRaw<RawSpot[]>`
        SELECT s.*, 
          u.name as "ownerName", 
          u.rating as "ownerRating", 
          u."reviewCount" as "ownerReviewCount"
        FROM "Spot" s
        JOIN "User" u ON s."ownerId" = u.id
        WHERE earth_box(ll_to_earth(${parseFloat(latitude)}, ${parseFloat(longitude)}), ${parseInt(distance)}) @> ll_to_earth(s.latitude, s.longitude)
        AND earth_distance(ll_to_earth(${parseFloat(latitude)}, ${parseFloat(longitude)}), ll_to_earth(s.latitude, s.longitude)) <= ${parseInt(distance)}
        AND s.status = 'AVAILABLE'
        ORDER BY earth_distance(ll_to_earth(${parseFloat(latitude)}, ${parseFloat(longitude)}), ll_to_earth(s.latitude, s.longitude))
      `;

      spots = spots.map((spot: { ownerName: any; ownerRating: any; ownerReviewCount: any; }) => ({
        ...spot,
        owner: {
          name: spot.ownerName,
          rating: spot.ownerRating,
          reviewCount: spot.ownerReviewCount
        }
      }));
    } else {
      spots = await prisma.spot.findMany({
        where: {
          status: "AVAILABLE"
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
    }

    return NextResponse.json(spots);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching spots" },
      { status: 500 }
    );
  }
};

// Explicitly export POST handler
export const POST = async (req: Request) => {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, price, latitude, longitude, address, capacity } = body;

    const spot = await prisma.spot.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        capacity: parseInt(capacity),
        ownerId: session.user.id,
      }
    });

    return NextResponse.json(spot, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating spot" },
      { status: 500 }
    );
  }
};