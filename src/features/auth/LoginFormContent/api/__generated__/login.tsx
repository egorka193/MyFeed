import * as Types from "../../../../../shared/types/api-types";

import { type DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type SignInVariables = Types.Exact<{
  input: Types.SignInRequest;
}>;

export type SignIn = {
  __typename: "Mutation";
  userSignIn: {
    __typename: "SignInResponse";
    token?: string | null;
    user?: { __typename: "UserModel"; id: string; email: string } | null;
    problem?: {
      __typename: "EmailOrPasswordIncorrectProblem";
      message: string;
    } | null;
  };
};

export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
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
              name: { kind: "Name", value: "SignInRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userSignIn" },
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
                { kind: "Field", name: { kind: "Name", value: "token" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "problem" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
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
export type SignInMutationFn = Apollo.MutationFunction<SignIn, SignInVariables>;

/**
 * __useSignIn__
 *
 * To run a mutation, you first call `useSignIn` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignIn` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signIn, { data, loading, error }] = useSignIn({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignIn(
  baseOptions?: Apollo.MutationHookOptions<SignIn, SignInVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignIn, SignInVariables>(SignInDocument, options);
}
export type SignInHookResult = ReturnType<typeof useSignIn>;
export type SignInMutationResult = Apollo.MutationResult<SignIn>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignIn,
  SignInVariables
>;
