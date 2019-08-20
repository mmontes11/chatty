import { ForbiddenError, UserInputError } from "apollo-server";
import { combineResolvers, skip } from "graphql-resolvers";

const unauthorizedError = new ForbiddenError("Unauthorized");

export const isAuth = (parent, args, { me }) => (me ? skip : unauthorizedError);

export const isBasicAuth = (parent, args, { isBasicAuth: basicAuth }) => (basicAuth ? skip : unauthorizedError);

export const isAdmin = (parent, args, { models: { User }, me }) => {
  if (!me) {
    return unauthorizedError;
  }
  return me && User.isAdmin(me) ? skip : unauthorizedError;
};

export const isMessageOwner = combineResolvers(isAuth, async (parent, { id }, { models: { Message }, me }) => {
  const message = await Message.findById(id);
  if (!message) {
    throw new UserInputError("Message not found");
  }
  if (String(message.userId) !== String(me.id)) {
    throw new ForbiddenError("Not authenticated as owner");
  }
  return skip;
});
