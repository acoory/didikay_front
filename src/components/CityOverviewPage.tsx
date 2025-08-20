import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { MapPin, Clock, Euro, Star, Phone, Calendar, Scissors } from 'lucide-react';
import { LocalSeoFooter } from './LocalSeoFooter';
import { mainServices, salonInfo, formatDuration } from '../data/localSeoData';

interface CityOverviewPageProps {
  cityName: string;
  citySlug: string;
  cityDistance: string;
  cityPopulation: string;
  cityDescription: string;
}

export const CityOverviewPage: React.FC<CityOverviewPageProps> = ({
  cityName,
  citySlug,
  cityDistance,
  cityPopulation,
  cityDescription
}) => {
  const pageTitle = `Coiffeur spécialisé ${cityName} | KAYDIDI Salon Marseille`;
  const metaDescription = `Salon de coiffure spécialisé locks, braids, vanilles près de ${cityName}. Expert cheveux afro, crépus, bouclés. Réservation en ligne.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`coiffeur ${cityName}, salon coiffure afro ${cityName}, locks ${cityName}, braids ${cityName}, vanilles ${cityName}, Marseille`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            "name": salonInfo.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "49 boulevard de Paris",
              "addressLocality": "Marseille",
              "postalCode": "13002",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.3139",
              "longitude": "5.3742"
            },
            "telephone": salonInfo.phone,
            "email": salonInfo.email,
            "openingHours": "Mo-Sa 09:00-19:00",
            "priceRange": "€€",
            "servedArea": [cityName, "Marseille"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de coiffure",
              "itemListElement": mainServices.map(service => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.name,
                  "description": service.description
                },
                "price": service.price,
                "priceCurrency": "EUR"
              }))
            }
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="KAYDIDI" className="h-10 w-10" />
              <span className="text-xl font-bold text-gray-900">KAYDIDI</span>
            </Link>
            <Link
              to="/reservation"
              className="inline-flex items-center px-4 py-2 bg-[#e86126] text-white font-medium rounded-lg hover:bg-[#ec7f2b] transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Réserver
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[#e86126]">Accueil</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Coiffeur {cityName}</span>
        </nav>

        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coiffeur spécialisé près de {cityName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            KAYDIDI, votre salon de coiffure expert en locks, braids, vanilles et coiffures protectrices. 
            Basé à Marseille, nous accueillons les clients de {cityName}.
          </p>
        </div>

        {/* Informations ville */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#e86126] p-3 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance</p>
                <p className="font-semibold text-lg">{cityDistance} de Marseille</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-[#e86126] p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Population</p>
                <p className="font-semibold text-lg">{cityPopulation}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-[#e86126] p-3 rounded-full">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Prestations</p>
                <p className="font-semibold text-lg">{mainServices.length}+ services</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Votre salon de coiffure proche de {cityName}
            </h2>
            <p className="text-gray-700 mb-6">
              {cityDescription}
            </p>
            
            {/* Spécialités */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Nos spécialités
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {salonInfo.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-[#e86126]" />
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grille des services */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Nos prestations pour les clients de {cityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service) => {
              const durationText = formatDuration(service.duration);

              return (
                <Link
                  key={service.id}
                  to={`/${citySlug}/${service.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#e86126] transition-colors">
                      {service.name}
                    </h3>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#e86126]">
                        {service.price}€
                      </p>
                      <p className="text-sm text-gray-500">
                        {durationText}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm text-[#e86126]">
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#e86126] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Prêt(e) à prendre rendez-vous depuis {cityName} ?
          </h2>
          <p className="text-lg mb-6">
            Réservez dès maintenant votre prestation dans notre salon marseillais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservation"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#e86126] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Réserver en ligne
            </Link>
            <a
              href={`tel:${salonInfo.phone}`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#e86126] transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Nous contacter
            </a>
          </div>
        </div>
      </main>

      <LocalSeoFooter currentCity={citySlug} />
    </div>
  );
};
