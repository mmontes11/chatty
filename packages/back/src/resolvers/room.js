import { combineResolvers } from "graphql-resolvers";
import { UserInputError } from "apollo-server";
import { isAuth, isAdmin } from "./auth";

export default {
  Query: {
    rooms: combineResolvers(isAuth, async (parent, args, { models: { Room } }) => Room.find({})),
    room: combineResolvers(isAuth, async (parend, { id }, { models: { Room } }) => Room.findById(id)),
  },
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
    messages: async ({ id }, { page: { cursor, limit } }, { paginators: { message } }) =>
      message(cursor, limit, { room: id }),
  },
};
