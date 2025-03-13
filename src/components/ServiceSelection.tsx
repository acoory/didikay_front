import React from "react";
import { Prestation, BookingSelection } from "../types/booking";
import { ChevronRight } from "lucide-react";
import moment from "moment";

interface ServiceSelectionProps {
  services: Prestation[];
  selection: BookingSelection;
  onSelect: (selection: BookingSelection) => void;
  setDevis: any;
  devis: any;
}

export function ServiceSelection({ services, selection, onSelect, setDevis, devis }: ServiceSelectionProps) {
  const handlePrestationSelect = (prestationId: number) => {
    onSelect({
      prestationId,
      subPrestationSelections: {},
      selectedDate: null,
      selectedTime: null,
    });
  };

  const handleServiceSelect = (prestationId: number, subPrestationId: number, serviceId: number) => {
    onSelect({
      ...selection,
      prestationId,
      subPrestationSelections: {
        ...selection.subPrestationSelections,
        [subPrestationId]: serviceId,
      },
    });
  };

  const minutesToHours = (totalDuration: number) => {
    const duration = moment.duration(totalDuration, "minutes");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    if (hours > 0 && minutes > 0) {
      return `${hours}h${minutes.toString().padStart(2, "0")}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}min`;
    }
  };

  if (!selection.prestationId) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((prestation) => (
          <button
            key={prestation.id}
            onClick={() => {
              handlePrestationSelect(prestation.id);
              setDevis([]);
            }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800">
              <h3 className="text-2xl font-semibold text-white">{prestation.name}</h3>
            </div>
            <div className="p-4 flex items-center justify-between text-gray-600">
              <span>Voir les services</span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </button>
        ))}
      </div>
    );
  }

  const selectedPrestation = services.find((s) => s.id === selection.prestationId);
  if (!selectedPrestation) return null;

  console.log(selectedPrestation);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">{selectedPrestation.name}</h3>
        <button onClick={() => handlePrestationSelect(0)} className="text-purple-600 hover:text-purple-800 font-medium">
          Changer de prestation
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 space-y-6">
          {selectedPrestation.subprestations.map((subPrestation) => (
            <div key={subPrestation.id} className="space-y-2">
              <h4 className="font-medium text-gray-700">{subPrestation.name}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subPrestation.services
                  .sort((a: any, b: any) => a?.price - b?.price)
                  .map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        console.log("subPrestationLength", selectedPrestation.subprestations.length);
                        console.log("SubPrestation", selectedPrestation.subprestations);
                        setDevis((prevDevis: any) => {
                          const exists = prevDevis.some((item: any) => item.subprestation_id === service.subprestation_id);

                          if (exists) {
                            return prevDevis.map((item: any) => (item.subprestation_id === service.subprestation_id ? service : item));
                          } else {
                            return [...prevDevis, service];
                          }
                        });

                        handleServiceSelect(selectedPrestation.id, subPrestation.id, service.id);
                      }}
                      className={`flex flex-col gap-2 items-center justify-between p-3 rounded-lg border transition-all ${
                        selection.subPrestationSelections[subPrestation.id] === service.id
                          ? "bg-purple-50 border-purple-500 text-purple-700"
                          : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center space-x-2 justify-center">
                          <span className="font-medium">{service.name}</span>
                          <span className="text-sm text-gray-500">{minutesToHours(service.duration_minutes)}</span>
                        </div>

                        {service.description && <span className="text-xs text-gray-400">{service.description}</span>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{service.price}€</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
