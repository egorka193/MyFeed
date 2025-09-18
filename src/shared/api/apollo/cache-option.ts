import { type InMemoryCacheConfig } from "@apollo/client";
import { cursorPagination } from "./fields-policies";
const defaultCursorPagination = cursorPagination();

export const cacheOption: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        posts: defaultCursorPagination,
        userMe: defaultCursorPagination,
        favouritePosts: defaultCursorPagination,
        myPosts: defaultCursorPagination,
      },
    },
  },
};
