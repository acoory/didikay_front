import React from "react";
import { Prestation, BookingSelection } from "../types/booking";
import { ChevronRight, Clock, CheckCircle, Tags } from "lucide-react";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {services.map((prestation) => (
          <button
            key={prestation.id}
            onClick={() => {
              handlePrestationSelect(prestation.id);
              setDevis([]);
            }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <div className="p-6 bg-gradient-to-r from-[#e86126] to-[#ec7f2b] relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <h3 className="text-2xl font-semibold text-white">{prestation.name}</h3>
            </div>
            <div className="p-4 flex items-center justify-between text-gray-600 group-hover:text-[#e86126] transition-colors duration-300">
              <span>Voir les services</span>
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
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
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <span className="bg-[#fdeae1] p-2 rounded-full mr-2 text-[#e86126]">
              <CheckCircle className="h-5 w-5" />
            </span>
            {selectedPrestation.name}
          </h3>
          <button 
            onClick={() => handlePrestationSelect(0)} 
            className="flex items-center text-[#e86126] hover:text-[#ec7f2b] font-medium transition-colors duration-200 bg-[#fdeae1] hover:bg-[#ec7f2b26] px-3 py-2 rounded-lg"
          >
            Changer
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 space-y-6">
            {selectedPrestation.subprestations.map((subPrestation) => (
                <div key={subPrestation.id} className="space-y-3">
                  <h4 className="font-medium text-gray-700 flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e86126] mr-2"></span>
                    {subPrestation.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subPrestation.services
                        .sort((a: any, b: any) => a?.price - b?.price)
                        .map((service) => {
                          const isSelected = selection.subPrestationSelections[subPrestation.id] === service.id;
                          return (
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
                                className={`flex flex-col gap-2 p-4 rounded-lg border transition-all duration-200 relative ${
                                    isSelected
                                        ? "bg-[#ec7f2b26] border-[#e86126] shadow-sm"
                                        : "border-gray-200 hover:border-[#ec7f2b] hover:bg-[#ec7f2b10]"
                                }`}
                            >
                              {isSelected && (
                                <div className="absolute top-3 right-3 text-[#e86126]">
                                  <CheckCircle className="h-5 w-5" />
                                </div>
                              )}
                              <div className="flex flex-col">
                                <div className="flex flex-row items-start justify-between">
                                  <span className="font-medium text-black text-left">{service.name}</span>
                                </div>

                                <div className="flex items-center space-x-2 mt-1">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-500">{minutesToHours(service.duration_minutes)}</span>
                                </div>

                                {service.description && (
                                  <span className="text-xs text-gray-400 mt-2 line-clamp-2">{service.description}</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-dashed border-gray-200">
                                <Tags className="w-4 h-4 text-[#e86126]" />
                                <span className="font-semibold text-[#e86126]">{service.price}€</span>
                              </div>
                            </button>
                          );
                        })}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>

  );
}
