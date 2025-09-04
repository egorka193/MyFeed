import * as Types from "../../../types/api-types";

import { type DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UserMeVariables = Types.Exact<{ [key: string]: never }>;

export type UserMe = {
  __typename: "Query";
  userMe: {
    __typename: "UserModel";
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    birthDate?: string | null;
    gender?: string | null;
    phone?: string | null;
    country?: string | null;
    avatarUrl?: string | null;
  };
};

export const UserMeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserMe" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userMe" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "middleName" } },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "country" } },
                { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useUserMe__
 *
 * To run a query within a React component, call `useUserMe` and pass it any options that fit your needs.
 * When your component renders, `useUserMe` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMe({
 *   variables: {
 *   },
 * });
 */
export function useUserMe(
  baseOptions?: Apollo.QueryHookOptions<UserMe, UserMeVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserMe, UserMeVariables>(UserMeDocument, options);
}
export function useUserMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserMe, UserMeVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserMe, UserMeVariables>(UserMeDocument, options);
}
export function useUserMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UserMe, UserMeVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserMe, UserMeVariables>(
    UserMeDocument,
    options,
  );
}
export type UserMeHookResult = ReturnType<typeof useUserMe>;
export type UserMeLazyQueryHookResult = ReturnType<typeof useUserMeLazyQuery>;
export type UserMeSuspenseQueryHookResult = ReturnType<
  typeof useUserMeSuspenseQuery
>;
export type UserMeQueryResult = Apollo.QueryResult<UserMe, UserMeVariables>;
