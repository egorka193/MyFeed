/* eslint-disable react-refresh/only-export-components */
import type * as Types from "../../../../shared/types/api-types";

import type { DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetPostsVariables = Types.Exact<{
  input: Types.FindPostsRequest;
}>;

export type GetPosts = {
  __typename: "Query";
  posts: {
    __typename: "FindPostsPaginationResponse";
    data?: Array<{
      __typename: "PostModel";
      id: string;
      title: string;
      description: string;
      mediaUrl: string;
      isLiked: boolean;
      likesCount: number;
      createdAt: string;
      updatedAt: string;
      authorId: string;
      author: {
        __typename: "UserModel";
        id: string;
        firstName?: string | null;
        lastName?: string | null;
        avatarUrl?: string | null;
        createdAt: string;
        updatedAt: string;
        email: string;
      };
    }> | null;
    pageInfo?: {
      __typename: "PageAfterCursorInfo";
      afterCursor?: string | null;
      count: number;
      perPage: number;
    } | null;
  };
};

export const GetPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPosts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FindPostsRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "posts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mediaUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isLiked" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "likesCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "authorId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "author" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatarUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "updatedAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "afterCursor" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "perPage" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useGetPosts__
 *
 * To run a query within a React component, call `useGetPosts` and pass it any options that fit your needs.
 * When your component renders, `useGetPosts` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPosts({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPosts(
  baseOptions: Apollo.QueryHookOptions<GetPosts, GetPostsVariables> &
    ({ variables: GetPostsVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPosts, GetPostsVariables>(
    GetPostsDocument,
    options,
  );
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPosts, GetPostsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPosts, GetPostsVariables>(
    GetPostsDocument,
    options,
  );
}
export function useGetPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPosts, GetPostsVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPosts, GetPostsVariables>(
    GetPostsDocument,
    options,
  );
}
export type GetPostsHookResult = ReturnType<typeof useGetPosts>;
export type GetPostsLazyQueryHookResult = ReturnType<
  typeof useGetPostsLazyQuery
>;
export type GetPostsSuspenseQueryHookResult = ReturnType<
  typeof useGetPostsSuspenseQuery
>;
export type GetPostsQueryResult = Apollo.QueryResult<
  GetPosts,
  GetPostsVariables
>;
