import Api from "./api";

export class DaysOfWeekService extends Api {
  async getAll() {
    return this.instance.get(`/client/dayofweek`);
  }
}
export default new DaysOfWeekService();
