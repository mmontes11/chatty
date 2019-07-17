import { createToken } from "../helpers/token";

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
      const token = createToken(user, secret, "30m");
      return { token };
    },
  },
  User: {
    messages: async ({ id }, args, { models: { Message } }) => Message.find({ userId: id }),
  },
};
