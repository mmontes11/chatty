import jwt from "jsonwebtoken";

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, secret, { expiresIn });
};

export const getAuthorizationToken = req => {
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
