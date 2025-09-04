import * as Types from "../../../../../shared/types/api-types";

import { type DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type SignUpVariables = Types.Exact<{
  input: Types.SignUpRequest;
}>;

export type SignUp = {
  __typename: "Mutation";
  userSignUp: {
    __typename: "SignUpResponse";
    token?: string | null;
    problem?: { __typename: "EmailAlreadyUsedProblem"; message: string } | null;
  };
};

export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
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
              name: { kind: "Name", value: "SignUpRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userSignUp" },
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
export type SignUpMutationFn = Apollo.MutationFunction<SignUp, SignUpVariables>;

/**
 * __useSignUp__
 *
 * To run a mutation, you first call `useSignUp` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUp` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUp, { data, loading, error }] = useSignUp({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUp(
  baseOptions?: Apollo.MutationHookOptions<SignUp, SignUpVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUp, SignUpVariables>(SignUpDocument, options);
}
export type SignUpHookResult = ReturnType<typeof useSignUp>;
export type SignUpMutationResult = Apollo.MutationResult<SignUp>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUp,
  SignUpVariables
>;
