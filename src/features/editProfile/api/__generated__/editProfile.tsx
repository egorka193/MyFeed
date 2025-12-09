/* eslint-disable react-refresh/only-export-components */
import type * as Types from "../../../../shared/types/api-types";

import type { DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type EditProfileVariables = Types.Exact<{
  input: Types.EditProfileRequest;
}>;

export type EditProfile = {
  __typename: "Mutation";
  userEditProfile: {
    __typename: "EditProfileResponse";
    user?: {
      __typename: "UserModel";
      id: string;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
      avatarUrl?: string | null;
      birthDate?: string | null;
      country?: string | null;
      gender?: string | null;
      phone?: string | null;
    } | null;
  };
};

export const EditProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EditProfile" },
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
              name: { kind: "Name", value: "EditProfileRequest" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userEditProfile" },
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
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
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
export type EditProfileMutationFn = Apollo.MutationFunction<
  EditProfile,
  EditProfileVariables
>;

/**
 * __useEditProfile__
 *
 * To run a mutation, you first call `useEditProfile` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfile` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfile, { data, loading, error }] = useEditProfile({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditProfile(
  baseOptions?: Apollo.MutationHookOptions<EditProfile, EditProfileVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditProfile, EditProfileVariables>(
    EditProfileDocument,
    options,
  );
}
export type EditProfileHookResult = ReturnType<typeof useEditProfile>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfile>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<
  EditProfile,
  EditProfileVariables
>;
