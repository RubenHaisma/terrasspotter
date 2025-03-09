"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, MessageSquare } from "lucide-react";

interface Spot {
  id: string;
  title: string;
  price: number;
  status: string;
  createdAt: string;
}

interface Booking {
  id: string;
  spot: {
    title: string;
    address: string;
  };
  price: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchSpots = async () => {
      const response = await fetch("/api/spots");
      const data = await response.json();
      setSpots(data);
    };

    const fetchBookings = async () => {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data);
    };

    fetchSpots();
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <Tabs defaultValue="spots" className="space-y-6">
          <TabsList>
            <TabsTrigger value="spots" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Mijn Plekken
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Mijn Boekingen
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Berichten
            </TabsTrigger>
          </TabsList>

          <TabsContent value="spots" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mijn Aangeboden Plekken</h2>
              <Button>Nieuwe Plek Toevoegen</Button>
            </div>

            {spots.map((spot) => (
              <Card key={spot.id} className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{spot.title}</h3>
                    <p className="text-sm text-gray-500">
                      €{spot.price.toFixed(2)} - {spot.status}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Bewerken
                    </Button>
                    <Button variant="destructive" size="sm">
                      Verwijderen
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Mijn Boekingen</h2>
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{booking.spot.title}</h3>
                    <p className="text-sm text-gray-500">
                      {booking.spot.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      €{booking.price.toFixed(2)} - {booking.status}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Berichten</h2>
            <Card className="p-6">
              <p className="text-gray-500">Geen berichten gevonden.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}