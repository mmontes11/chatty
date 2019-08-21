import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(email: String!, username: String!, password: String): AuthResponse!
    createUser(email: String!, username: String!, password: String!, roles: [String!]!): Boolean!
    login(login: String!, password: String!): AuthResponse!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
    roles: [String!]
    isAdmin: Boolean!
  }

  type AuthResponse {
    token: String!
    isAdmin: Boolean!
  }
`;
