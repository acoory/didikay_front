import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
// import moment from "moment";
import "moment/locale/fr";
import { TimeSlot } from "../types/booking";
import bookingService from "../services/bookingService";
import moment from "moment/min/moment-with-locales";

interface DatePickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string, slot: any) => void;
  selection: any;
  services: any;
  daysOfWeek: any;
}

export function DatePicker({ selectedDate, selectedTime, onDateSelect, onTimeSelect, selection, services, daysOfWeek }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDates = () => {
    const dates = [];
    const firstDay = moment(currentMonth).startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    const startingDay = firstDay.day();

    // Adjust for Monday as first day of week (0 = Monday in our display)
    const adjustedStartingDay = startingDay === 0 ? 6 : startingDay - 1;

    // Add empty slots for days before the first of the month
    for (let i = 0; i < adjustedStartingDay; i++) {
      dates.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(moment(currentMonth).date(day).toDate());
    }

    return dates;
  };

  const getSelectedServices = () => {
    if (!selection.prestationId) return [];

    const selectedServices: Array<{
      name: string;
      price: string;
      duration_minutes: number;
      description: string;
    }> = [];

    const selectedPrestation = services.find((p: any) => p.id === selection.prestationId);
    if (!selectedPrestation) return [];

    selectedPrestation.subprestations.forEach((subPrestation: any) => {
      const selectedServiceId = selection.subPrestationSelections[subPrestation.id];
      if (selectedServiceId) {
        const service = subPrestation.services.find((s: any) => s.id === selectedServiceId);
        if (service) {
          selectedServices.push(service);
        }
      }
    });

    return selectedServices;
  };

  const selectedServices = getSelectedServices();
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration_minutes, 0);

  const fetchTimeSlots = async (date: Date) => {
    setIsLoading(true);
    setError(null);
    try {
       await bookingService.getAvailableSlots(moment(date).valueOf(), totalDuration).then((res) => {
        setTimeSlots(res.data.schedule);
      });
      setShowTimeSlots(true);
    } catch (err) {
      setError("Impossible de récupérer les créneaux horaires. Veuillez réessayer.");
      console.error("Error fetching time slots:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateClick = async (date: Date) => {
    console.log("Date selected:", date);

    onDateSelect(date);
    await fetchTimeSlots(date);
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && moment(selectedDate).isSame(date, "day");
  };

  const isDateDisabled = (date: Date) => {
    return moment(date).isBefore(moment().startOf("day"));
  };

  const formatMonth = () => {
    moment.locale("fr");
    return currentMonth.format("MMMM YYYY");
  };

  const formatDate = (date: Date) => {
    moment.locale("fr");
    return moment(date).format("dddd D MMMM");
  };

  const formatTime = (dateString: string) => {
    return moment(dateString).format("HH:mm");
  };

  const isClosedDay = (date: any) => {
    const dayName = moment(date).locale("fr").format("dddd");

    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i].day.toLowerCase() === dayName) {
        return daysOfWeek[i].closed;
      }
    }
    return false;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, "month"));
  };

  return (
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
        {!showTimeSlots ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={handlePreviousMonth} 
                  className="p-2 hover:bg-[#ec7f2b26] rounded-full transition-colors duration-200 text-[#e86126]"
                >
                  <ChevronLeft className="w-5 h-5"/>
                </button>
                <h3 className="text-lg font-semibold capitalize flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#e86126]" />
                  {formatMonth()}
                </h3>
                <button 
                  onClick={handleNextMonth} 
                  className="p-2 hover:bg-[#ec7f2b26] rounded-full transition-colors duration-200 text-[#e86126]"
                >
                  <ChevronRight className="w-5 h-5"/>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {generateDates().map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`}/>;
                  }

                  const disabled = isDateDisabled(date) || isClosedDay(date);
                  const selected = isDateSelected(date);
                  const isToday = moment(date).isSame(moment(), 'day');

                  return (
                      <button
                          key={moment(date).format()}
                          onClick={() => !disabled && handleDateClick(date)}
                          disabled={disabled}
                          className={`
                            p-2 rounded-full text-sm relative transition-all duration-200
                            ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-[#ec7f2b26] hover:scale-110"}
                            ${isToday && !selected ? "border border-[#e86126] text-[#e86126]" : ""}
                            ${selected ? "bg-[#e86126] text-white hover:bg-[#ec7f2b]" : ""}
                          `}
                      >
                        {moment(date).date()}
                        {isToday && !selected && <span className="sr-only">Aujourd'hui</span>}
                      </button>
                  );
                })}
              </div>
            </div>
        ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#e86126]"/>
                  <h3 className="text-lg font-semibold">
                    Horaires disponibles
                  </h3>
                </div>
                <button 
                  onClick={() => setShowTimeSlots(false)}
                  className="text-[#e86126] hover:text-[#ec7f2b] font-medium transition-colors duration-200 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Changer la date
                </button>
              </div>
              
              <div className="bg-[#fdeae1] p-3 rounded-lg mb-4 shadow-sm">
                <p className="font-medium text-[#e86126] text-center">{formatDate(selectedDate!)}</p>
              </div>

              {isLoading && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e86126] mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des créneaux...</p>
                  </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {!isLoading && !error && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.length === 0 ? (
                      <div className="col-span-full text-center p-6 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Aucun créneau disponible pour cette date.</p>
                        <button 
                          onClick={() => setShowTimeSlots(false)}
                          className="mt-3 text-[#e86126] hover:text-[#ec7f2b] font-medium"
                        >
                          Sélectionner une autre date
                        </button>
                      </div>
                    ) : (
                      <>
                        {timeSlots.map((slot) => (
                          <button
                              key={slot.start_unix}
                              onClick={() => !slot.busy && onTimeSelect(formatTime(slot.start), slot)}
                              disabled={slot.busy}
                              className={`
                                p-3 rounded-lg border text-center transition-all duration-200
                                ${
                                  slot.busy
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                    : selectedTime === formatTime(slot.start)
                                      ? "bg-[#ec7f2b26] border-[#e86126] text-[#e86126] transform scale-105 shadow-sm"
                                      : "border-gray-200 hover:border-[#ec7f2b] hover:bg-[#ec7f2b26] hover:scale-105"
                                }
                              `}
                          >
                            <span className="text-lg">{formatTime(slot.start)}</span>
                            {!slot.vaccation && slot.busy && (
                                <span className="block text-xs text-gray-500 mt-1">Indisponible</span>
                            )}
                            {slot.vaccation && (
                                <span className="block text-xs text-gray-500 mt-1">En congé</span>
                            )}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
              )}
            </div>
        )}
      </div>
  );
}
