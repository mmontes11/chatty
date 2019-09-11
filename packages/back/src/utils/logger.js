import winston from "../lib/winston";
import config from "../config/index";

class Logger {
  constructor(debug) {
    this.debug = debug;
  }
  logInfo(message) {
    if (this.debug) {
      winston.info(message);
    }
  }
  logError(message) {
    if (this.debug) {
      winston.error(message);
    }
  }
}

const logger = new Logger(config.debug);

export default logger;
