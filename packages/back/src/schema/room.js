import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    rooms: [Room!]
    room(id: ID!): Room!
  }

  extend type Mutation {
    createRoom(name: String!, category: String!): Room!
  }

  type Room {
    id: ID!
    name: String!
    category: Category!
    createdBy: User!
    messages(page: PageInput!): PagedResult!
  }
`;
