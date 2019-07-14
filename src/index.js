import "dotenv/config";
import { Server } from "http";
import app from "./lib/express";
import mongoose from "./lib/mongoose";
import config from "./config/index";
import logger from "./utils/logger";

const server = new Server(app);

mongoose.connection.on("connected", () => {
  logger.logInfo(`Connected to MongoDB ${config.mongoUrl}`);
});
mongoose.connection.on("error", err => {
  logger.logError(`Error in MongoDB ${config.mongoUrl}:`);
  logger.logError(err);
});
mongoose.connection.on("disconnected", () => {
  logger.logInfo(`Disconnected from MongoDB ${config.mongoUrl}`);
});

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
  mongoose.connection.close();
  server.close();
});

export default server;
