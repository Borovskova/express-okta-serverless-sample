import serverless from "serverless-http";

import app from "./app";
import { config } from "process";
import { logger } from "./utils/logger";

export const handler = async (event, context) => {
  logger(
    "info",
    `App running in AWS Lambda environment. Env:${config.NODE_ENV};`,
    "handler:handler",
  );
  const lambdaHandler = serverless(app);

  return lambdaHandler(event, context);
};
