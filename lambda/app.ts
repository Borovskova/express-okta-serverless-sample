import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParserXml from "body-parser-xml";

import publicRoutes from "./api/routes/index";
import privateRoutes from "./api/routes/private";
import corsConfig from "./config/cors";
import { AuthMiddleware } from "./api/middlewares/auth.middleware";
import { logger } from "./utils/logger";
import { config } from "./config";

const runningOnLambda = !!process.env.LAMBDA_TASK_ROOT;
const app = express();
const { NODE_ENV, PORT } = config;

bodyParserXml(express);

app.use(cors(corsConfig));

if (!runningOnLambda) {
  app.use((req: Request | any, res: Response, next: NextFunction) => {
    req.invocationId = `local_${Date.now()}`;
    next();
  });
}

app.use("/api/public", publicRoutes);
app.use(
  "/api/private",
  async (req: Request, res: Response, next: NextFunction) => {
    await AuthMiddleware.validateToken(req, res, next);
  },
  privateRoutes,
);

if (!runningOnLambda) {
  app.listen(PORT, () => {
    logger(
      "info",
      `Local server running on http://localhost:${PORT}. NODE_ENV=${NODE_ENV}`,
      "app.ts",
    );
  });
}

export default app;
