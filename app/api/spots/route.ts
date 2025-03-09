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
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const distance = searchParams.get("distance") || "5000"; // Default 5km radius

    let spots;
    if (latitude && longitude) {
      // Get spots within radius using Postgres earth distance
      spots = await prisma.$queryRaw`
        SELECT *
        FROM "Spot"
        WHERE earth_box(ll_to_earth(${parseFloat(latitude)}, ${parseFloat(longitude)}), ${parseInt(distance)}) @> ll_to_earth(latitude, longitude)
        AND earth_distance(ll_to_earth(${parseFloat(latitude)}, ${parseFloat(longitude)}), ll_to_earth(latitude, longitude)) <= ${parseInt(distance)}
        AND status = 'AVAILABLE'
        ORDER BY earth_distance(ll_to_earth(${parseFloat(latitude)}, ${parseFloat(longitude)}), ll_to_earth(latitude, longitude))
      `;
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
}