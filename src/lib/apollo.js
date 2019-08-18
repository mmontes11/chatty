import { ApolloServer, AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import schema from "../schema";
import resolvers from "../resolvers";
import models from "../models";
import config from "../config";
import { getAuthorizationToken } from "../helpers/token";

const getMe = async req => {
  const authorization = getAuthorizationToken(req);
  if (!authorization) {
    return null;
  }
  const { type, token } = authorization;
  if (type.toLowerCase() !== "bearer" || !token) {
    return null;
  }
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (e) {
    throw new AuthenticationError("Invalid credentials");
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
