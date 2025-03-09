"use client";

import { useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapPin, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Spot {
  id: string;
  title: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  address: string;
  status: string;
  owner: {
    name: string;
    rating: number;
    reviewCount: number;
  };
}

export default function InteractiveMap() {
  const { data: session } = useSession();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [isAddingSpot, setIsAddingSpot] = useState(false);
  const [newSpotLocation, setNewSpotLocation] = useState<{lat: number; lng: number} | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 52.0907, // Utrecht coordinates
    longitude: 5.1214,
    zoom: 13
  });

  useEffect(() => {
    fetchSpots();
  }, [viewState]);

  const fetchSpots = async () => {
    try {
      const response = await fetch(`/api/spots?latitude=${viewState.latitude}&longitude=${viewState.longitude}&distance=5000`);
      const data = await response.json();
      setSpots(data);
    } catch (error) {
      toast.error("Error loading spots");
    }
  };

  const handleMapClick = (event: any) => {
    if (!isAddingSpot) return;
    
    const { lat, lng } = event.lngLat;
    setNewSpotLocation({ lat, lng });
  };

  const handleAddSpot = async () => {
    if (!newSpotLocation) return;

    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Nieuwe Terrasplek",
          description: "Beschrijf je terrasplek",
          price: 5.00,
          latitude: newSpotLocation.lat,
          longitude: newSpotLocation.lng,
          address: "Wordt automatisch ingevuld",
          capacity: 2
        })
      });

      if (!response.ok) throw new Error("Failed to create spot");
      
      toast.success("Spot succesvol toegevoegd!");
      setIsAddingSpot(false);
      setNewSpotLocation(null);
      fetchSpots();
    } catch (error) {
      toast.error("Error creating spot");
    }
  };

  const handleReserveSpot = async (spotId: string) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId,
          price: selectedSpot?.price
        })
      });

      if (!response.ok) throw new Error("Failed to reserve spot");
      
      toast.success("Plek succesvol gereserveerd!");
      setSelectedSpot(null);
      fetchSpots();
    } catch (error) {
      toast.error("Error reserving spot");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onClick={handleMapClick}
        className="w-full h-full"
      >
        <NavigationControl position="top-right" />
        <GeolocateControl
          position="top-right"
          trackUserLocation
          onGeolocate={(pos) => {
            setViewState({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              zoom: 14
            });
          }}
        />

        {spots.map((spot) => (
          <Marker
            key={spot.id}
            latitude={spot.latitude}
            longitude={spot.longitude}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedSpot(spot);
            }}
          >
            <MapPin className="w-8 h-8 text-green-600 hover:text-green-700 cursor-pointer transition-colors" />
          </Marker>
        ))}

        {newSpotLocation && (
          <Marker
            latitude={newSpotLocation.lat}
            longitude={newSpotLocation.lng}
            anchor="bottom"
          >
            <MapPin className="w-8 h-8 text-blue-600 animate-bounce" />
          </Marker>
        )}

        {selectedSpot && (
          <Popup
            latitude={selectedSpot.latitude}
            longitude={selectedSpot.longitude}
            anchor="bottom"
            onClose={() => setSelectedSpot(null)}
            closeOnClick={false}
          >
            <Card className="p-4 min-w-[300px]">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{selectedSpot.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setSelectedSpot(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{selectedSpot.description}</p>
              <p className="text-sm text-gray-600 mb-3">{selectedSpot.address}</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Aangeboden door</p>
                  <p className="font-medium">{selectedSpot.owner.name}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>★ {selectedSpot.owner.rating}</span>
                    <span>({selectedSpot.owner.reviewCount} reviews)</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-green-600">€{selectedSpot.price.toFixed(2)}</p>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleReserveSpot(selectedSpot.id)}
              >
                Reserveer Nu
              </Button>
            </Card>
          </Popup>
        )}
      </Map>

      <div className="absolute top-4 left-4 z-10 space-y-4">
        <Card className="p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Beschikbare Plekken</h2>
          <p className="text-sm text-gray-600 mb-4">
            {spots.length} terrasplekken gevonden
          </p>
          {session && (
            <Button
              className={`w-full ${isAddingSpot ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              onClick={() => setIsAddingSpot(!isAddingSpot)}
            >
              {isAddingSpot ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Voeg Plek Toe
                </>
              )}
            </Button>
          )}
        </Card>

        {newSpotLocation && (
          <Card className="p-4 shadow-lg">
            <h3 className="font-semibold mb-2">Nieuwe Plek Toevoegen</h3>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleAddSpot}
            >
              Bevestig Locatie
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}