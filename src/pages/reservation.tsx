import React, { useEffect, useState } from "react";
import { ServiceSelection } from "../components/ServiceSelection";
import { BookingSummary } from "../components/BookingSummary";
import { DatePicker } from "../components/DatePicker";
import { Stepper } from "../components/Stepper";
import { UserForm } from "../components/UserForm";
import { PaymentStep } from "../components/PaymentStep";
// import { services } from "./data/services";
import { BookingSelection, BookingStep, SubPrestation, UserInfo } from "../types/booking";
import { LogIn, Scissors, UserPlus, Calendar, CheckCircle, CreditCard } from "lucide-react";
import prestationService from "../services/prestationService";
import daysOfWeekService from "../services/daysOfWeekService";
import clientService from "../services/clientService";
import { UserLoginForm } from "../components/UserLoginForm";
import "../styles/animations.css"; // Importer les animations CSS

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

  // Définir les étapes pour le stepper
  const steps = [
    { id: "services", label: "Services", icon: <Scissors className="w-5 h-5" /> },
    { id: "date", label: "Date & Heure", icon: <Calendar className="w-5 h-5" /> },
    { id: "info", label: "Informations", icon: <UserPlus className="w-5 h-5" /> },
    { id: "payment", label: "Paiement", icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Réservation</h1>
          <p className="text-gray-600">Réservez votre rendez-vous en quelques clics</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        
        <main className="bg-white rounded-xl shadow-sm overflow-hidden p-6 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">

              {currentStep === "services" && (
                <div className="animate-fadeIn">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Scissors className="w-5 h-5 mr-2 text-[#e86126]" />
                    <span>Choisissez vos services</span>
                  </h2>
                  <ServiceSelection services={services} selection={selection} onSelect={setSelection} setDevis={setDevis} devis={devis} />
                  
                  {canProceedToDate() && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 bg-[#e86126] text-white font-medium rounded-lg hover:bg-[#ec7f2b] transition-colors flex items-center space-x-2"
                      >
                        <span>Continuer vers la date</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === "date" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-[#e86126]" />
                      <span>Choisissez une date et heure</span>
                    </h2>
                    <button 
                      onClick={handleBack} 
                      className="text-[#e86126] hover:text-[#ec7f2b] font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Retour
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
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 bg-[#e86126] text-white font-medium rounded-lg hover:bg-[#ec7f2b] transition-colors flex items-center space-x-2"
                      >
                        <span>Continuer vers vos informations</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === "info" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <UserPlus className="w-5 h-5 mr-2 text-[#e86126]" />
                      <span>Vos informations</span>
                    </h2>
                    <button 
                      onClick={handleBack} 
                      className="text-[#e86126] hover:text-[#ec7f2b] font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Retour
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="mb-6 flex border-b">
                      <button
                        onClick={() => setAccountType("create")}
                        className={`flex-1 py-3 px-4 text-center font-medium ${
                          accountType === "create"
                            ? "text-[#e86126] border-b-2 border-[#e86126]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <span className="flex items-center justify-center">
                          <UserPlus size={18} className="mr-2" />
                          Nouveau client
                        </span>
                      </button>
                      <button
                        onClick={() => setAccountType("login")}
                        className={`flex-1 py-3 px-4 text-center font-medium ${
                          accountType === "login"
                            ? "text-[#e86126] border-b-2 border-[#e86126]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <span className="flex items-center justify-center">
                          <LogIn size={18} className="mr-2" />
                          Déjà client
                        </span>
                      </button>
                    </div>

                    <div className="p-6">
                      {accountType === "create" ? (
                        <>
                          {!is_active_otp ? (
                            <div className="space-y-6">
                              {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-center space-x-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                  <span>{error}</span>
                                </div>
                              )}
                              <UserForm userInfo={userInfo} onUserInfoChange={setUserInfo}/>
                              <div className="flex justify-end">
                                <button
                                  disabled={loading}
                                  onClick={handleCreateAccount}
                                  className={`px-6 py-3 text-white font-medium rounded-lg transition-colors flex items-center space-x-2 ${
                                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#e86126] hover:bg-[#ec7f2b]"
                                  }`}
                                >
                                  {loading ? (
                                    <>
                                      <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                                      <span>Traitement...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Créer et continuer</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4 flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2" />
                                <div>
                                  <h3 className="font-medium">Compte créé avec succès!</h3>
                                  <p className="text-sm">Un code de vérification a été envoyé à votre email.</p>
                                </div>
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                  Code de vérification
                                </label>
                                <input 
                                  type="text" 
                                  value={otp_code}
                                  onChange={(e) => setOtp_code(e.target.value)}
                                  placeholder="Entrez le code reçu par email"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#e86126] focus:border-[#e86126] outline-none transition-colors"
                                />
                              </div>
                              <div className="flex justify-end">
                                <button 
                                  onClick={handleSubmitOtp}
                                  className="px-6 py-3 bg-[#e86126] text-white font-medium rounded-lg hover:bg-[#ec7f2b] transition-colors flex items-center space-x-2"
                                >
                                  <span>Continuer vers le paiement</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="space-y-6">
                          <UserLoginForm userInfo={userInfo} onUserInfoChange={setUserInfo} setCurrentStep={setCurrentStep}/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === "payment" && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-[#e86126]" />
                      <span>Paiement</span>
                    </h2>
                    <button 
                      onClick={handleBack} 
                      className="text-[#e86126] hover:text-[#ec7f2b] font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Retour
                    </button>
                  </div>
                  <PaymentStep userInfo={userInfo} selection={selection} devis={devis} />
                </div>
              )}

            </div>

            <div className="lg:col-span-1">
              <BookingSummary services={services} selection={selection} userInfo={userInfo}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Reservation;
