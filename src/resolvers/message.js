import { UserInputError } from "apollo-server";
import { combineResolvers } from "graphql-resolvers";
import { isAuth, isMessageOwner } from "./auth";
import { getTopics } from "../helpers/topic";

export default {
  Query: {
    messages: combineResolvers(isAuth, async (parent, { page: { cursor, limit } }, { paginators: { message } }) =>
      message(cursor, limit),
    ),
    message: combineResolvers(isAuth, async (parent, { id }, { models: { Message } }) => Message.findById(id)),
  },
  Mutation: {
    createMessage: combineResolvers(
      isAuth,
      async (parent, { text, room: roomId }, { models: { Message, Room }, me: { id } }) => {
        const room = await Room.findById(roomId);
        if (!room) {
          throw new UserInputError("Room not found");
        }
        const topics = getTopics(text);
        return Message.create({
          text,
          topics,
          room,
          createdBy: id,
        });
      },
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
    room: async ({ room: roomId }, args, { loaders: { room } }) => room.load(roomId),
    createdBy: async ({ createdBy }, args, { loaders: { user } }) => user.load(createdBy),
    createdAt: ({ createdAt }) => createdAt.toISOString(),
  },
};
