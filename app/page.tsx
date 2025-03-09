"use client";

import { MapPin, Users, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Vind Direct Je Perfecte Terrasplekje
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Plaats je plek. Bepaal je prijs. Ontmoet de koper.
          </p>
          <Link href="/map">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Begin Nu
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Hoe Het Werkt</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Vind een Plek</h3>
            <p className="text-gray-600">
              Bekijk beschikbare terrasplekken op onze interactieve kaart
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Maak Contact</h3>
            <p className="text-gray-600">
              Chat met de verkoper en spreek een prijs af
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Ontmoet & Geniet</h3>
            <p className="text-gray-600">
              Ontmoet bij de plek en geniet van je perfecte terrasmoment
            </p>
          </Card>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ontdek Beschikbare Plekken
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center">
              <div className="w-full h-full bg-black/20 flex items-center justify-center">
                <Link href="/map">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    Open Kaart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Prijzen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Basis</h3>
                <div className="text-3xl font-bold mt-2">Gratis</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  <span>Zoek beschikbare plekken</span>
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  <span>Basis chat functionaliteit</span>
                </li>
              </ul>
              <Button className="w-full">Start Gratis</Button>
            </Card>

            <Card className="p-6 border-2 border-green-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                Populair
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Premium</h3>
                <div className="text-3xl font-bold mt-2">€4.99/maand</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  <span>Prioriteit in zoekresultaten</span>
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  <span>Geavanceerde chat features</span>
                </li>
                <li className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                  <span>Geen transactiekosten</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Kies Premium
              </Button>
            </Card>

            <Card className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Zakelijk</h3>
                <div className="text-3xl font-bold mt-2">€19.99/maand</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  <span>Meerdere locaties beheren</span>
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  <span>Team toegang</span>
                </li>
                <li className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                  <span>Analytics & rapportages</span>
                </li>
              </ul>
              <Button className="w-full">Contact Opnemen</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Terrasspotter</h4>
              <p className="text-gray-400">
                Vind en deel de beste terrasplekken in Nederland
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hoe het werkt</li>
                <li>Prijzen</li>
                <li>Voor Bedrijven</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@terrasspotter.nl</li>
                <li>020 - 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2024 Terrasspotter. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>
    </div>
  );
}