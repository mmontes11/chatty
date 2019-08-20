import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import { decode } from "../helpers/base64";
import config from "../config";

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, roles } = user;
  return jwt.sign({ id, email, username, roles }, secret, { expiresIn });
};

const getAuthorizationToken = req => {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  const parts = authorization.split(" ");
  if (parts.length !== 2) {
    return null;
  }
  const [type, token] = parts;
  return { type, token };
};

export const getCurrentUser = req => {
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

export const isBasicAuth = req => {
  const authorization = getAuthorizationToken(req);
  if (!authorization) {
    return false;
  }
  const { type, token } = authorization;
  if (type.toLowerCase() !== "basic" || !token) {
    return false;
  }
  const decodedToken = decode(token);
  const parts = decodedToken.split(":");
  if (parts.length !== 2) {
    return false;
  }
  const [user, password] = parts;
  if (!user || !password) {
    return false;
  }
  const configPassword = config.basicAuth[user];
  if (!configPassword) {
    return false;
  }
  return password === configPassword;
};
