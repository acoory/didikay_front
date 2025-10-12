import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { MapPin, Clock, Euro, Star, Phone, Calendar } from "lucide-react";
import { LocalSeoFooter } from "./LocalSeoFooter";
import { generateFAQ, salonInfo, formatDuration } from "../data/localSeoData";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  hasVariants?: boolean;
  duration: number;
}

interface ServiceLocalPageProps {
  serviceName: string;
  serviceSlug: string;
  cityName: string;
  citySlug: string;
  cityDistance: string;
  cityDescription: string;
  serviceDescription: string;
  services: Service[];
  category: string;
}

export const ServiceLocalPage: React.FC<ServiceLocalPageProps> = ({
  serviceName,
  serviceSlug,
  cityName,
  citySlug,
  cityDistance,
  cityDescription,
  serviceDescription,
  services,
  category,
}) => {
  // Calculer le prix minimum et la durée moyenne
  const minPrice = services.length > 0 ? Math.min(...services.map((s) => parseFloat(s.price))) : 0;
  const avgDuration = services.length > 0 ? Math.round(services.reduce((acc, s) => acc + s.duration, 0) / services.length) : 0;

  const faq = generateFAQ(serviceName, cityName, minPrice.toString(), avgDuration);
  const pageTitle = `${serviceName} à ${cityName} | KAYDIDI Salon de Coiffure Marseille`;
  const metaDescription = `${serviceName} professionnel près de ${cityName} chez KAYDIDI. Spécialiste coiffure afro, locks, braids. À partir de ${minPrice}€. Réservation en ligne.`;

  const durationText = formatDuration(avgDuration);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${serviceName}, ${cityName}, coiffure afro, locks, braids, vanilles, Marseille, coiffeur spécialisé`} />

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
            name: salonInfo.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: "49 boulevard de Paris",
              addressLocality: "Marseille",
              postalCode: "13002",
              addressCountry: "FR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "43.3139",
              longitude: "5.3742",
            },
            telephone: salonInfo.phone,
            email: salonInfo.email,
            openingHours: "Mo-Sa 09:00-19:00",
            priceRange: "€€",
            servedArea: [cityName, "Marseille"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: serviceName,
              itemListElement: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: serviceName,
                  description: serviceDescription,
                },
                price: minPrice.toString(),
                priceCurrency: "EUR",
              },
            },
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
              to={`/reservation?subcategory=${encodeURIComponent(category.toLowerCase())}&service=${serviceSlug.toLocaleLowerCase()}`}
              className="inline-flex items-center px-4 py-2 bg-[#e86126] text-white font-medium rounded-lg hover:bg-[#ec7f2b] transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Réserver
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[#e86126]">
            Accueil
          </Link>
          <span className="mx-2">›</span>
          <Link to={`/${citySlug}`} className="hover:text-[#e86126]">
            {cityName}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{serviceName}</span>
        </nav>

        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {serviceName} {cityName === "Marseille" ? "à Marseille" : `vers ${cityName}`}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Salon de coiffure spécialisé en {serviceName.toLowerCase()} à Marseille, nous accueillons chaleureusement les clients de {cityName}.
          </p>
          <p className="text-md text-gray-600 max-w-3xl mx-auto mt-4">
            {/* adresse */}
            49 boulevard de Paris, 13002 Marseille
          </p>
        </div>

        {/* Informations principales */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-[#e86126] p-3 rounded-full">
                <Euro className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Prix</p>
                <p className="font-semibold text-lg">À partir de {minPrice}€</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#e86126] p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Durée moyenne</p>
                <p className="font-semibold text-lg">{durationText}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#e86126] p-3 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance depuis {cityName}</p>
                <p className="font-semibold text-lg">{cityDistance}</p>
              </div>
            </div>
          </div>

          {/* Liste de tous les services disponibles */}
          {services.length > 0 && (
            <div className="border-t pt-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nos services {serviceName}</h3>
              <div className="flex flex-col gap-2">
                {services.map((service) => (
                  <div key={service.id} className="bg-gray-50 rounded-lg p-1 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900 text-[14px]">{service.name}</p>
                      <div className="flex flex-row items-center space-x-2">
                        {service.hasVariants && <p className="text-[#e86126] font-bold">À partir de {service.price}€, selon la longueur</p>}
                        {!service.hasVariants && <p className="text-[#e86126] font-bold">{service.price}€</p>}
                      </div>
                    </div>
                    {/* {service.description && (
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    )} */}
                    {/* <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(service.duration)}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description locale */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Votre spécialiste {serviceName} près de {cityName}
            </h2>
            <p className="text-gray-700 mb-4">{cityDescription}</p>
            <p className="text-gray-700 mb-6">{serviceDescription}</p>

            {/* Spécialisation cheveux */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Adapté à toutes les textures de cheveux</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {salonInfo.hairTypes.map((hairType, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-[#e86126]" />
                    <span className="text-sm text-gray-700">{hairType}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#e86126] rounded-lg p-8 text-center text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Réservez dès maintenant votre {serviceName} à {cityName}
          </h2>
          <p className="text-lg mb-6">Notre salon à Marseille vous accueille dans un cadre professionnel et chaleureux</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/reservation?subcategory=${encodeURIComponent(category.toLowerCase())}&service=${serviceSlug.toLocaleLowerCase()}`}
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
              Appeler maintenant
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Questions fréquentes - {serviceName} {cityName}
          </h2>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-medium text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <LocalSeoFooter currentCity={citySlug} currentService={serviceSlug} />
    </div>
  );
};
