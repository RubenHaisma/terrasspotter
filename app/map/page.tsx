"use client";

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, Search, UserCircle } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const InteractiveMap = dynamic(
  () => import('../components/map/InteractiveMap'),
  { ssr: false }
);

export default function MapPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-green-600" />
            <span className="text-xl font-semibold">Terrasspotter</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Zoeken
            </Button>
            {session ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => signIn()}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)]">
        <InteractiveMap />
      </main>
    </div>
  );
}