"use client";

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, Search } from 'lucide-react';

const InteractiveMap = dynamic(
  () => import('../components/map/InteractiveMap'),
  { ssr: false }
);

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-green-600" />
            <span className="text-xl font-semibold">Terrasspotter</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Zoeken
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Plek Aanbieden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <InteractiveMap />
          </div>
        </div>
      </main>
    </div>
  );
}