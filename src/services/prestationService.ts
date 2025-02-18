import Api from "../services/api";

class PrestationService extends Api {
  async getPrestations() {
    return this.instance.get("/client/prestation");
  }
}

export default new PrestationService();
