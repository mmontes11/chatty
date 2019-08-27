import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    topics(page: PageInput!): PagedResult!
  }

  type Topic {
    name: String!
  }
`;
