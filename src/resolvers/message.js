import { combineResolvers } from "graphql-resolvers";
import { isAuth, isMessageOwner } from "./auth";
import { encode, decode } from "../helpers/base64";

export default {
  Query: {
    messages: combineResolvers(isAuth, async (parent, { cursor, limit = 10 }, { models: { Message } }) => {
      const cursorOpts = cursor ? { createdAt: { $lt: decode(cursor) } } : {};
      const messages = await Message.find(cursorOpts, null, {
        sort: { createdAt: -1 },
        limit: limit + 1,
      });
      const totalCount = await Message.count();
      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;
      const endCursor = encode(edges[edges.length - 1].createdAt.toString());
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
        totalCount,
      };
    }),
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
  },
};
