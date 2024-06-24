/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateQuoteDto = {
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuote: Quote;
  deleteQuote: Quote;
  deleteUser: User;
  signUp: User;
  updateQuote: Quote;
  updateUser: User;
  updateUserQuotes: User;
};


export type MutationCreateQuoteArgs = {
  createQuoteDto: CreateQuoteDto;
};


export type MutationDeleteQuoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  signUpDto: SignUpDto;
};


export type MutationUpdateQuoteArgs = {
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserDto: UpdateUserDto;
};


export type MutationUpdateUserQuotesArgs = {
  quotes: Array<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  dataForAdmin: Scalars['String']['output'];
  dataForUser: Scalars['String']['output'];
  getAllQuotes: Array<Quote>;
  getAllUsers: Array<User>;
  getSingleQuoteById: Quote;
  getSingleUserById: User;
  getUserProfile: User;
  hello: Scalars['String']['output'];
  login: Scalars['String']['output'];
  securedData: Scalars['String']['output'];
};


export type QueryGetAllQuotesArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSingleQuoteByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSingleUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Quote = {
  __typename?: 'Quote';
  _id: Scalars['ID']['output'];
  createBy: User;
  title: Scalars['String']['output'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  quotes?: InputMaybe<Array<Scalars['String']['input']>>;
  role?: UserRole;
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  quotes: Array<Quote>;
  role?: Maybe<UserRole>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER'
}

export type SignUpUserMutationVariables = Exact<{
  signUpDto: SignUpDto;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, password: string, role?: UserRole | null } };

export type DeleteQuoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteQuoteMutation = { __typename?: 'Mutation', deleteQuote: { __typename?: 'Quote', _id: string, title: string } };

export type GetAllQuotesQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllQuotesQuery = { __typename?: 'Query', getAllQuotes: Array<{ __typename?: 'Quote', _id: string, title: string, createBy: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, role?: UserRole | null } }> };


export const SignUpUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signUpDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<SignUpUserMutation, SignUpUserMutationVariables>;
export const DeleteQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<DeleteQuoteMutation, DeleteQuoteMutationVariables>;
export const GetAllQuotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllQuotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllQuotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllQuotesQuery, GetAllQuotesQueryVariables>;