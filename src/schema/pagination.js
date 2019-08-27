import { gql } from "apollo-server-express";

export default gql`
  union Pageable = Message | Topic

  input PageInput {
    cursor: String
    limit: Int
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type PagedResult {
    edges: [Pageable]!
    pageInfo: PageInfo!
    totalCount: Int!
  }
`;
