import { ApolloServer } from "apollo-server-express";
import schema from "../schema";
import resolvers from "../resolvers";
import { me } from "../constants/users";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me,
  },
});

export default server;
