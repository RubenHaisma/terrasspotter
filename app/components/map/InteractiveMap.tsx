"use client";

import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Sample data - in production, this would come from your database
const SAMPLE_SPOTS = [
  {
    id: 1,
    latitude: 52.3676,
    longitude: 4.9041,
    title: "Café Amsterdam",
    price: "€5",
    description: "Zonnig terras met uitzicht op de gracht",
  },
  {
    id: 2,
    latitude: 52.3702,
    longitude: 4.8952,
    title: "Restaurant De Pijp",
    price: "€7",
    description: "Gezellig hoekterras in De Pijp",
  },
];

export default function InteractiveMap() {
  const [viewState, setViewState] = useState({
    latitude: 52.3676,
    longitude: 4.9041,
    zoom: 13
  });
  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div className="w-full h-[70vh] relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken="YOUR_MAPBOX_TOKEN"
      >
        {SAMPLE_SPOTS.map((spot) => (
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

        {selectedSpot && (
          <Popup
            latitude={selectedSpot.latitude}
            longitude={selectedSpot.longitude}
            anchor="bottom"
            onClose={() => setSelectedSpot(null)}
            closeOnClick={false}
          >
            <Card className="p-4 min-w-[200px]">
              <h3 className="font-semibold mb-2">{selectedSpot.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedSpot.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">{selectedSpot.price}</span>
                <Button size="sm">Contact Verkoper</Button>
              </div>
            </Card>
          </Popup>
        )}
      </Map>

      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Beschikbare Plekken</h2>
        <p className="text-sm text-gray-600">
          {SAMPLE_SPOTS.length} terrasplekken gevonden
        </p>
      </div>
    </div>
  );
}