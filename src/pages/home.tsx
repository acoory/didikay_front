import React from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Calendar } from "lucide-react";
import ImageCarousel from "../components/ImageCarousel";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">KAYDIDI</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">Hairstylist & Lockticienne</p>
          <button
            onClick={() => navigate("/reservation")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Réserver maintenant
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Réalisations</h2>
          <ImageCarousel />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Notre Histoire</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Depuis 2010, notre salon s'engage à offrir des services de coiffure exceptionnels dans une ambiance chaleureuse et accueillante. Notre équipe de
              professionnels passionnés combine expertise technique et créativité pour révéler votre beauté naturelle.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nous Contacter</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-gray-600">123 Rue de la Coiffure, 75001 Paris</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">01 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@salondecoiffure.fr</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="h-[300px] bg-gray-200 rounded-lg">
              {/* Map placeholder - Would be replaced with actual map integration */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">Carte Interactive</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
