import Api from "./api";

export class BookingService extends Api {
  async getAvailableSlots(date: number, prestationMinute: any) {
    return this.instance.post(`/client/booking`, {
      date: date,
      nextPrestationDuration: prestationMinute,
    });
  }

  async cancelBooking(code: string, bookingId: string | undefined) {
    return this.instance.post(`/client/booking/cancel/${bookingId}`, {
        code: code,
    });
  }
}
export default new BookingService();
