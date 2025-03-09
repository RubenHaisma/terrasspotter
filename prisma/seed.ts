import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.message.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.spot.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const password = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      name: 'Jan de Vries',
      email: 'jan@example.com',
      password,
      rating: 4.8,
      reviewCount: 15,
      phoneNumber: '0612345678'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Lisa Bakker',
      email: 'lisa@example.com',
      password,
      rating: 4.9,
      reviewCount: 23,
      phoneNumber: '0687654321'
    }
  });

  // Create sample spots
  const spot1 = await prisma.spot.create({
    data: {
      title: 'Gezellig terras aan de gracht',
      description: 'Prachtig terras met uitzicht over de Oudegracht in Utrecht',
      price: 7.50,
      latitude: 52.0907,
      longitude: 5.1214,
      address: 'Oudegracht 123, Utrecht',
      capacity: 4,
      ownerId: user1.id,
      status: 'AVAILABLE'
    }
  });

  const spot2 = await prisma.spot.create({
    data: {
      title: 'Zonnig hoekterras',
      description: 'Rustig terras op een zonovergoten hoek',
      price: 6.00,
      latitude: 52.0922,
      longitude: 5.1198,
      address: 'Voorstraat 45, Utrecht',
      capacity: 2,
      ownerId: user2.id,
      status: 'AVAILABLE'
    }
  });

  // Create sample bookings
  const booking1 = await prisma.booking.create({
    data: {
      spotId: spot1.id,
      buyerId: user2.id,
      price: spot1.price,
      status: 'COMPLETED'
    }
  });

  // Create sample messages
  await prisma.message.create({
    data: {
      content: 'Hoi, is deze plek nog beschikbaar?',
      userId: user2.id,
      bookingId: booking1.id
    }
  });

  await prisma.message.create({
    data: {
      content: 'Ja zeker! Wanneer wil je langskomen?',
      userId: user1.id,
      bookingId: booking1.id
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });