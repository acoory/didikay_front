import { Routes, Route } from "react-router";
import { HelmetProvider } from 'react-helmet-async';

import Home from "./pages/home";
import Reservation from "./pages/reservation";
import BookingSuccess from "./pages/success";
import SlotNotAvailable from "./pages/slotNotAvailable";
import Cancel from "./pages/cancel";
import ResetPassword from "./pages/reset-password";
import ForgotPassword from "./pages/forgot-password";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/success" element={<BookingSuccess />} />
        <Route path="/slot-not-available" element={<SlotNotAvailable />} />
        <Route path="/cancel/:id" element={<Cancel />} />
        <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
