import ApiResponse from "../utils/ApiResponse";
import logger from "../utils/logger";

export const getUsers = async (req, res) => {
  // Simulate fetching users from a database
  const users = [{ id: 1, name: "Default User" }];
  try {
    // Here you would typically fetch users from your database
    return ApiResponse.success(res, users, "Users fetched successfully");
  } catch (error) {
    logger.error("Error fetching users:", error);
    return ApiResponse.error(res, error);
  }
};
