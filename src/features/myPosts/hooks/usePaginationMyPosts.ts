
import { useEffect, useCallback } from "react";
import { useMyPostsLazyQuery } from "../__generated__/myPosts";

export const usePaginationMyPosts = () => {
  const [getPaginatedPosts, { data, fetchMore, loading, error }] = useMyPostsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  const afterCursor = data?.myPosts.pageInfo?.afterCursor ?? "";
  const totalCount = data?.myPosts.pageInfo?.count ?? 0;
  const posts = data?.myPosts.data ?? [];
  const hasMore = totalCount > posts.length;

  const fetchPosts = useCallback(async (cursor: string | null = "") => {
    await getPaginatedPosts({
      variables: { input: { limit: 10, afterCursor: cursor } },
    });
  }, [getPaginatedPosts]);

  const getMorePosts = useCallback(async () => {
    if (!hasMore) return;
    await fetchMore({
      variables: { input: { limit: 10, afterCursor } },
    });
  }, [afterCursor, fetchMore, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading: loading, hasMore, getMorePosts, error };
};

