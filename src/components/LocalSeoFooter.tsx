import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { cities } from "../data/localSeoData";
import prestationService from "../services/prestationService";

interface LocalSeoFooterProps {
  currentCity?: string;
  currentService?: string;
}

export const LocalSeoFooter: React.FC<LocalSeoFooterProps> = ({ currentCity, currentService }) => {
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const [mainServices, setMainServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const response = await prestationService.getPrestations();
        // Extraire toutes les sous-prestations de toutes les prestations
        const allSubPrestations: any[] = [];
        response.data.prestation.forEach((prestation: any) => {
          if (prestation.subprestations) {
            prestation.subprestations.forEach((subPrestation: any) => {
              // Extraire tous les services de cette sous-prestation
              const services = subPrestation.services?.map((srv: any) => {
                // Vérifier si le service a des variantes de prix
                const priceVariants = srv.price_variants || [];
                let minPrice = srv.price || "0.00";
                let hasVariants = false;

                if (priceVariants.length > 0) {
                  // Calculer le prix minimum parmi les variantes
                  const prices = priceVariants.map((variant: any) => parseFloat(variant.price || "0"));
                  minPrice = Math.min(...prices).toString();
                  hasVariants = true;
                }

                return {
                  id: srv.id,
                  name: srv.name,
                  description: srv.description || "",
                  price: minPrice,
                  hasVariants: hasVariants,
                  duration: srv.duration_minutes || 0,
                };
              }) || [];

              allSubPrestations.push({
                id: subPrestation.id,
                name: subPrestation.name,
                slug: subPrestation.name.toLowerCase().replace(/[\s/]+/g, "-"),
                description: subPrestation.description || "",
                services: services,
                category: prestation.name.toLowerCase(),
              });
            });
          }
        });
        setMainServices(allSubPrestations);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des prestations:", error);
        setLoading(false);
      }
    };

    fetchPrestations();
  }, []);

  const toggleAllCities = () => {
    setAllExpanded((prev) => !prev);
  };
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prestations par ville */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-[#e86126]">Nos prestations par ville</h3>
          <p className="text-sm text-gray-600 mb-4">Cliquez sur n'importe quelle ville pour voir tous les services de toutes les villes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city) => {
              const isExpanded = allExpanded;
              return (
                <div key={city.slug} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-3 cursor-pointer hover:bg-gray-50 transition-colors" onClick={toggleAllCities}>
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900">
                        <Link to={`/${city.slug}`} className="hover:text-[#e86126] transition-colors" onClick={(e) => e.stopPropagation()}>
                          {city.name}
                        </Link>
                      </h4>
                      <div className="text-gray-500 ml-2">
                        <svg className={`w-4 h-4 transform transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {!isExpanded && <div className="mt-2 text-xs text-gray-500">{mainServices.length} services disponibles</div>}
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-5 ${isExpanded ? "max-h-96 mt-3 overflow-y-auto" : "max-h-0"}`}>
                    <div className="space-y-1 pb-3">
                      {mainServices.map((service) => (
                        <Link
                          key={`${service.slug}-${city.slug}`}
                          to={`/${city.slug}/${service.slug.toLowerCase().replace(/[\s/]+/g, "-")}`}
                          className={`block text-sm hover:text-[#e86126] transition-colors ${
                            currentCity === city.slug && currentService === service.slug ? "text-[#e86126] font-medium" : "text-gray-600"
                          }`}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services par type de cheveux */}
        {loading ? (
          <div className="text-center py-8 text-gray-600">Chargement des services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Informations salon */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-[#e86126]">KAYDIDI Salon de Coiffure</h3>
              <p className="text-gray-600 mb-4">Spécialiste en coiffure afro, locks, braids et vanilles. Toutes textures de cheveux bienvenues.</p>
              <div className="text-sm text-gray-500 mb-4">
                <p>49 boulevard de Paris</p>
                <p>13002 Marseille</p>
              </div>

              {/* Réseaux sociaux */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 text-sm">Suivez-nous</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/_kaydidi_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#e86126] transition-colors"
                    aria-label="Suivez KAYDIDI sur Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="text-xs">@_kaydidi_</span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@diidiichewie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#e86126] transition-colors"
                    aria-label="Suivez KAYDIDI sur TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                    <span className="text-xs">@diidiichewie</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Afficher les 3 premiers groupes de services dynamiquement */}
            {[0, 1, 2].map((columnIndex) => {
              const servicesPerColumn = Math.ceil(mainServices.length / 3);
              const columnServices = mainServices.slice(columnIndex * servicesPerColumn, (columnIndex + 1) * servicesPerColumn).slice(0, 10); // Limiter à 10 services par colonne

              return (
                <div key={columnIndex} className="space-y-3">
                  <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-1">
                    {columnIndex === 0 ? "Nos Services" : columnIndex === 1 ? "Prestations" : "Spécialités"}
                  </h4>
                  <div className="space-y-1">
                    {columnServices.map((service) => (
                      <div key={service.id} className="text-sm text-gray-600">
                        {service.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Ligne de séparation */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">© 2024 KAYDIDI Salon de Coiffure. Tous droits réservés.</div>
            <div className="flex space-x-6 text-sm">
              <Link to="/" className="text-gray-600 hover:text-[#e86126] transition-colors">
                Accueil
              </Link>
              <Link to="/reservation" className="text-gray-600 hover:text-[#e86126] transition-colors">
                Réserver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
