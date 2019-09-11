import { AuthenticationError, ForbiddenError, UserInputError } from "apollo-server";
import { combineResolvers, skip } from "graphql-resolvers";

const authenticationError = new AuthenticationError("Authentication error");
const forbiddenError = new ForbiddenError("Invalid credentials");

export const isAuth = (parent, args, { me }) => (me ? skip : authenticationError);

export const isBasicAuth = (parent, args, { isBasicAuth: basicAuth }) => (basicAuth ? skip : authenticationError);

export const isAdmin = combineResolvers(isAuth, (parent, args, { models: { User }, me }) =>
  User.isAdmin(me) ? skip : forbiddenError,
);

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
