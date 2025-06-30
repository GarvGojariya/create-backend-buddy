class ApiResponse {
  static success(res, data, message = "Success") {
    res.status(200).json({
      status: "success",
      message,
      data,
    });
  }

  static error(res, error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
      details: error.details || {},
    });
  }
}
export default ApiResponse;