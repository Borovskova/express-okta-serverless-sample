import { Request, Response } from "express";

import { HttpStatus } from "../enums/http-status.enum";
import {
  httpResponseFailed,
  httpResponseSuccess,
} from "../helpers/api-response.helper";
import { logger } from "lambda/utils/logger";
import { config } from "lambda/config/index";

export class HealthController {
  static async getHealthStatus(req: Request, res: Response): Promise<void> {
    try {
      const healthData = {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process?.uptime() || null,
        environment: config.NODE_ENV || "unknown",
      };
      const adaptedResponse = httpResponseSuccess(healthData);

      res.status(HttpStatus.OK).json(adaptedResponse);
      return;
    } catch (error) {
      logger(
        "error",
        `Health check failed:${error?.message || error || ""}`,
        "health.controller:getHealthStatus",
      );

      const adaptedResponse = httpResponseFailed(
        "Internal health check failure",
      );
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(adaptedResponse);

      return;
    }
  }
}
