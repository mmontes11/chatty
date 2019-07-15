import { toCursorHash, fromCursorHash } from "../helpers/cursor";

export default {
  Query: {
    messages: async (parent, { cursor, limit = 10 }, { models: { Message } }) => {
      const cursorOpts = cursor ? { createdAt: { $lt: fromCursorHash(cursor) } } : {};
      const messages = await Message.find(cursorOpts, null, {
        sort: { createdAt: -1 },
        limit: limit + 1,
      });
      const totalCount = await Message.count();
      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;
      const endCursor = toCursorHash(edges[edges.length - 1].createdAt.toString());
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
        totalCount,
      };
    },
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
      throw new Error("Message not found");
    },
  },
  Message: {
    user: async ({ userId }, args, { models: { User } }) => User.findById(userId),
  },
};
