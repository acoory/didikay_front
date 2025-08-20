import React from 'react';
import { useParams } from 'react-router';
import { CityOverviewPage } from '../../components/CityOverviewPage';
import { cities } from '../../data/localSeoData';
import NotFound from '../NotFound';

export default function CityPage() {
  const { slug, city } = useParams<{ slug?: string; city?: string }>();
  
  // Détermine le slug de la ville selon la route
  let citySlug = '';
  
  if (slug) {
    // Route "/coiffeur-ville" 
    citySlug = slug.replace('coiffeur-', '');
  } else if (city) {
    // Route "/ville"
    citySlug = city;
  } else {
    return <NotFound />;
  }

  const cityData = cities.find(c => c.slug === citySlug);

  if (!cityData) {
    return <NotFound />;
  }

  return (
    <CityOverviewPage
      cityName={cityData.name}
      citySlug={cityData.slug}
      cityDistance={cityData.distance}
      cityPopulation={cityData.population}
      cityDescription={cityData.description}
    />
  );
}
