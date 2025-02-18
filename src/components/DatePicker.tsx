import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { TimeSlot } from "../types/booking";
import bookingService from "../services/bookingService";

interface DatePickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string, slot: any) => void;
  devis: any;
}

export function DatePicker({ selectedDate, selectedTime, onDateSelect, onTimeSelect, devis }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      dates.push(date);
    }

    return dates;
  };

  const fetchTimeSlots = async (date: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(devis.reduce((total: any, service: any) => total + service.duration_minutes, 0));
      const res = await bookingService
        .getAvailableSlots(
          date.getTime(),
          devis.reduce((total: any, service: any) => total + service.duration_minutes, 0)
        )

        .then((res) => {
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
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {!showTimeSlots ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold capitalize">{formatMonth(currentMonth)}</h3>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5" />
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
                return <div key={`empty-${index}`} />;
              }

              const disabled = isDateDisabled(date);
              const selected = isDateSelected(date);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => !disabled && handleDateClick(date)}
                  disabled={disabled}
                  className={`
                    p-2 rounded-full text-sm
                    ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-purple-50"}
                    ${selected ? "bg-purple-600 text-white hover:bg-purple-700" : ""}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Horaires disponibles pour le {formatDate(selectedDate!)}</h3>
            </div>
            <button onClick={() => setShowTimeSlots(false)} className="text-purple-600 hover:text-purple-800 font-medium">
              ← Changer la date
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Chargement des créneaux...</p>
            </div>
          )}

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>}

          {!isLoading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
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
                        ? "bg-purple-50 border-purple-500 text-purple-700"
                        : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
                    }
                  `}
                >
                  {formatTime(slot.start)}
                  {slot.busy && <span className="block text-xs text-gray-500">Indisponible</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
