import React from "react";
import { Prestation, BookingSelection } from "../types/booking";
import { Clock, Euro } from "lucide-react";

interface BookingSummaryProps {
  services: Prestation[];
  selection: BookingSelection;
}

export function BookingSummary({ services, selection }: BookingSummaryProps) {
  const getSelectedServices = () => {
    if (!selection.prestationId) return [];

    const selectedServices: Array<{
      name: string;
      price: string;
      duration_minutes: number;
      description: string;
    }> = [];

    const selectedPrestation = services.find((p) => p.id === selection.prestationId);
    if (!selectedPrestation) return [];

    selectedPrestation.subprestations.forEach((subPrestation) => {
      const selectedServiceId = selection.subPrestationSelections[subPrestation.id];
      if (selectedServiceId) {
        const service = subPrestation.services.find((s) => s.id === selectedServiceId);
        if (service) {
          selectedServices.push(service);
        }
      }
    });

    return selectedServices;
  };

  const selectedServices = getSelectedServices();
  const totalPrice = selectedServices.reduce((sum, service) => sum + parseFloat(service.price), 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration_minutes, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Récapitulatif de la réservation</h2>

      {selectedServices.length > 0 ? (
        <>
          <div className="space-y-4 mb-6">
            {selectedServices.map((service, index) => (
              <div key={index} className="flex justify-between items-start py-2 border-b">
                <div>
                  <span className="font-medium">{service.name}</span>
                  {service.description && <p className="text-sm text-gray-500">{service.description}</p>}
                </div>
                <span className="text-purple-600 font-semibold">{service.price}€</span>
              </div>
            ))}
          </div>

          {selection.selectedDate && selection.selectedTime && (
            <div className="mb-6 p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-800">📅 {formatDate(selection.selectedDate)}</p>
              <p className="font-medium text-purple-800">🕒 {selection.selectedTime}</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>Durée totale: {totalDuration} min</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Euro className="h-5 w-5 mr-2" />
              <span>Total: {totalPrice.toFixed(2)}€</span>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex items-center text-green-600 font-semibold ">
            <Euro className="h-5 w-5 mr-2" />
            <span>Acompte à régler: {(totalPrice > 50 ? totalPrice * 0.4 : 10).toFixed(2)}€</span>
          </div>
          <p className="text-sm text-gray-500">Le reste sera à payer sur place en espèce le jour du rendez-vous merci de prévoir la somme exacte</p>
        </>
      ) : (
        <p className="text-gray-500">Sélectionnez vos services pour voir le récapitulatif</p>
      )}
    </div>
  );
}
