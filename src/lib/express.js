import express from "express";
import cors from "cors";
import expressWinston from "express-winston";
import apolloServer from "./apollo";
import winston from "./winston";

const app = express();

app.use(cors());
app.use(
  expressWinston.logger({
    winstonInstance: winston,
    expressFormat: true,
    meta: true,
    colorize: true,
  }),
);

apolloServer.applyMiddleware({ app, path: "/graphql" });

export default app;
