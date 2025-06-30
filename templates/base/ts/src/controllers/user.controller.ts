import { Request, Response } from "express";
import logger from "../utils/logger";
import ApiResponse from "../utils/ApiResponse";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  // Simulate fetching users from a database
  const users = [{ id: 1, name: "Default User" }];
  try {
    // Here you would typically fetch users from your database
    return ApiResponse.success(res, users, "Users fetched successfully");
  } catch (error: unknown) {
    logger.error("Error fetching users:", error);
    return ApiResponse.error(
      res,
      error instanceof Error
        ? error
        : new Error((error as string) || "Unknown error")
    );
  }
};
