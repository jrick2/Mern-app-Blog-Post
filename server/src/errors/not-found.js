import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api";

export class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}
