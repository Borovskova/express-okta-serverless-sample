import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { logger } from "../../utils/logger";
import { CRUDHttpMethods } from "../enums/crud.enum";

export class HttpRequestService {
  static async executeHttp(
    method: CRUDHttpMethods,
    url: string,
    params: Record<string, unknown> | string | null,
    logKeyWord: string,
    headers: { [key: string]: any } = {},
    auth: any = null,
  ): Promise<any> {
    let config: AxiosRequestConfig = {
      url,
      method,
      responseType: "json",
      timeout: 240000, //4 min
      headers,
    };

    if (method === CRUDHttpMethods.GET || method === CRUDHttpMethods.DELETE) {
      config["params"] = params || {};
    } else {
      config["data"] = params || {};
    }
    if (auth) {
      config["auth"] = auth;
    }

    try {
      const response: AxiosResponse | any = await axios(config);

      logger(
        "info",
        `${method} request aimed to ${logKeyWord} was successfully executed.`,
        "http-request.service:httpRequest",
      );

      return response?.data || response;
    } catch (error) {
      const errorMsg = `Error during ${method} request aimed to ${logKeyWord}: ${error?.response?.data?.message || error.message || ""}; Url: ${url}`;
      logger("error", errorMsg, "http-request.service:httpRequest");

      throw new Error(errorMsg);
    }
  }
}
