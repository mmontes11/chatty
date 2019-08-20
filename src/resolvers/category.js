import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "./auth";

export default {
  Mutation: {
    createCategory: combineResolvers(isAdmin, async (parent, { key }, { models: { Category }, me: { id } }) =>
      Category.create({ key, createdBy: id }),
    ),
  },
  Category: {
    createdBy: async ({ createdBy }, args, { loaders: { user } }) => user.load(createdBy),
  },
};
