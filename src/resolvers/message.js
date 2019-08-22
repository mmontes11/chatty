import { combineResolvers } from "graphql-resolvers";
import { isAuth, isMessageOwner } from "./auth";

export default {
  Query: {
    messages: combineResolvers(isAuth, async (parent, { cursor, limit = 10 }, { paginators: { message } }) =>
      message(cursor, limit),
    ),
    message: combineResolvers(isAuth, async (parent, { id }, { models: { Message } }) => Message.findById(id)),
  },
  Mutation: {
    createMessage: combineResolvers(isAuth, async (parent, { text }, { models: { Message }, me: { id } }) =>
      Message.create({
        text,
        createdBy: id,
      }),
    ),
    deleteMessage: combineResolvers(isMessageOwner, async (parent, { id }, { models: { Message } }) => {
      const message = await Message.findById(id);
      if (message) {
        await message.remove();
        return true;
      }
      throw new Error("Message not found");
    }),
  },
  Message: {
    createdBy: async ({ createdBy }, args, { loaders: { user } }) => user.load(createdBy),
    createdAt: ({ createdAt }) => createdAt.toISOString(),
  },
};
