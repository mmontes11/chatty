import "dotenv/config";
import { Server } from "http";
import app from "./lib/express";
import config from "./config/index";
import logger from "./utils/logger";

const server = new Server(app);

server.on("error", err => {
  logger.logError(`Error in NodeJS server on port ${config.nodePort}:`);
  logger.logError(err);
});
server.on("close", () => {
  logger.logInfo(`Stopped NodeJS server on port ${config.nodePort}`);
});

server.listen(config.nodePort, err => {
  if (!err) {
    logger.logInfo(`NodeJS server started on port ${config.nodePort}`);
  }
});

process.on("SIGINT", () => {
  server.close();
});

export default server;
