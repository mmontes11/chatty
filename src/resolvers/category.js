import { combineResolvers } from "graphql-resolvers";
import { isAuth, isAdmin } from "./auth";

export default {
  Query: {
    categories: combineResolvers(isAuth, async (parent, args, { models: { Category } }) => Category.find({})),
  },
  Mutation: {
    createCategory: combineResolvers(isAdmin, async (parent, { key }, { models: { Category }, me: { id } }) =>
      Category.create({ key, createdBy: id }),
    ),
  },
  Category: {
    createdBy: async ({ createdBy }, args, { loaders: { user } }) => user.load(createdBy),
  },
};
