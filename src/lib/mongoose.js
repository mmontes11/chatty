import mongoose from "mongoose";
import config from "../config";
import logger from "../utils/logger";

if (config.debug) {
  mongoose.set("debug", (collectionName, method, query, result) => {
    logger.logInfo(`MongoDB query: ${collectionName}.${method}(${JSON.stringify(query)})`);
    logger.logInfo(`MongoDB result: ${JSON.stringify(result)}`);
  });
}

mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

export default mongoose;
