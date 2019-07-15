export default {
  Query: {
    messages: async (parent, args, { models: { Message } }) => Message.find(),
    message: async (parent, { id }, { models: { Message } }) => Message.findById(id),
  },
  Mutation: {
    createMessage: async (parent, { text }, { models: { Message }, me: { id } }) =>
      Message.create({
        text,
        userId: id,
      }),
    deleteMessage: async (parent, { id }, { models: { Message } }) => {
      const message = await Message.findById(id);
      if (message) {
        await message.remove();
        return true;
      }
      return false;
    },
  },
  Message: {
    user: async ({ userId }, args, { models: { User } }) => User.findById(userId),
  },
};
