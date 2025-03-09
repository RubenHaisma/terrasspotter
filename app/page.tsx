"use client";

import { MapPin, Users, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80"
            alt="Terrace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
                Vind Je Perfecte Terrasplekje in Seconden
              </h1>
              <p className="text-xl sm:text-2xl text-white/90">
                Ontdek, reserveer en geniet van de beste terrassen in Nederland
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/map">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg h-14 px-8">
                  Vind een Plek
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-lg h-14 px-8">
                  Bied Je Plek Aan
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 text-white" viewBox="0 0 1440 74" fill="none">
            <path d="M0 74L1440 0V74H0Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Hoe Het Werkt
            </h2>
            <p className="text-xl text-gray-600">
              In drie simpele stappen naar jouw perfecte terrasmoment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ontdek</h3>
              <p className="text-gray-600">
                Bekijk beschikbare terrasplekken op onze interactieve kaart en vind de perfecte locatie
              </p>
            </div>

            <div className="relative">
              <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reserveer</h3>
              <p className="text-gray-600">
                Direct contact met de aanbieder en reserveer je plek binnen enkele minuten
              </p>
            </div>

            <div className="relative">
              <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Geniet</h3>
              <p className="text-gray-600">
                Arriveer op de afgesproken tijd en geniet van je gereserveerde terrasmoment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Wat Mensen Zeggen
            </h2>
            <p className="text-xl text-gray-600">
              Ervaringen van tevreden gebruikers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Lisa van der Berg",
                role: "Terrasliefhebber",
                content: "Perfect voor spontane terrasbezoeken! Binnen 5 minuten had ik een geweldige plek gevonden.",
                rating: 5
              },
              {
                name: "Mark de Vries",
                role: "Regelmatige gebruiker",
                content: "Ideaal systeem voor het vinden van een terrasje, vooral tijdens drukke zomerdagen.",
                rating: 5
              },
              {
                name: "Sophie Jansen",
                role: "Horecaondernemer",
                content: "Als aanbieder van terrasplekken is dit platform een uitkomst. Simpel en effectief!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Klaar om de perfecte terrasplekje te vinden?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join duizenden anderen die al genieten van zorgeloze terrasmomenten
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg h-14 px-8">
                Start Nu Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">Terrasspotter</span>
              </div>
              <p className="text-gray-400">
                De slimste manier om terrasplekken te vinden en delen in Nederland
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/map" className="hover:text-white transition-colors">
                    Zoek Plekken
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    Word Aanbieder
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Over Ons
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@terrasspotter.nl</li>
                <li>020 - 123 4567</li>
                <li>Amsterdam, Nederland</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Terrasspotter. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}