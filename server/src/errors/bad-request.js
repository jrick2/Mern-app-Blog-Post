import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api";

export class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}
