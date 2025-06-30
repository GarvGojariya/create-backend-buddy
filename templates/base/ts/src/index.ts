import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
// ##DB_IMPORT##

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ##DB_INIT##

app.get("/", (_req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
