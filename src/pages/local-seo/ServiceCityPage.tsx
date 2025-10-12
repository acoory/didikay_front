import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ServiceLocalPage } from "../../components/ServiceLocalPage";
import { cities } from "../../data/localSeoData";
import prestationService from "../../services/prestationService";
import NotFound from "../NotFound";

export default function ServiceCityPage() {
  const { city, service } = useParams<{ city: string; service: string }>();
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!city || !service) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const response = await prestationService.getPrestations();
        // Extraire toutes les sous-prestations de toutes les prestations
        console.log(response.data);

        const allSubPrestations: any[] = [];
        response.data.prestation.forEach((prestation: any) => {
          if (prestation.subprestations) {
            prestation.subprestations.forEach((subPrestation: any) => {
              // Extraire tous les services de cette sous-prestation
              const services =
                subPrestation.services?.map((srv: any) => {
                  // Vérifier si le service a des variantes de prix
                  const priceVariants = srv.priceVariants || [];
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
                services: services, // Tous les services avec leurs prix
                category: prestation.name.toLowerCase(),
              });
            });
          }
        });

        // Chercher le service correspondant
        const foundService = allSubPrestations.find((s) => s.slug === service);

        if (!foundService) {
          setNotFound(true);
        } else {
          setServiceData(foundService);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du service:", error);
        setNotFound(true);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [city, service]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e86126] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!city || !service || notFound || !serviceData) {
    return <NotFound />;
  }

  // Trouve la ville correspondante
  const cityData = cities.find((c) => c.slug === city);

  if (!cityData) {
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
      services={serviceData.services}
      category={serviceData.category}
    />
  );
}
