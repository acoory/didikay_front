import Api from "./api";

export class ClientService extends Api {
  async create(data: any) {
    return this.instance.post(`/client/user/create`, data);
  }

  async verifyOtp(data: any) {
    return this.instance.post(`/client/user/verify-otp`, data);
  }

  async login(data: any) {
    return this.instance.post(`/client/user/login`, data);
  }
}
export default new ClientService();
