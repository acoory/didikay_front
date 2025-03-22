import axios from "axios";

export default class Api {
  public instance: any;
  constructor() {
    const baseURL = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
    this.instance = axios.create({
      baseURL: `${baseURL}`,
      withCredentials: true,
    });
  }
}
