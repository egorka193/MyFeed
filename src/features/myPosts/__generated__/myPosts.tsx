/* eslint-disable react-refresh/only-export-components */
import type * as Types from "../../../shared/types/api-types";

import type { DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type MyPostsVariables = Types.Exact<{
  input: Types.FindMyPostsRequest;
}>;

export type MyPosts = {
  __typename: "Query";
  myPosts: {
    __typename: "FindMyPostsPaginationResponse";
    data?: Array<{
      __typename: "PostModel";
      id: string;
      title: string;
      description: string;
      isLiked: boolean;
      likesCount: number;
      mediaUrl: string;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string | null;
      authorId: string;
      author: {
        __typename: "UserModel";
        id: string;
        firstName?: string | null;
        lastName?: string | null;
        middleName?: string | null;
        avatarUrl?: string | null;
        email: string;
        createdAt: string;
        updatedAt: string;
      };
    }> | null;
    pageInfo?: {
      __typename: "PageAfterCursorInfo";
      count: number;
      perPage: number;
      afterCursor?: string | null;
    } | null;
  };
};

export type MyPostDeleteVariables = Types.Exact<{
  input: Types.PostIdRequest;
}>;

export type MyPostDelete = {
  __typename: "Mutation";
  postDelete: { __typename: "DeletePostResponse"; ok: boolean };
};

export const MyPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "myPosts" },
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
              name: { kind: "Name", value: "FindMyPostsRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myPosts" },
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
                        name: { kind: "Name", value: "isLiked" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "likesCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mediaUrl" },
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
                        name: { kind: "Name", value: "deletedAt" },
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
                              name: { kind: "Name", value: "middleName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatarUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "updatedAt" },
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
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "perPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "afterCursor" },
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
 * __useMyPosts__
 *
 * To run a query within a React component, call `useMyPosts` and pass it any options that fit your needs.
 * When your component renders, `useMyPosts` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPosts({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyPosts(
  baseOptions: Apollo.QueryHookOptions<MyPosts, MyPostsVariables> &
    ({ variables: MyPostsVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyPosts, MyPostsVariables>(MyPostsDocument, options);
}
export function useMyPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyPosts, MyPostsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyPosts, MyPostsVariables>(
    MyPostsDocument,
    options,
  );
}
export function useMyPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MyPosts, MyPostsVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyPosts, MyPostsVariables>(
    MyPostsDocument,
    options,
  );
}
export type MyPostsHookResult = ReturnType<typeof useMyPosts>;
export type MyPostsLazyQueryHookResult = ReturnType<typeof useMyPostsLazyQuery>;
export type MyPostsSuspenseQueryHookResult = ReturnType<
  typeof useMyPostsSuspenseQuery
>;
export type MyPostsQueryResult = Apollo.QueryResult<MyPosts, MyPostsVariables>;
export const MyPostDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "myPostDelete" },
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
              name: { kind: "Name", value: "PostIdRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "postDelete" },
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
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type MyPostDeleteMutationFn = Apollo.MutationFunction<
  MyPostDelete,
  MyPostDeleteVariables
>;

/**
 * __useMyPostDelete__
 *
 * To run a mutation, you first call `useMyPostDelete` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyPostDelete` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myPostDelete, { data, loading, error }] = useMyPostDelete({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyPostDelete(
  baseOptions?: Apollo.MutationHookOptions<MyPostDelete, MyPostDeleteVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MyPostDelete, MyPostDeleteVariables>(
    MyPostDeleteDocument,
    options,
  );
}
export type MyPostDeleteHookResult = ReturnType<typeof useMyPostDelete>;
export type MyPostDeleteMutationResult = Apollo.MutationResult<MyPostDelete>;
export type MyPostDeleteMutationOptions = Apollo.BaseMutationOptions<
  MyPostDelete,
  MyPostDeleteVariables
>;
