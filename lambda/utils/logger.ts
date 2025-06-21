export const logger = (
  level: "error" | "info" | "warn" | 'debug',
  message: string,
  place: string,
) => {
  return console[level](message, " Place:", place);
};
