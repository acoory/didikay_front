import Api from "./api";

export class ConfigService extends Api {
    async getConfig() {
        return this.instance.get(`/client/config`);
    }
}
export default new ConfigService();
