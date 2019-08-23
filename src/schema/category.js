import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    categories: [Category!]
  }

  extend type Mutation {
    createCategory(key: String!): Category!
  }

  type Category {
    id: ID!
    key: String!
    createdBy: User!
  }
`;
