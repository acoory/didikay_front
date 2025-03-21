import React, { useEffect, useState } from "react";
import { ServiceSelection } from "../components/ServiceSelection";
import { BookingSummary } from "../components/BookingSummary";
import { DatePicker } from "../components/DatePicker";
import { Stepper } from "../components/Stepper";
import { UserForm } from "../components/UserForm";
import { PaymentStep } from "../components/PaymentStep";
// import { services } from "./data/services";
import { BookingSelection, BookingStep, SubPrestation, UserInfo } from "../types/booking";
import { LogIn, Scissors, UserPlus } from "lucide-react";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "react-query";
import prestationService from "../services/prestationService";
import { BrowserRouter, Routes, Route } from "react-router";
import daysOfWeekService from "../services/daysOfWeekService";
import clientService from "../services/clientService";
import { UserLoginForm } from "../components/UserLoginForm";

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
  const [accountType, setAccountType] = useState<"create" | "login">("create");
  const [devis, setDevis] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [services, setServices] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [is_active_otp, setIs_active_otp] = useState<boolean>(false);
  const [otp_code, setOtp_code] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([prestationService.getPrestations(), daysOfWeekService.getAll()]).then(([prestations, daysOfWeek]) => {
          console.log("prestations", prestations);
          console.log("daysOfWeek", daysOfWeek);

          setServices(prestations.data.prestation);
          setDaysOfWeek(daysOfWeek.data.daysOfWeek);
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
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

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      if (userInfo.firstname.trim() === "" || userInfo.lastname.trim() === "" || userInfo.email.trim() === "") {
        setError("Veuillez remplir les champs obligatoires.");
        setLoading(false);
        return;
      }

      await clientService.create(userInfo).then((res) => {
        console.log("Account created:", res);
      });

      setError(null);
      setIs_active_otp(true);
      setLoading(false);
      console.log("Account created:", userInfo);
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Un compte avec cet email existe déjà.");
      setLoading(false);
    }
  };

  const handleSubmitOtp = async () => {
    try {
      setLoading(true);
      console.log("Submitting OTP code...");
      if (otp_code.trim() === "") {
        setError("Veuillez entrer le code reçu par email.");
        setLoading(false);
        return;
      }

      const req = await clientService
        .verifyOtp({
          email: userInfo.email,
          otp: otp_code,
        })
        .then((res) => {
          console.log("OTP verified:", res);
          // if (res.data.status === 200) {
          setCurrentStep("payment");
          setLoading(false);
          // } else {
          //   setError("Code OTP invalide.");
          // }
        });
    } catch (error) {
      console.error("Error submitting OTP:", error);
      setError("Code invalide.");
      setLoading(false);
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
                  selection={selection}
                  services={services}
                  daysOfWeek={daysOfWeek}
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
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setAccountType("create")}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                      accountType === "create" ? "bg-indigo-50 text-indigo-600 ring-2 ring-indigo-500" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <UserPlus size={24} className="mb-2" />
                    <span className="font-medium text-sm">Créer un compte</span>
                  </button>

                  <button
                    onClick={() => setAccountType("login")}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                      accountType === "login" ? "bg-emerald-50 text-emerald-600 ring-2 ring-emerald-500" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <LogIn size={24} className="mb-2" />
                    <span className="font-medium text-sm">J'ai déjà un compte</span>
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-white border border-gray-200">
                  {accountType === "create" ? (
                    <>
                      {!is_active_otp ? (
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-3 text-indigo-600">
                            <UserPlus size={20} />
                            <span className="font-medium">Créer un nouveau compte</span>
                          </div>
                          {/* error */}
                          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 mt-2">{error}</div>}
                          <UserForm userInfo={userInfo} onUserInfoChange={setUserInfo} />
                          <div className="mt-6">
                            <button
                              disabled={loading}
                              onClick={handleCreateAccount}
                              style={{
                                cursor: loading ? "not-allowed" : "pointer",
                                backgroundColor: loading ? "gray" : undefined,
                              }}
                              className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              {loading ? (
                                <div className="animate-spin ml-2 h-5 w-5 border-t-2 border-b-2 border-purple-600 rounded-full"></div>
                              ) : (
                                "Créer le compte et continuer →"
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <h2 className="text-lg font-semibold text-gray-800 text-center">Vérification de votre compte</h2>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            Un email vous a été envoyé pour valider votre compte. Veuillez entrer le code reçu par email.
                          </p>
                          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-2">{error}</div>}
                          <input
                            type="text"
                            value={otp_code}
                            onChange={(e) => setOtp_code(e.target.value)}
                            className="mt-4 px-4 py-2 border rounded-md w-full text-center text-lg tracking-widest focus:border-purple-500 focus:ring-purple-500"
                            placeholder="123456"
                            maxLength={6}
                          />
                          <button
                            disabled={loading}
                            style={{
                              cursor: loading ? "not-allowed" : "pointer",
                              backgroundColor: loading ? "gray" : undefined,
                            }}
                            onClick={handleSubmitOtp}
                            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md w-full font-semibold hover:bg-purple-700 transition"
                          >
                            {loading ? <div className="animate-spin ml-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div> : "Valider le code"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 text-emerald-600">
                        <LogIn size={20} />
                        <span className="font-medium">Se connecter</span>
                      </div>
                      <UserLoginForm userInfo={userInfo} onUserInfoChange={setUserInfo} setCurrentStep={setCurrentStep} />
                    </div>
                  )}
                </div>
                {/* <UserForm userInfo={userInfo} onUserInfoChange={setUserInfo} />
                {canProceedToPayment() && (
                  <div className="mt-6">
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                )} */}
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
            <BookingSummary services={services} selection={selection} userInfo={userInfo} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reservation;
