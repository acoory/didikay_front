import React, {useEffect} from "react";
import { Prestation, BookingSelection } from "../types/booking";
import { Clock, Euro, User } from "lucide-react";
import moment from "moment/min/moment-with-locales";
import "moment/locale/fr";
import configService from "../services/configService.ts";

moment.locale("fr");

interface BookingSummaryProps {
  services: Prestation[];
  selection: BookingSelection;
  userInfo: any;
}

export function BookingSummary({ services, selection, userInfo }: BookingSummaryProps) {
  const [config, setConfig] = React.useState<any>(null);

  useEffect(() => {
    const getConfig = async () => {
      const response = await configService.getConfig();
      const data = response.data;
      console.log(data);
      setConfig(data);
    };
    getConfig();
  }, []);
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

  const calculatePriceWithMajoration = () => {
    if (selection.slot?.isMajoration) {
      const majorationAmount = (totalPrice * selection.slot.increaseRate) / 100;
      return totalPrice + majorationAmount;
    }
    return totalPrice;
  };

  const priceWithMajoration = calculatePriceWithMajoration();

  console.log(selection.selectedDate);

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Récapitulatif de la réservation</h2>
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex items-center space-x-2">
            {/* <img src={userInfo.profile_image} alt={userInfo.full_name} className="w-12 h-12 rounded-full" /> */}
            <User/>
            <div>
              <p className="font-semibold">
                {userInfo.firstname} {userInfo.lastname}
              </p>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
            </div>
          </div>
        </div>

        {selectedServices.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
                {selectedServices.map((service, index) => (
                    <div key={index} className="flex justify-between items-start py-2 border-b">
                      <div>
                        <span className="font-medium">{service.name}</span>
                        {service.description && <p className="text-sm text-gray-500">{service.description}</p>}
                      </div>
                      <span className="text-[#e86126] font-semibold">{service.price}€</span>
                    </div>
                ))}
              </div>

              {selection.selectedDate && selection.selectedTime && (
                  <div className="mb-6 p-3 bg-[#fdeae1] rounded-lg">
                    <p className="font-medium text-[#ec7f2b]">📅 {formatDate(selection.selectedDate)}</p>
                    <p className="font-medium text-[#ec7f2b]">🕒 {selection.selectedTime}</p>
                  </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2"/>
                  <span>
                    Durée totale: {hours}h{minutes.toFixed(0).padStart(2, "0")}{" "}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Euro className="h-5 w-5 mr-2"/>
                  <span>Total: {totalPrice.toFixed(2)}€</span>
                </div>
                {selection.slot?.isMajoration && (
                  <div className="flex items-center text-orange-600">
                    <Euro className="h-5 w-5 mr-2"/>
                    <span>
                      Majoration ({selection.slot.increaseRate}%): {(priceWithMajoration - totalPrice).toFixed(2)}€
                    </span>
                  </div>
                )}
                {selection.slot?.isMajoration && (
                  <div className="flex items-center text-[#e86126] font-semibold">
                    <Euro className="h-5 w-5 mr-2"/>
                    <span>Total avec majoration: {priceWithMajoration.toFixed(2)}€</span>
                  </div>
                )}
              </div>
              <hr className="my-6 border-gray-200"/>
              <div className="flex items-center text-green-600 font-semibold ">
                <Euro className="h-5 w-5 mr-2"/>
                <span>
  Acompte à régler :{" "}
  {selection.slot?.isMajoration
    ? (totalPrice > config.MIN_AMOUNT ? (totalPrice * config.PERCENTAGE * (1 + selection.slot.increaseRate / 100)).toFixed(2): (config.FIXED_FEE * (1 + selection.slot.increaseRate / 100)).toFixed(2))
    : (totalPrice > config.MIN_AMOUNT ? totalPrice * config.PERCENTAGE : config.FIXED_FEE).toFixed(2)
  }€
</span>

              </div>
              <p className="text-sm text-gray-500">
                Le reste sera à payer sur place en espèce le jour du rendez-vous merci de prévoir la somme exacte
              </p>
            </>
        ) : (
            <p className="text-gray-500">Sélectionnez vos services pour voir le récapitulatif</p>
        )}
      </div>

  );
}
