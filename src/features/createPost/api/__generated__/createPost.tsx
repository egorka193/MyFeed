/* eslint-disable react-refresh/only-export-components */
import type * as Types from "../../../../shared/types/api-types";

import type { DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type PostCreateVariables = Types.Exact<{
  input: Types.CreatePostRequest;
}>;

export type PostCreate = {
  __typename: "Mutation";
  postCreate: {
    __typename: "PostModel";
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    likesCount: number;
    isLiked: boolean;
    createdAt: string;
    author: {
      __typename: "UserModel";
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
      avatarUrl?: string | null;
      email: string;
      birthDate?: string | null;
      country?: string | null;
      gender?: string | null;
      phone?: string | null;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string | null;
    };
  };
};

export const PostCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PostCreate" },
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
              name: { kind: "Name", value: "CreatePostRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "postCreate" },
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
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "mediaUrl" } },
                { kind: "Field", name: { kind: "Name", value: "likesCount" } },
                { kind: "Field", name: { kind: "Name", value: "isLiked" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "author" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "birthDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "country" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gender" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
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
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type PostCreateMutationFn = Apollo.MutationFunction<
  PostCreate,
  PostCreateVariables
>;

/**
 * __usePostCreate__
 *
 * To run a mutation, you first call `usePostCreate` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCreate` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCreate, { data, loading, error }] = usePostCreate({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostCreate(
  baseOptions?: Apollo.MutationHookOptions<PostCreate, PostCreateVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PostCreate, PostCreateVariables>(
    PostCreateDocument,
    options,
  );
}
export type PostCreateHookResult = ReturnType<typeof usePostCreate>;
export type PostCreateMutationResult = Apollo.MutationResult<PostCreate>;
export type PostCreateMutationOptions = Apollo.BaseMutationOptions<
  PostCreate,
  PostCreateVariables
>;
