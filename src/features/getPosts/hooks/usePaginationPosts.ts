import { useEffect, useCallback } from "react";
import { useGetPostsLazyQuery } from "../api/__generated__/getPosts";
import { PostFilterType } from "@/shared/types/api-types";

export const usePaginationPosts = (filterType: PostFilterType) => {
  const [getPaginatedPosts, { data, fetchMore, loading }] =
    useGetPostsLazyQuery({
      fetchPolicy: "cache-and-network",
    });

  const afterCursor = data?.posts?.pageInfo?.afterCursor;

  const getPosts = useCallback(async () => {
    await getPaginatedPosts({
      variables: {
        input: {
          limit: 10,
          afterCursor: null,
          type: filterType,
        },
      },
    });
  }, [getPaginatedPosts, filterType]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const getMorePosts = async () => {
    if (!afterCursor) {
      return;
    }

    await fetchMore({
      variables: { input: { limit: 10, afterCursor, type: filterType } },
    });
  };

  return { isLoading: loading, getPosts, getMorePosts, data };
};
