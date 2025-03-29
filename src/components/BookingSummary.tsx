import React from "react";
import { Prestation, BookingSelection } from "../types/booking";
import { Clock, Euro, User, Calendar, CheckCircle2 } from "lucide-react";
import moment from "moment/min/moment-with-locales";
import "moment/locale/fr";

moment.locale("fr");

interface BookingSummaryProps {
  services: Prestation[];
  selection: BookingSelection;
  userInfo: any;
}

export function BookingSummary({ services, selection, userInfo }: BookingSummaryProps) {
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

  const duration = moment.duration(totalDuration, "minutes");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  const formatDate = (date: Date) => {
    return moment(date).format("dddd D MMMM");
  };

  const formatTime = (time: string) => {
    return time;
  };

  const acompte = totalPrice > 50 ? totalPrice * 0.4 : 10;
  const resteDu = totalPrice - acompte;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CheckCircle2 className="w-5 h-5 mr-2 text-[#e86126]" />
        Récapitulatif
      </h2>
      
      {userInfo.firstname && userInfo.lastname && (
        <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="bg-[#fdeae1] p-2 rounded-full text-[#e86126]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {userInfo.firstname} {userInfo.lastname}
            </p>
            {userInfo.email && <p className="text-sm text-gray-500">{userInfo.email}</p>}
          </div>
        </div>
      )}

      {selectedServices.length > 0 ? (
        <div className="animate-fadeIn">
          <div className="space-y-4 mb-6">
            {selectedServices.map((service, index) => (
              <div key={index} className="flex justify-between items-start py-3 border-b border-dashed">
                <div className="flex-1 pr-4">
                  <span className="font-medium text-gray-900">{service.name}</span>
                  {service.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                  )}
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{service.duration_minutes} min</span>
                  </div>
                </div>
                <span className="text-[#e86126] font-semibold whitespace-nowrap">{service.price}€</span>
              </div>
            ))}
          </div>

          {selection.selectedDate && selection.selectedTime && (
            <div className="mb-6 p-4 bg-[#fdeae1] rounded-lg space-y-2 shadow-sm">
              <div className="flex items-center text-[#e86126]">
                <Calendar className="w-4 h-4 mr-2" />
                <p className="font-medium">{formatDate(selection.selectedDate)}</p>
              </div>
              <div className="flex items-center text-[#e86126]">
                <Clock className="w-4 h-4 mr-2" />
                <p className="font-medium">{formatTime(selection.selectedTime)}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-700 font-medium">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Durée totale</span>
              </div>
              <span>{hours > 0 ? `${hours}h${minutes.toString().padStart(2, "0")}` : `${minutes} min`}</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-700 font-medium">
              <div className="flex items-center">
                <Euro className="w-4 h-4 mr-2" />
                <span>Total</span>
              </div>
              <span>{totalPrice.toFixed(2)}€</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-green-50 p-4 rounded-lg mb-3">
              <div className="flex justify-between items-center text-green-700 font-medium">
                <div className="flex items-center">
                  <Euro className="w-4 h-4 mr-2" />
                  <span>Acompte à régler</span>
                </div>
                <span>{acompte.toFixed(2)}€</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-600 mt-2 text-sm">
                <span>Reste à payer sur place</span>
                <span>{resteDu.toFixed(2)}€</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 italic">
              Le reste sera à payer sur place en espèce le jour du rendez-vous, merci de prévoir la somme exacte.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <div className="flex justify-center mb-3 opacity-50">
            <CheckCircle2 className="w-12 h-12 text-[#e86126]" />
          </div>
          <p>Sélectionnez vos services pour voir le récapitulatif</p>
        </div>
      )}
    </div>
  );
}
