import { Response } from "express";
import {ApiError} from "./ApiError";

class ApiResponse {
  static success(res: Response, data: any, message = "Success") {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  }

  static error(res: Response, error: ApiError | Error) {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error.message || "Internal Server Error";
    const details = error instanceof ApiError ? error.details : undefined;

    res.status(statusCode).json({
      status: "error",
      message,
      ...(details && { details }),
    });
  }
}

export default ApiResponse;
