import { AuthenticationError, UserInputError } from "apollo-server";
import { createToken } from "../helpers/token";
import { TOKEN_EXPIRATION } from "../constants";

export default {
  Query: {
    me: (parent, args, { me }) => me,
    users: async (parent, args, { models: { User } }) => User.find(),
    user: async (parent, { id }, { models: { User } }) => User.findById(id),
  },
  Mutation: {
    signUp: async (parent, { username, email, password }, { models: { User }, secret }) => {
      const user = await User.create({
        username,
        email,
        password,
      });
      const token = createToken(user, secret, TOKEN_EXPIRATION);
      return { token };
    },
    login: async (parent, { login, password }, { models: { User }, secret }) => {
      const user = await User.findByLogin(login);
      if (!user) {
        throw new UserInputError("User not found");
      }
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        throw new AuthenticationError("Invalid password");
      }
      const token = createToken(user, secret, TOKEN_EXPIRATION);
      return { token };
    },
  },
  User: {
    messages: async ({ id }, args, { models: { Message } }) => Message.find({ userId: id }),
  },
};
