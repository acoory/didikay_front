
import { useParams } from 'react-router';
import { ServiceLocalPage } from '../../components/ServiceLocalPage';
import { cities, mainServices } from '../../data/localSeoData';
import NotFound from '../NotFound';

export default function ServiceCityPage() {
  const { city, service } = useParams<{ city: string; service: string }>();
  
  if (!city || !service) {
    return <NotFound />;
  }

  // Trouve la ville et le service correspondants
  // Structure: /marseille/twist ou /aix-en-provence/vanille
  const cityData = cities.find(c => c.slug === city);
  const serviceData = mainServices.find(s => s.slug === service);

  if (!serviceData || !cityData) {
    return <NotFound />;
  }

  return (
    <ServiceLocalPage
      serviceName={serviceData.name}
      serviceSlug={serviceData.slug}
      cityName={cityData.name}
      citySlug={cityData.slug}
      cityDistance={cityData.distance}
      cityDescription={cityData.description}
      serviceDescription={serviceData.description}
      price={serviceData.price}
      duration={serviceData.duration}
      category={serviceData.category}
    />
  );
}
