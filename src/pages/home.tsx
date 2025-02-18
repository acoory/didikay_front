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

function Home() {
  return <div>index</div>;
}

export default Home;
