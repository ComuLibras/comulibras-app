import { Axios } from "axios";
import { httpClient as axiosClient } from "../clients/http-client";

export class ApiService {
  protected readonly httpClient: Axios;

  constructor() {
    this.httpClient = axiosClient;
  }
}
