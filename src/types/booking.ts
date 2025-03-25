export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  subprestation_id: number;
}

export interface SubPrestation {
  id: number;
  name: string;
  prestation_id: number;
  services: Service[];
}

export interface Prestation {
  id: number;
  name: string;
  subprestations: SubPrestation[];
}

export interface PrestationResponse {
  message: string;
  prestation: Prestation[];
}

export interface UserInfo {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
}

export interface BookingSelection {
  prestationId: number | null;
  subPrestationSelections: Record<number, number>; // subPrestationId -> serviceId
  selectedDate?: Date | null;
  selectedTime?: string | null;
  slot?: any;
  devis?: any;
}

export type BookingStep = "services" | "date" | "info" | "payment";

export interface TimeSlot {
  start: string;
  start_unix: number;
  end: string;
  end_unix: number;
  busy: boolean;
  vaccation: boolean;
}

export interface ScheduleResponse {
  message: string;
  schedule: TimeSlot[];
}

export interface CancellationStatus {
  isValid: boolean;
  message: string;
  isLoading: boolean;
}
