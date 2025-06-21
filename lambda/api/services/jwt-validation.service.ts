import jwt from "jsonwebtoken";

import { HttpRequestService } from "./http-request.service";
import { CRUDHttpMethods } from "../enums/crud.enum";
import { OktaConfig } from "lambda/config/okta";

const { issuer, audience, jwksUri } = OktaConfig;

export class JwtService {
  static async validateToken(token: string): Promise<any> {
    const tokenParts = token.split(".");
    const header = JSON.parse(atob(tokenParts[0]));
    const kid = header.kid;
    const publicKey = await JwtService.getSigningKey(kid);

    try {
      return jwt.verify(token, publicKey, {
        audience: audience,
        issuer: issuer,
        algorithms: ["RS256"],
      });
    } catch (error) {
      const errorMessage = `An error has occured during Okta token verification. Message: ${error?.message || ""}`;

      throw new Error(errorMessage);
    }
  }

  private static async getSigningKey(kid: string): Promise<string> {
    try {
      const data = await HttpRequestService.executeHttp(
        CRUDHttpMethods.GET,
        jwksUri,
        {},
        `retrieve Okta signing key`,
      );

      if (!data.keys || data.keys.length === 0) {
        throw new Error("No Okta signing keys found in JWKS.");
      }

      const key = data.keys.find((k) => k.kid === kid);
      if (!key) {
        throw new Error(
          "No matching Okta signing key found based on provided token",
        );
      }
      const signingKey = JwtService.createPemKey(key.n, key.e);

      return signingKey;
    } catch (error) {
      const errorMessage = `An error has occured during retrieving signing key from Okta API. Message: ${error?.response?.data?.errorSummary || error?.message || "seems like Okta API is unavailable."}`;

      throw new Error(errorMessage);
    }
  }

  private static createPemKey(n: string, e: string): string {
    const modulus = Buffer.from(n, "base64").toString("hex");
    const exponent = Buffer.from(e, "base64").toString("hex");

    return (
      `-----BEGIN RSA PUBLIC KEY-----\n` +
      Buffer.from(`3082010a0282010100${modulus}0203${exponent}`, "hex")
        .toString("base64")
        .match(/.{1,64}/g)
        .join("\n") +
      `\n-----END RSA PUBLIC KEY-----`
    );
  }
}
