import React, { useState } from "react";
import { Prestation, BookingSelection, PriceVariant } from "../types/booking";
import { ChevronRight, Clock, Euro, Info } from "lucide-react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceSelectionProps {
  services: Prestation[];
  selection: BookingSelection;
  onSelect: (selection: BookingSelection) => void;
  setDevis: any;
  devis: any;
}

export function ServiceSelection({ services, selection, onSelect, setDevis, devis }: ServiceSelectionProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});

  const handlePrestationSelect = (prestationId: number) => {
    onSelect({
      prestationId,
      subPrestationSelections: {},
      selectedDate: null,
      selectedTime: null,
    });
    setSelectedVariants({});
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

  const handlePriceVariantSelect = (prestationId: number, subPrestationId: number, serviceId: number, variant: PriceVariant) => {
    const selectedService = services.find((s) => s.id === prestationId)?.subprestations
      .find(sub => sub.id === subPrestationId)
      ?.services.find(s => s.id === serviceId);

    if (!selectedService) return;

    const isSelected = selectedVariants[serviceId] === variant.id;

    if (isSelected) {
      // Désélectionner la variante
      const newSelectedVariants = { ...selectedVariants };
      delete newSelectedVariants[serviceId];
      setSelectedVariants(newSelectedVariants);

      const newSubPrestationSelections = { ...selection.subPrestationSelections };
      delete newSubPrestationSelections[subPrestationId];
      onSelect({
        ...selection,
        subPrestationSelections: newSubPrestationSelections
      });

      setDevis((prevDevis: any) => 
        prevDevis.filter((item: any) => item.subprestation_id !== subPrestationId)
      );
    } else {
      // Désélectionner toutes les autres variantes de la même catégorie
      const newSubPrestationSelections = { ...selection.subPrestationSelections };
      Object.keys(newSubPrestationSelections).forEach((key: any) => {
        if (key !== subPrestationId.toString()) {
          delete newSubPrestationSelections[key];
        }
      });

      // Réinitialiser les variantes sélectionnées sauf celle qu'on vient de choisir
      setSelectedVariants({ [serviceId]: variant.id });

      // Mettre à jour la sélection
      onSelect({
        ...selection,
        subPrestationSelections: {
          [subPrestationId]: serviceId
        }
      });

      // Mettre à jour le devis avec uniquement le nouveau service
      setDevis([{
        ...selectedService,
        price: variant.price,
        duration_minutes: variant.duration,
        subprestation_id: subPrestationId
      }]);
    }
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
          if (service.priceVariants && service.priceVariants.length > 0 && selectedVariants[service.id]) {
            const selectedVariant = service.priceVariants.find(v => v.id === selectedVariants[service.id]);
            if (selectedVariant) {
              selectedServices.push({
                ...service,
                price: selectedVariant.price,
                duration_minutes: selectedVariant.duration
              });
              return;
            }
          }
          selectedServices.push(service);
        }
      }
    });

    return selectedServices;
  };

  if (!selection.prestationId) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {services.map((prestation, index, prestationsArray) => (
          <motion.button
            key={prestation.id}
            onClick={() => {
              handlePrestationSelect(prestation.id);
              setDevis([]);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
              prestationsArray.length % 2 !== 0 && index === prestationsArray.length - 1
                ? "md:col-span-2"
                : ""
            }`}
          >
            <div className="p-8 bg-gradient-to-r from-[#e86126] to-[#ec7f2b]">
              <h3 className="text-3xl font-bold text-white text-center">{prestation.name}</h3>
            </div>
            <div className="p-6 flex items-center justify-between text-gray-600 bg-gray-50">
              <span className="font-medium">Découvrir les services</span>
              <ChevronRight className="h-6 w-6" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    );
  }

  const selectedPrestation = services.find((s) => s.id === selection.prestationId);
  if (!selectedPrestation) return null;

  console.log(selectedPrestation);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold text-gray-900">{selectedPrestation.name}</h3>
          <span className="px-3 py-1 bg-[#ec7f2b26] text-[#e86126] rounded-full text-sm font-medium">
            {selectedPrestation.subprestations.length} catégories
          </span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePrestationSelect(0)} 
          className="text-[#e86126] hover:text-[#ec7f2b] font-medium flex items-center space-x-2"
        >
          <span>Changer de prestation</span>
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-8">
          {selectedPrestation.subprestations.sort((a:any,b:any) => a.order_index - b.order_index).map((subPrestation, index) => (
            <motion.div 
              key={subPrestation.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-gray-900">{subPrestation.name}</h4>
                <span className="text-sm text-gray-500">
                  {subPrestation.services.length} services disponibles
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subPrestation.services
                  .sort((a: any, b: any) => a?.price - b?.price)
                  .map((service, serviceIndex, servicesArray) => (
                    <motion.div 
                      key={service.id} 
                      className={`space-y-3 bg-gray-50 p-4 rounded-xl ${
                        servicesArray.length % 2 !== 0 && serviceIndex === servicesArray.length - 1
                          ? "sm:col-span-2"
                          : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col   justify-between">
                        <div className="flex items-start mt-[10px] space-x-2">
                          <span className="flex flex-col gap-1 font-semibold text-gray-900">{service.name}
                          <div className="flex items-center text-[#e86126] font-semibold">
                          {/* <Euro className="h-4 w-4 mr-1" /> */}
                          {service.priceVariants && service.priceVariants.length > 0 ? (
                            <>
                              <span className="text-sm mr-1">à partir de</span>
                              {Math.min(...service.priceVariants.map(v => parseFloat(v.price)))}€
                            </>
                          ) : (
                            `${service.price}€`
                          )}
                        </div>
                          </span>
                          <div
                          style={{
                            marginRight: "10px",
                            marginTop: "3px"
                          }}
                           className="flex items-center text-sm text-gray-500">
                           {service.priceVariants.length > 0 ? "" : <>
                            <Clock className="h-4 w-4 mr-1" />
                            {minutesToHours(service.duration_minutes)}</>}
                          </div>
                        </div>
                        <div className="flex items-center text-[#e86126] font-semibold">
                          {/* <Euro className="h-4 w-4 mr-1" /> */}
                          {/* {service.priceVariants && service.priceVariants.length > 0 ? (
                            <>
                              <span className="text-sm mr-1">à partir de</span>
                              {Math.min(...service.priceVariants.map(v => parseFloat(v.price)))}€
                            </>
                          ) : (
                            `${service.price}€`
                          )} */}
                        </div>
                      </div>

                      {service.description && (
                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{service.description}</span>
                        </div>
                      )}

                      <div className="space-y-2 pt-2">
                        {(!service.priceVariants || service.priceVariants.length === 0) ? (
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              const isSelected = selection.subPrestationSelections[subPrestation.id] === service.id;
                              
                              if (isSelected) {
                                // Désélectionner le service
                                const newSubPrestationSelections = { ...selection.subPrestationSelections };
                                delete newSubPrestationSelections[subPrestation.id];
                                
                                onSelect({
                                  ...selection,
                                  subPrestationSelections: newSubPrestationSelections
                                });
                                
                                setDevis((prevDevis: any) => 
                                  prevDevis.filter((item: any) => item.subprestation_id !== service.subprestation_id)
                                );
                              } else {
                                // Sélectionner le service et réinitialiser les variantes
                                setSelectedVariants({});
                                setDevis((prevDevis: any) => {
                                  if (prevDevis.some((item: any) => item.subprestation_id === service.subprestation_id)) {
                                    return prevDevis.map((item: any) => 
                                      item.subprestation_id === service.subprestation_id ? service : item
                                    );
                                  }
                                  return [...prevDevis, service];
                                });
                                handleServiceSelect(selectedPrestation.id, subPrestation.id, service.id);
                              }
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                              selection.subPrestationSelections[subPrestation.id] === service.id
                                ? "bg-[#ec7f2b26] border-[#e86126] text-[#e86126]"
                                : "border-gray-200 hover:border-[#ec7f2b] hover:bg-[#ec7f2b26]"
                            }`}
                          >
                            <span className="font-medium">
                              {selection.subPrestationSelections[subPrestation.id] === service.id ? "Désélectionner" : "Sélectionner"}
                            </span>
                            <ChevronRight className="h-5 w-5" />
                          </motion.button>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            {service.priceVariants.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price)).map((variant:any) => (
                              <motion.button
                                key={variant.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handlePriceVariantSelect(selectedPrestation.id, subPrestation.id, service.id, variant)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                  selectedVariants[service.id] === variant.id
                                    ? "bg-[#ec7f2b26] border-[#e86126] text-[#e86126]"
                                    : "border-gray-200 hover:border-[#ec7f2b] hover:bg-[#ec7f2b26]"
                                }`}
                              >
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">{variant.name}</span>
                                  {variant.description && (
                                    <span className="text-sm text-gray-500 text-left">{variant.description}</span>
                                  )}
                                </div>
                                <div className="flex flex-row md:flex-row items-center space-x-3">
                                  <div className="flex flex-col md:flex-row items-center space-x-3">

                                  <span className="font-semibold">{variant.price}€</span>
                                  <span className="text-sm text-gray-500">{minutesToHours(variant.duration)}</span>
                                  </div>
                                  <ChevronRight className="h-5 w-5" />
                                </div>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
