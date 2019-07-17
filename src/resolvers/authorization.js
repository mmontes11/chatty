import { ForbiddenError, UserInputError } from "apollo-server";
import { combineResolvers, skip } from "graphql-resolvers";

export const isAuth = (parent, args, { me }) => (me ? skip : new ForbiddenError("Unauthorized"));

export const isMessageOwner = combineResolvers(isAuth, async (parent, { id }, { models: { Message }, me }) => {
  const message = await Message.findById(id);
  if (!message) {
    throw new UserInputError("Message not found");
  }
  if (message.userId != me.id) {
    throw new ForbiddenError("Not authenticated as owner");
  }
  return skip;
});
