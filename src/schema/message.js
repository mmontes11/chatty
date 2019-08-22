import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    messages(page: PageInput!): PagedResult!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!, room: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    room: Room!
    createdBy: User!
    createdAt: String!
  }
`;
