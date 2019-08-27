import models from "../models";

const { Message } = models;

export default async () => {
  const pipeline = [
    { $unwind: "$topics" },
    {
      $group: {
        _id: "$topics",
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
      },
    },
  ];
  const result = await Message.aggregate(pipeline);
  return {
    edges: result,
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
    totalCount: 0,
  };
};
