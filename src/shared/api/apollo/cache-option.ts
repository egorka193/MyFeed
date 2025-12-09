import { type InMemoryCacheConfig } from "@apollo/client";
import { cursorPagination } from "./fields-policies";

export const cacheOption: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        posts: cursorPagination(),
        myPosts: cursorPagination(),
        favouritePosts: cursorPagination(),
        userMe: cursorPagination(),
      },
    },
  },
};
