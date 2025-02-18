import axios from "axios";

export default class Api {
  public instance: any;
  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}`,
    });
  }
}
