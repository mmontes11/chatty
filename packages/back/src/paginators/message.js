import { ApolloError } from "apollo-server";
import { encode, decode } from "../helpers/base64";
import { ERROR_NOT_FOUND_CODE } from "../constants";
import models from "../models";

const { Message } = models;

export default async (cursor, limit = 10, filter = {}) => {
  const cursorOpts = cursor ? { ...filter, createdAt: { $lt: decode(cursor) } } : filter;
  const result = await Message.find(cursorOpts, null, {
    sort: { createdAt: -1 },
    limit: limit + 1,
  });
  const totalCount = await Message.countDocuments(filter);
  const hasNextPage = result.length > limit;
  const edges = hasNextPage ? result.slice(0, -1) : result;
  if (result.length === 0) {
    throw new ApolloError("Not found", ERROR_NOT_FOUND_CODE);
  }
  const last = edges[edges.length - 1].createdAt.toString();
  const endCursor = encode(last);
  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
    },
    totalCount,
  };
};
