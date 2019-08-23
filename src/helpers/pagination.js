import { ApolloError } from "apollo-server";
import { encode, decode } from "./base64";
import { ERROR_NOT_FOUND_CODE } from "../constants";

export const createCursorPaginator = (Entity, sortField) => async (cursor, limit = 10, filter = {}) => {
  const cursorOpts = cursor ? { ...filter, [sortField]: { $lt: decode(cursor) } } : filter;
  const result = await Entity.find(cursorOpts, null, {
    sort: { [sortField]: -1 },
    limit: limit + 1,
  });
  const totalCount = await Entity.countDocuments(filter);
  const hasNextPage = result.length > limit;
  const edges = hasNextPage ? result.slice(0, -1) : result;
  if (result.length === 0) {
    throw new ApolloError("Not found", ERROR_NOT_FOUND_CODE);
  }
  const lastSortField = edges[edges.length - 1][sortField].toString();
  const endCursor = encode(lastSortField);
  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
    totalCount,
  };
};
