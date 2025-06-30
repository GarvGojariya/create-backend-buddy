import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.route.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to your modular Express backend!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
