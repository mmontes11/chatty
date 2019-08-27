import { combineResolvers } from "graphql-resolvers";
import { isAuth } from "./auth";

export default {
  Query: {
    topics: combineResolvers(isAuth, async (parent, args, { paginators: { topic } }) => topic()),
  },
};
