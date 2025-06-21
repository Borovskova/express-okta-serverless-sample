import { NextFunction, Request, Response } from "express";

import { HttpStatus } from "../enums/http-status.enum.js";
import { httpResponseFailed } from "../helpers/api-response.helper";
import { JwtService } from "../services/jwt-validation.service";
import { logger } from "lambda/utils/logger.js";

export class AuthMiddleware {
  static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token: string | string[] =
      req.headers["authorization"] || req.headers["Authorization"];
    if (!token) {
      res
        .status(HttpStatus.UNAUTHIRIZED)
        .json(httpResponseFailed("Authentication token required"));

      return;
    }

    try {
      const extractedToken = (token as string).replace(/bearer/gim, "").trim();
      const payload = await JwtService.validateToken(extractedToken);
      (req as any).user = payload;
      next();
    } catch (error) {
      const errorMsg: string =
        error?.message || "Error during auth token validation;";
      logger("error", errorMsg, "auth.middleware:validateToken");

      res.status(HttpStatus.UNAUTHIRIZED).json(httpResponseFailed(errorMsg));

      return;
    }
  }
}
