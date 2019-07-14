export default {
  Query: {
    me: (parent, args, { me }) => me,
    users: async (parent, args, { models: { User } }) => User.find(),
    user: async (parent, { id }, { models: { User } }) => User.findById(id),
  },
  User: {
    messages: async ({ id }, args, { models: { Message } }) => Message.find({ userId: id }),
  },
};
