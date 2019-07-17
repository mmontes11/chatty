import { ApolloServer, AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import schema from "../schema";
import resolvers from "../resolvers";
import models from "../models";
import config from "../config";

const getMe = async req => {
  const token = req.headers["x-token"];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (e) {
    throw new AuthenticationError("Your session expired. Log in again");
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: config.jwtSecret,
    };
  },
});

export default server;
