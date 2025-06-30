import pino from "pino";
import fs from "fs";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";
const logDirectory = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const streams = isDev
  ? [
      {
        stream: pino.transport({
          target: "pino-pretty",
          options: { colorize: true },
        }),
      },
    ]
  : [
      {
        stream: fs.createWriteStream(path.join(logDirectory, "app.log"), {
          flags: "a",
        }),
      },
    ];

const logger = pino({ level: "info" }, pino.multistream(streams));

export default logger;
