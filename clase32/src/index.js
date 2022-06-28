import Config from "./config";
import { connectDb } from "./services/db";
import Server from "./services/server";
import { args } from "./arguments";
import winston from "winston";
import cluster from 'cluster';

const puerto = args._[0] || args.puerto;
const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;
const logConfiguration = {
  level: "info",
  format: combine(
    timestamp({
      format: "DD-MMM-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);

const init = () => {
  connectDb();

  const server = Server.listen(puerto, () =>
    logger.info(`Escuchando en puerto ${puerto} - PID Worker ${process.pid}`)
  );

  server.on("error", (err) => logger.error(`Error en el servidor: ${err}`));
};

init();
