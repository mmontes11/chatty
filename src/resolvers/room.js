import { combineResolvers } from "graphql-resolvers";
import { UserInputError } from "apollo-server";
import { isAdmin } from "./auth";

export default {
  Mutation: {
    createRoom: combineResolvers(
      isAdmin,
      async (parent, { name, category: categoryName }, { me: { id }, models: { Category, Room } }) => {
        const category = await Category.findOne({ key: categoryName });
        if (!category) {
          throw new UserInputError("Category not found");
        }
        return Room.create({
          name,
          categoryId: category.id,
          createdBy: id,
        });
      },
    ),
  },
  Room: {
    category: async ({ categoryId }, args, { loaders: { category } }) => category.load(categoryId),
    createdBy: async ({ createdBy }, args, { loaders: { user } }) => user.load(createdBy),
  },
};
