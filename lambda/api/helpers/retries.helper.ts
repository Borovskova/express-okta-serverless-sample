import { timeout } from "../helpers/timeout.helper";
import { logger } from "../../utils/logger";

export async function retry<T>(
  operationName: string,
  maxRetryAttempts: number,
  retryableErrorsSet: Set<string>,
  retryTimeout: number,
  attemptFn: () => Promise<T>,
  errorGeneratorFn: (error: any) => string,
): Promise<T> {
  let attempt = 0;
  while (attempt <= maxRetryAttempts) {
    try {
      return await attemptFn();
    } catch (error: any) {
      const errorLogMsg: string = errorGeneratorFn(error);
      const isRetryable = retryableErrorsSet.has(error.name);
      const isLastAttempt = attempt === maxRetryAttempts;
      if (isRetryable && !isLastAttempt) {
        attempt++;
        logger(
          "warn",
          `Retrying ${operationName} (attempt ${attempt}) due to ${error.name}: ${error.message}`,
          `retries.helper:retry`,
        );
        await timeout(retryTimeout);

        continue;
      }

      const enrichedError = new Error(errorLogMsg);
      enrichedError.name = error.name;
      enrichedError.stack = error.stack;

      throw enrichedError;
    }
  }

  throw new Error(`Exceeded max retry attempts for ${operationName}`);
}
