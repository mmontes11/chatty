import { HASHTAG_REGEX } from "../constants";

export const getTopics = searchText => {
  const result = searchText.match(HASHTAG_REGEX);
  if (result) {
    return Array.from(new Set(result)).sort();
  }
  return [];
};
