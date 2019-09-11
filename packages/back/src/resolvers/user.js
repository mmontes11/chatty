import { AuthenticationError, UserInputError } from "apollo-server";
import { combineResolvers } from "graphql-resolvers";
import { createToken } from "../helpers/auth";
import { isBasicAuth } from "./auth";
import config from "../config";

export default {
  Query: {
    me: (parent, args, { me }) => me,
    users: async (parent, args, { models: { User } }) => User.find(),
    user: async (parent, { id }, { models: { User } }) => User.findById(id),
  },
  Mutation: {
    signUp: async (parent, { email, username, password }, { models: { User }, secret }) => {
      const user = await User.create({
        email,
        username,
        password,
      });
      const token = createToken(user, secret, config.tokenExpiration);
      const isAdmin = User.isAdmin(user);
      return { token, isAdmin };
    },
    createUser: combineResolvers(
      isBasicAuth,
      async (parent, { email, username, password, roles }, { models: { User } }) => {
        await User.create({
          email,
          username,
          password,
          roles,
        });
        return true;
      },
    ),
    login: async (parent, { login, password }, { models: { User }, secret }) => {
      const user = await User.findByLogin(login);
      if (!user) {
        throw new UserInputError("User not found");
      }
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        throw new AuthenticationError("Invalid password");
      }
      const token = createToken(user, secret, config.tokenExpiration);
      const isAdmin = User.isAdmin(user);
      return { token, isAdmin };
    },
  },
  User: {
    messages: async ({ id }, { page: { cursor, limit } }, { paginators: { message } }) =>
      message(cursor, limit, { createdBy: id }),
    isAdmin: async (parent, args, { models: { User } }) => User.isAdmin(parent),
  },
};
