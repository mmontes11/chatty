export default {
  Query: {
    messages: async (parent, args, { models: { Message } }) => Message.find(),
    message: async (parent, { id }, { models: { Message } }) => Message.findById(id),
  },
  Message: {
    user: async ({ userId }, args, { models: { User } }) => User.findById(userId),
  },
};
