import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.NODE_ENV || process.env.NODE_ENV === "local") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });
}

const { NODE_ENV, PORT, AWS_LAMBDA_FUNCTION_NAME, DEFAULT_AWS_REGION } =
  process.env;

export const config = {
  NODE_ENV,
  PORT: Number(PORT),
  AWS_LAMBDA_FUNCTION_NAME,
  DEFAULT_AWS_REGION,
};
