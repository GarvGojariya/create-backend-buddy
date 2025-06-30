import { Request, Response } from "express";
import logger from "../utils/logger";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  // Simulate fetching users from a database
  const users = [{ id: 1, name: "Default User" }];
  try {
    // Here you would typically fetch users from your database
    res.json(users);
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
