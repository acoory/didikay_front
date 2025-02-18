import React, { useEffect, useState } from "react";
import { ServiceSelection } from "../components/ServiceSelection";
import { BookingSummary } from "../components/BookingSummary";
import { DatePicker } from "../components/DatePicker";
import { Stepper } from "../components/Stepper";
import { UserForm } from "../components/UserForm";
import { PaymentStep } from "../components/PaymentStep";
// import { services } from "./data/services";
import { BookingSelection, BookingStep, SubPrestation, UserInfo } from "../types/booking";
import { Scissors } from "lucide-react";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "react-query";
import prestationService from "../services/prestationService";
import { BrowserRouter, Routes, Route } from "react-router";

function Reservation() {
  // const [services, setServices] = useState([]);
  const [currentStep, setCurrentStep] = useState<BookingStep>("services");
  const [selection, setSelection] = useState<BookingSelection>({
    prestationId: null,
    subPrestationSelections: {},
    selectedDate: null,
    selectedTime: null,
    slot: null,
  });
  const [devis, setDevis] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    prestationService.getPrestations().then((res) => {
      console.log(res);
      if (res.data.prestation) {
        setServices(res.data.prestation);
      }
    });
  }, []);

  const canProceedToDate = () => {
    if (!selection.prestationId) return false;
    const selectedPrestation: any = services.find((s: any) => s.id === selection.prestationId);
    if (!selectedPrestation) return false;
    return selectedPrestation.subprestations.every((subPrestation: SubPrestation) => selection.subPrestationSelections[subPrestation.id]);
  };

  const canProceedToInfo = () => {
    return selection.selectedDate !== null && selection.selectedTime !== null;
  };

  const canProceedToPayment = () => {
    return userInfo.firstname.trim() !== "" && userInfo.lastname.trim() !== "" && userInfo.email.trim() !== "" && userInfo.phone.trim() !== "";
  };

  const handleDateSelect = (date: Date) => {
    setSelection((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string, slot: any) => {
    setSelection((prev) => ({ ...prev, selectedTime: time }));
    setSelection((prev) => ({ ...prev, slot: slot }));
  };

  const handleNext = () => {
    if (currentStep === "services" && canProceedToDate()) {
      setCurrentStep("date");
    } else if (currentStep === "date" && canProceedToInfo()) {
      setCurrentStep("info");
    } else if (currentStep === "info" && canProceedToPayment()) {
      setCurrentStep("payment");
    }
  };

  const handleBack = () => {
    if (currentStep === "date") {
      setCurrentStep("services");
    } else if (currentStep === "info") {
      setCurrentStep("date");
    } else if (currentStep === "payment") {
      setCurrentStep("info");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Scissors className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">✨ Salon de Coiffure</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stepper currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {currentStep === "services" && (
              <>
                <h2 className="text-xl font-semibold mb-4">{!selection.prestationId ? "✂️ Choisissez votre prestation" : "🎨 Sélectionnez vos services"}</h2>
                <ServiceSelection services={services} selection={selection} onSelect={setSelection} setDevis={setDevis} devis={devis} />
                {canProceedToDate() && (
                  <div className="mt-6">
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            )}

            {currentStep === "date" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">📅 Choisissez une date et heure</h2>
                  <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 font-medium">
                    ← Retour
                  </button>
                </div>
                <DatePicker
                  selectedDate={selection.selectedDate as Date}
                  selectedTime={selection.selectedTime as string}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect as any}
                  devis={devis}
                />
                {selection.selectedDate && selection.selectedTime && (
                  <div className="mt-6">
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            )}

            {currentStep === "info" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">👤 Vos informations</h2>
                  <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 font-medium">
                    ← Retour
                  </button>
                </div>
                <UserForm userInfo={userInfo} onUserInfoChange={setUserInfo} />
                {canProceedToPayment() && (
                  <div className="mt-6">
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            )}

            {currentStep === "payment" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">💳 Paiement</h2>
                  <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 font-medium">
                    ← Retour
                  </button>
                </div>
                <PaymentStep userInfo={userInfo} selection={selection} devis={devis} />
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <BookingSummary services={services} selection={selection} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reservation;
