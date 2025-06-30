import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/user.route.js";
import logger from "./utils/logger.js";
// ##DB_IMPORT##

dotenv.config();

const app = express();
// ##SWAGGER##
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests",
});
app.use(limiter);

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ##DB_INIT##
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("API is running");
});

// ##ROUTES##

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  logger.info(`🚀 Server running at http://localhost:${PORT}`)
);
