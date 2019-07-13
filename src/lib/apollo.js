import { ApolloServer } from "apollo-server-express";
import schemas from "../schemas";
import resolvers from "../resolvers";
import { me } from "../constants/users";

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: {
    me,
  },
});

export default server;
