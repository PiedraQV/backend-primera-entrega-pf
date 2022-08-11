import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const authMiddleware = (req, res, next) => {
  if (!req.auth) res.status(403).send(returnMessage(true, "Error -1: " + req.originalUrl + " no autorizado", null));
  else next();
};

export const returnMessage = (isError, message, payload) => {
  return {
    status: isError ? "error" : "success",
    message,
    payload,
  };
}