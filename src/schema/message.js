import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    createdBy: User!
    createdAt: String!
  }

  type MessageConnection {
    edges: [Message]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
`;
