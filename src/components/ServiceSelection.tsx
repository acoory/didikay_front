import React, { useState } from "react";
import { Prestation, BookingSelection, PriceVariant } from "../types/booking";
import { ChevronRight, Clock, Euro, Info, ChevronDown } from "lucide-react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceSelectionProps {
  services: Prestation[];
  selection: BookingSelection;
  onSelect: (selection: BookingSelection) => void;
  setDevis: any;
  devis: any;
  onResetPrestation?: () => void;
}

export function ServiceSelection({ services, selection, onSelect, setDevis, devis, onResetPrestation }: ServiceSelectionProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const [expandedSubPrestation, setExpandedSubPrestation] = useState<number | null>(null);

  // Fonction utilitaire pour obtenir une copie sécurisée des sélections
  const getSafeSelection = (currentSelection: BookingSelection) => {
    return {
      prestationId: currentSelection.prestationId,
      subPrestationSelections: {...currentSelection.subPrestationSelections},
      selectedDate: currentSelection.selectedDate,
      selectedTime: currentSelection.selectedTime,
      slot: currentSelection.slot
    };
  };

  const handlePrestationSelect = (prestationId: number) => {
    if (prestationId === 0 && onResetPrestation) {
      // Si l'utilisateur veut changer de prestation et que onResetPrestation est défini, utiliser cette fonction
      onResetPrestation();
      return;
    }

    const safeCopy = getSafeSelection(selection);
    safeCopy.prestationId = prestationId;
    safeCopy.subPrestationSelections = {};
    safeCopy.selectedDate = null;
    safeCopy.selectedTime = null;
    
    // Mettre à jour la sélection
    onSelect(safeCopy);
    
    // Ne pas réinitialiser les variantes sélectionnées
    // setSelectedVariants({});
  };

  const handleServiceSelect = (prestationId: number, subPrestationId: number, serviceId: number) => {
    const service = services.find((s) => s.id === prestationId)?.subprestations
      .find(sub => sub.id === subPrestationId)
      ?.services.find(s => s.id === serviceId);

    const subPrestation = services.find((s) => s.id === prestationId)?.subprestations
      .find(sub => sub.id === subPrestationId);

    if (!service || !subPrestation) return;

    // Si le service a des variantes de prix, afficher les options
    if (service.priceVariants && service.priceVariants.length > 0) {
      setExpandedServices(prev => ({
        ...prev,
        [serviceId]: !prev[serviceId]
      }));
      return;
    }

    const isCurrentlySelected = selection.subPrestationSelections[subPrestationId] === serviceId;

    if (isCurrentlySelected) {
      // Désélectionner le service
      const safeCopy = getSafeSelection(selection);
      delete safeCopy.subPrestationSelections[subPrestationId];
      
      // Mettre à jour la sélection
      onSelect(safeCopy);
      
      setDevis((prevDevis: any) => 
        prevDevis.filter((item: any) => item.id !== service.id)
      );
    } else {
      // Sélectionner le service
      const safeCopy = getSafeSelection(selection);
      safeCopy.prestationId = prestationId;
      safeCopy.subPrestationSelections[subPrestationId] = serviceId;
      
      // Mettre à jour la sélection
      onSelect(safeCopy);
      
      // Construire un nouveau service au format demandé
      const newDevisItem = {
        id: service.id,
        name: service.name,
        price: service.price,
        duration_minutes: service.duration_minutes,
        servicePriceVariantId: null,
        subPrestationName: subPrestation.name
      };
      
      // Ajouter au devis sans supprimer les services précédents
      setDevis((prevDevis: any) => {
        if (prevDevis.some((item: any) => item.id === service.id)) {
          return prevDevis.map((item: any) => 
            item.id === service.id ? newDevisItem : item
          );
        }
        return [...prevDevis, newDevisItem];
      });
    }
  };

  const handlePriceVariantSelect = (prestationId: number, subPrestationId: number, serviceId: number, variant: PriceVariant) => {
    const selectedService = services.find((s) => s.id === prestationId)?.subprestations
      .find(sub => sub.id === subPrestationId)
      ?.services.find(s => s.id === serviceId);

    const subPrestation = services.find((s) => s.id === prestationId)?.subprestations
      .find(sub => sub.id === subPrestationId);

    if (!selectedService || !subPrestation) return;

    const isSelected = selectedVariants[serviceId] === variant.id;

    if (isSelected) {
      // Désélectionner la variante
      const newSelectedVariants = { ...selectedVariants };
      delete newSelectedVariants[serviceId];
      setSelectedVariants(newSelectedVariants);

      console.log("Désélection d'une variante");
      console.log("Sélection avant:", {...selection.subPrestationSelections});
      
      // Faire une copie sécurisée de la sélection actuelle
      const safeCopy = getSafeSelection(selection);
      delete safeCopy.subPrestationSelections[subPrestationId];
      
      console.log("Sélection après:", {...safeCopy.subPrestationSelections});
      
      // Mettre à jour la sélection
      onSelect(safeCopy);
      
      // Mise à jour du devis
      setDevis((prevDevis: any) => 
        prevDevis.filter((item: any) => item.id !== serviceId)
      );
    } else {
      // Mettre à jour les variantes sélectionnées en ajoutant celle qu'on vient de choisir
      setSelectedVariants(prev => ({
        ...prev,
        [serviceId]: variant.id
      }));

      // Créer une copie sécurisée de la sélection actuelle
      const safeCopy = getSafeSelection(selection);
      safeCopy.prestationId = prestationId;
      safeCopy.subPrestationSelections[subPrestationId] = serviceId;
      
      // Mettre à jour la sélection
      onSelect(safeCopy);

      // Ajouter le nouveau service au devis sans supprimer les précédents
      const newDevisItem = {
        id: serviceId,
        name: selectedService.name,
        price: variant.price,
        duration_minutes: variant.duration || 0,
        servicePriceVariantId: variant.id,
        variantName: variant.name,
        subPrestationName: subPrestation.name
      };

      console.log("Variant selected:", variant);
      console.log("Duration from variant:", variant.duration);
      console.log("New devis item:", newDevisItem);

      setDevis((prevDevis: any) => {
        // Si ce service existe déjà, le mettre à jour
        if (prevDevis.some((item: any) => item.id === serviceId)) {
          return prevDevis.map((item: any) => 
            item.id === serviceId ? newDevisItem : item
          );
        }
        // Sinon l'ajouter aux services existants
        const updatedDevis = [...prevDevis, newDevisItem];
        console.log("Updated devis:", updatedDevis);
        
        // Calculer la durée totale
        const totalDuration = updatedDevis.reduce((sum, item) => sum + (item.duration_minutes || 0), 0);
        console.log("Total duration after update:", totalDuration, "minutes");
        
        return updatedDevis;
      });
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
            <div className="p-8 bg-gradient-to-r from-[#FF6A00] to-[#7B219F]">
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
        <div className="p-6 space-y-6">
          {selectedPrestation.subprestations.sort((a:any,b:any) => a.order_index - b.order_index).map((subPrestation, index) => (
            <motion.div 
              key={subPrestation.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-xl overflow-hidden"
            >
              <div 
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                onClick={() => setExpandedSubPrestation(expandedSubPrestation === subPrestation.id ? null : subPrestation.id)}
              >
                <div className="flex items-center space-x-4">
                  <h4 className="text-xl font-semibold text-gray-900">{subPrestation.name}</h4>
                  {selection.subPrestationSelections[subPrestation.id] && (
                    <span className="px-2 py-1 bg-[#ec7f2b26] text-[#e86126] rounded-full text-sm font-medium">
                      Sélectionné
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {subPrestation.services.length} services disponibles
                  </span>
                  <motion.div
                    animate={{ rotate: expandedSubPrestation === subPrestation.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSubPrestation === subPrestation.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
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
                              <div className="flex flex-col justify-between">
                                <div className="flex items-start mt-[10px] space-x-2">
                                  <span className="flex flex-col gap-1 font-semibold text-gray-900">
                                    {service.name}
                                    <div className="flex items-center text-[#e86126] font-semibold">
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
                                    className="flex items-center text-sm text-gray-500"
                                  >
                                    {service.priceVariants.length > 0 ? "" : (
                                      <>
                                        <Clock className="h-4 w-4 mr-1" />
                                        {minutesToHours(service.duration_minutes)}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center text-[#e86126] font-semibold">
                                  {/* Commentaire supprimé pour clarté */}
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
                                        
                                        // Utiliser la fonction utilitaire pour créer une copie sécurisée
                                        const safeCopy = getSafeSelection(selection);
                                        delete safeCopy.subPrestationSelections[subPrestation.id];
                                        
                                        // Mettre à jour la sélection
                                        onSelect(safeCopy);
                                        
                                        setDevis((prevDevis: any) => 
                                          prevDevis.filter((item: any) => item.id !== service.id)
                                        );
                                      } else {
                                        // Sélectionner le service sans réinitialiser les variantes déjà sélectionnées
                                        // Créer un nouvel objet devis formaté correctement
                                        const newDevisItem = {
                                          id: service.id,
                                          name: service.name,
                                          price: service.price,
                                          duration_minutes: service.duration_minutes,
                                          servicePriceVariantId: null,
                                          variantName: null,
                                          subPrestationName: subPrestation.name
                                        };
                                        
                                        console.log("Standard service selected:", service);
                                        console.log("Service duration:", service.duration_minutes);
                                        console.log("New devis item for standard service:", newDevisItem);
                                        
                                        // Utiliser la fonction utilitaire pour créer une copie sécurisée
                                        const safeCopy = getSafeSelection(selection);
                                        safeCopy.prestationId = selectedPrestation.id;
                                        safeCopy.subPrestationSelections[subPrestation.id] = service.id;
                                        
                                        // Mettre à jour la sélection
                                        onSelect(safeCopy);
                                        
                                        setDevis((prevDevis: any) => {
                                          if (prevDevis.some((item: any) => item.id === service.id)) {
                                            return prevDevis.map((item: any) => 
                                              item.id === service.id ? newDevisItem : item
                                            );
                                          }
                                          
                                          const updatedDevis = [...prevDevis, newDevisItem];
                                          // Calculer la durée totale
                                          const totalDuration = updatedDevis.reduce((sum, item) => sum + (item.duration_minutes || 0), 0);
                                          console.log("Total duration after standard service added:", totalDuration, "minutes");
                                          
                                          return updatedDevis;
                                        });
                                      }
                                    }}
                                    disabled={!!selection.subPrestationSelections[subPrestation.id] && selection.subPrestationSelections[subPrestation.id] !== service.id}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                      selection.subPrestationSelections[subPrestation.id] === service.id
                                        ? "bg-[#ec7f2b26] border-[#e86126] text-[#e86126]"
                                        : !!selection.subPrestationSelections[subPrestation.id] && selection.subPrestationSelections[subPrestation.id] !== service.id
                                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
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
                                        disabled={!!selection.subPrestationSelections[subPrestation.id] && selection.subPrestationSelections[subPrestation.id] !== service.id}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                          selectedVariants[service.id] === variant.id
                                            ? "bg-[#ec7f2b26] border-[#e86126] text-[#e86126]"
                                            : !!selection.subPrestationSelections[subPrestation.id] && selection.subPrestationSelections[subPrestation.id] !== service.id
                                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
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
                                          <span className="font-semibold">{variant.price}€</span>
                                          <span className="text-sm text-gray-500">{minutesToHours(variant.duration)}</span>
                                        </div>
                                      </motion.button>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
