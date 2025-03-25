import {  Routes, Route } from "react-router";

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
      <Route path="/slot-not-available" element={<SlotNotAvailable />} />
      <Route path="/cancel/:id" element={<Cancel />} />
    </Routes>

  );
}

export default App;
