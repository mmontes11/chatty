import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
