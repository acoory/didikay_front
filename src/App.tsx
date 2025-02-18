import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/home";
import Reservation from "./pages/reservation";
import BookingSuccess from "./pages/success";
import SlotNotAvailable from "./pages/slotNotAvailable";
import Cancel from "./pages/cancel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/success" element={<BookingSuccess />} />
      <Route path="/slotNotAvailable" element={<SlotNotAvailable />} />
      <Route path="/cancel/:id" element={<Cancel />} />
    </Routes>
    // <div className="min-h-screen bg-gray-50">
    //   <header className="bg-white shadow-sm">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //       <div className="flex items-center space-x-3">
    //         <Scissors className="h-8 w-8 text-purple-600" />
    //         <h1 className="text-2xl font-bold text-gray-900">✨ Salon de Coiffure</h1>
    //       </div>
    //     </div>
    //   </header>

    //   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     <Stepper currentStep={currentStep} />

    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
    //       <div className="lg:col-span-2">
    //         {currentStep === "services" && (
    //           <>
    //             <h2 className="text-xl font-semibold mb-4">{!selection.prestationId ? "✂️ Choisissez votre prestation" : "🎨 Sélectionnez vos services"}</h2>
    //             <ServiceSelection services={services} selection={selection} onSelect={setSelection} setDevis={setDevis} devis={devis} />
    //             {canProceedToDate() && (
    //               <div className="mt-6">
    //                 <button
    //                   onClick={handleNext}
    //                   className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
    //                 >
    //                   Suivant →
    //                 </button>
    //               </div>
    //             )}
    //           </>
    //         )}

    //         {currentStep === "date" && (
    //           <>
    //             <div className="flex items-center justify-between mb-4">
    //               <h2 className="text-xl font-semibold">📅 Choisissez une date et heure</h2>
    //               <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 font-medium">
    //                 ← Retour
    //               </button>
    //             </div>
    //             <DatePicker
    //               selectedDate={selection.selectedDate as Date}
    //               selectedTime={selection.selectedTime as string}
    //               onDateSelect={handleDateSelect}
    //               onTimeSelect={handleTimeSelect as any}
    //               devis={devis}
    //             />
    //             {selection.selectedDate && selection.selectedTime && (
    //               <div className="mt-6">
    //                 <button
    //                   onClick={handleNext}
    //                   className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
    //                 >
    //                   Suivant →
    //                 </button>
    //               </div>
    //             )}
    //           </>
    //         )}

    //         {currentStep === "info" && (
    //           <>
    //             <div className="flex items-center justify-between mb-4">
    //               <h2 className="text-xl font-semibold">👤 Vos informations</h2>
    //               <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 font-medium">
    //                 ← Retour
    //               </button>
    //             </div>
    //             <UserForm userInfo={userInfo} onUserInfoChange={setUserInfo} />
    //             {canProceedToPayment() && (
    //               <div className="mt-6">
    //                 <button
    //                   onClick={handleNext}
    //                   className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
    //                 >
    //                   Suivant →
    //                 </button>
    //               </div>
    //             )}
    //           </>
    //         )}

    //         {currentStep === "payment" && (
    //           <>
    //             <div className="flex items-center justify-between mb-4">
    //               <h2 className="text-xl font-semibold">💳 Paiement</h2>
    //               <button onClick={handleBack} className="text-purple-600 hover:text-purple-800 font-medium">
    //                 ← Retour
    //               </button>
    //             </div>
    //             <PaymentStep userInfo={userInfo} selection={selection} devis={devis} />
    //           </>
    //         )}
    //       </div>

    //       <div className="lg:col-span-1">
    //         <BookingSummary services={services} selection={selection} />
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
}

export default App;
