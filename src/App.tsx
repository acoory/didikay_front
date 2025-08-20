import { Routes, Route } from "react-router";
import { HelmetProvider } from 'react-helmet-async';

import Home from "./pages/home";
import Reservation from "./pages/reservation";
import BookingSuccess from "./pages/success";
import SlotNotAvailable from "./pages/slotNotAvailable";
import Cancel from "./pages/cancel";
import ResetPassword from "./pages/reset-password";
import ForgotPassword from "./pages/forgot-password";
import RescheduleSuccess from "./pages/reschedule-success";
import RescheduleCancel from "./pages/reschedule-cancel";
import NotFound from "./pages/NotFound";
import ServiceCityPage from "./pages/local-seo/ServiceCityPage";
import CityPage from "./pages/local-seo/CityPage";
import ScrollToTop from "./components/ScrollToTop";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/success" element={<BookingSuccess />} />
        <Route path="/slot-not-available" element={<SlotNotAvailable />} />
        <Route path="/cancel/:id" element={<Cancel />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reschedule-success" element={<RescheduleSuccess />} />
        <Route path="/reschedule-cancel" element={<RescheduleCancel />} />
        
        {/* Pages SEO locales - Pages par ville */}
        <Route path="/coiffeur-:slug" element={<CityPage />} />
        
        {/* Pages SEO locales - Structure /ville (toutes les prestations) */}
        <Route path="/:city" element={<CityPage />} />
        
        {/* Pages SEO locales - Structure /ville/service */}
        <Route path="/:city/:service" element={<ServiceCityPage />} />
        
        {/* 404 - doit être en dernier */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
