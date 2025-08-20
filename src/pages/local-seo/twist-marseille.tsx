import React from 'react';
import { ServiceLocalPage } from '../../components/ServiceLocalPage';

export default function TwistMarseille() {
  return (
    <ServiceLocalPage
      serviceName="Twist"
      serviceSlug="twist"
      cityName="Marseille"
      citySlug="marseille"
      cityDistance="0 km"
      cityDescription="Nous sommes situés au cœur de Marseille, 49 boulevard de Paris, 13002."
      serviceDescription="Méthode de départ réalisée au peigne en tournant les mèches sur elles-mêmes. La structure se forme et évolue avec le temps et l'entretien."
      price="80"
      duration={180}
      category="départ-locks"
    />
  );
}
