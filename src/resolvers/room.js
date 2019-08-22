import { combineResolvers } from "graphql-resolvers";
import { UserInputError } from "apollo-server";
import { isAdmin } from "./auth";

export default {
  Mutation: {
    createRoom: combineResolvers(
      isAdmin,
      async (parent, { name, category: categoryIdOrKey }, { me: { id }, models: { Category, Room } }) => {
        let category = await Category.findOne({ key: categoryIdOrKey });
        if (!category) {
          category = await Category.findById(categoryIdOrKey);
          if (!category) {
            throw new UserInputError("Category not found");
          }
        }
        return Room.create({
          name,
          category,
          createdBy: id,
        });
      },
    ),
  },
  Room: {
    category: async ({ category: categoryId }, args, { loaders: { category } }) => category.load(categoryId),
    createdBy: async ({ createdBy }, args, { loaders: { user } }) => user.load(createdBy),
  },
};