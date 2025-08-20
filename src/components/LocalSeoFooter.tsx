import React, { useState } from 'react';
import { Link } from 'react-router';
import { cities, mainServices } from '../data/localSeoData';

interface LocalSeoFooterProps {
  currentCity?: string;
  currentService?: string;
}

export const LocalSeoFooter: React.FC<LocalSeoFooterProps> = ({ 
  currentCity, 
  currentService 
}) => {
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const toggleAllCities = () => {
    setAllExpanded(prev => !prev);
  };
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prestations par ville */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-[#e86126]">
            Nos prestations par ville
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Cliquez sur n'importe quelle ville pour voir tous les services de toutes les villes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city) => {
              const isExpanded = allExpanded;
              return (
                <div key={city.slug} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={toggleAllCities}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900">
                        <Link 
                          to={`/${city.slug}`}
                          className="hover:text-[#e86126] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {city.name}
                        </Link>
                      </h4>
                      <div className="text-gray-500 ml-2">
                        <svg 
                          className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {!isExpanded && (
                      <div className="mt-2 text-xs text-gray-500">
                        {mainServices.slice(0, 16).length} services disponibles
                      </div>
                    )}
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-5  ${
                    isExpanded ? 'max-h-96 mt-3' : 'max-h-0'
                  }`}>
                    <div className="space-y-1">
                      {mainServices.slice(0, 16).map((service) => (
                        <Link
                          key={`${service.slug}-${city.slug}`}
                          to={`/${city.slug}/${service.slug}`}
                          className={`block text-sm hover:text-[#e86126] transition-colors ${
                            currentCity === city.slug && currentService === service.slug
                              ? 'text-[#e86126] font-medium'
                              : 'text-gray-600'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informations salon */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-[#e86126]">
              KAYDIDI Salon de Coiffure
            </h3>
            <p className="text-gray-600 mb-4">
              Spécialiste en coiffure afro, locks, braids et vanilles. 
              Toutes textures de cheveux bienvenues.
            </p>
            <div className="text-sm text-gray-500">
              <p>49 boulevard de Paris</p>
              <p>13002 Marseille</p>
            </div>
          </div>

          {/* Services cheveux afro */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-1">
              Salon Cheveux Afro
            </h4>
            <div className="space-y-1">
              {['twist', 'vanille', 'braids', 'box-braids', 'cornrows', 'salon-cheveux-afro', 'coiffure-cheveux-crepus', 'coiffeur-afro', 'tresses-africaines', 'soin-cheveux-crepus'].map((serviceSlug) => {
                const service = mainServices.find(s => s.slug === serviceSlug);
                return service ? (
                  <div key={serviceSlug} className="text-sm text-gray-600">
                    {service.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Services cheveux bouclés et lisses */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-1">
              Cheveux Bouclés & Lisses
            </h4>
            <div className="space-y-1">
              {['coiffure-cheveux-boucles', 'coiffure-cheveux-lisses', 'defrisage', 'lissage-bresilien', 'coupe', 'coupe-enfant', 'soin-cheveux-boucles', 'cheveux-metisses'].map((serviceSlug) => {
                const service = mainServices.find(s => s.slug === serviceSlug);
                return service ? (
                  <div key={serviceSlug} className="text-sm text-gray-600">
                    {service.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Services spécialisés */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-1">
              Services Spécialisés
            </h4>
            <div className="space-y-1">
              {['micro-locks', 'faux-locks', 'locks-naturelles', 'passion-twist', 'knotless-braids', 'tissage', 'perruque', 'reprise-racines', 'entretien-locks', 'coiffure-protectrice'].map((serviceSlug) => {
                const service = mainServices.find(s => s.slug === serviceSlug);
                return service ? (
                  <div key={serviceSlug} className="text-sm text-gray-600">
                    {service.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 KAYDIDI Salon de Coiffure. Tous droits réservés.
            </div>
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
