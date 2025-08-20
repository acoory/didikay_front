import React from 'react';
import { ServiceLocalPage } from '../../components/ServiceLocalPage';

export default function TwistAixEnProvence() {
  return (
    <ServiceLocalPage
      serviceName="Twist"
      serviceSlug="twist"
      cityName="Aix-en-Provence"
      citySlug="aix-en-provence"
      cityDistance="30 km"
      cityDescription="Facilement accessible depuis Aix-en-Provence, nous accueillons nos clients aixois dans notre salon marseillais."
      serviceDescription="Méthode de départ réalisée au peigne en tournant les mèches sur elles-mêmes. La structure se forme et évolue avec le temps et l'entretien."
      price="80"
      duration={180}
      category="départ-locks"
    />
  );
}
