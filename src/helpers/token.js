import jwt from "jsonwebtoken";

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, secret, { expiresIn });
};
