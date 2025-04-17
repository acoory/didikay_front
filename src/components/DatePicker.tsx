import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
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
    if (canShowNextMonth()) {
      setCurrentMonth(moment(currentMonth).add(1, "month"));
    }
  };

  const canShowNextMonth = () => {
    const today = moment();
    const currentMonthValue = currentMonth.month();
    const todayMonthValue = today.month();
    
    if (currentMonthValue > todayMonthValue) {
      return false;
    }
    
    if (currentMonthValue === todayMonthValue && today.date() < 15) {
      return false;
    }
    
    return true;
  };

  return (
      <div className="bg-white rounded-lg shadow p-6">
        {!showTimeSlots ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft className="w-5 h-5"/>
                </button>
                <h3 className="text-lg font-semibold capitalize">{formatMonth()}</h3>
                {canShowNextMonth() ? (
                  <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronRight className="w-5 h-5"/>
                  </button>
                ) : (
                  <button disabled className="p-2 opacity-50 cursor-not-allowed">
                    <ChevronRight className="w-5 h-5 text-gray-300"/>
                  </button>
                )}
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

                  return (
                      <button
                          key={moment(date).format()}
                          onClick={() => !disabled && handleDateClick(date)}
                          disabled={disabled}
                          className={`
                p-2 rounded-full text-sm
                ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-[#ec7f2b26]"}
                ${selected ? "bg-[#e86126] text-white hover:bg-[#ec7f2b]" : ""}
              `}
                      >
                        {moment(date).date()}
                      </button>
                  );
                })}
              </div>
            </>
        ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#e86126]"/>
                  <h3 className="text-lg font-semibold">
                    Horaires disponibles pour le {formatDate(selectedDate!)}
                  </h3>
                </div>
                <button onClick={() => setShowTimeSlots(false)}
                        className="text-[#e86126] hover:text-[#ec7f2b] font-medium">
                  ← Changer la date
                </button>
              </div>

              {isLoading && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e86126] mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des créneaux...</p>
                  </div>
              )}

              {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>}

              {!isLoading && !error && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot:any) => (
                        <button
                            key={slot.start_unix}
                            onClick={() => !slot.busy && onTimeSelect(formatTime(slot.start), slot)}
                            disabled={slot.busy}
                            className={`
                p-3 rounded-lg border text-center transition-all
                ${
                                slot.busy
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                    : selectedTime === formatTime(slot.start)
                                        ? "bg-[#ec7f2b26] border-[#e86126] text-[#e86126]"
                                        : "border-gray-200 hover:border-[#ec7f2b] hover:bg-[#ec7f2b26]"
                            }
              `}
                        >
                          {formatTime(slot.start)}
                          {!slot.vaccation && slot.busy && (
                              <span className="block text-xs text-gray-500">Indisponible</span>
                          )}
                          {slot.isMajoration && !slot.busy && (
                                <span className="block text-xs text-gray-500">Majoration</span>
                            )}
                          {slot.vaccation && (
                              <span className="block text-xs text-gray-500">Indisponible</span>
                          )}
                        </button>
                    ))}
                  </div>
              )}
            </div>
        )}
      </div>

  );
}
