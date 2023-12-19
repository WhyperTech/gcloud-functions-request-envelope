import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request', issues?: any) {
    super(message, 400, issues);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}