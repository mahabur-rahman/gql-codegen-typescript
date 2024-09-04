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

export type AttachmentDto = {
  contentDisposition: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID']['output'];
  commentedBy: Array<User>;
  content: Scalars['String']['output'];
  quoteRef: Quote;
  replies: Array<Reply>;
};

export type CreateCommentDto = {
  content: Scalars['String']['input'];
  quoteRef: Scalars['String']['input'];
};

export type CreateQuoteDto = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LoginResponseType = {
  __typename?: 'LoginResponseType';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createQuote: Quote;
  deleteComment: Comment;
  deleteQuote: Quote;
  deleteUser: User;
  dislikeQuote: Quote;
  editComment: Comment;
  forgotPassword: Scalars['String']['output'];
  googleLogin: LoginResponseType;
  increaseRating: Quote;
  likeQuote: Quote;
  placeOrder: PaymentResponseDto;
  replyToComment: Comment;
  resetPassword: User;
  sendEmail: Scalars['Boolean']['output'];
  signUp: User;
  updateQuote: Quote;
  updateUser: User;
  updateUserQuotes: User;
};


export type MutationCreateCommentArgs = {
  createCommentDto: CreateCommentDto;
};


export type MutationCreateQuoteArgs = {
  createQuoteDto: CreateQuoteDto;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationDeleteQuoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationDislikeQuoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGoogleLoginArgs = {
  token: Scalars['String']['input'];
};


export type MutationIncreaseRatingArgs = {
  id: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};


export type MutationLikeQuoteArgs = {
  id: Scalars['String']['input'];
};


export type MutationPlaceOrderArgs = {
  paymentInput: PaymentDto;
};


export type MutationReplyToCommentArgs = {
  parentCommentId: Scalars['String']['input'];
  replyContent: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSendEmailArgs = {
  sendEmailInput: SendEmailDto;
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

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Payment = {
  __typename?: 'Payment';
  address: Scalars['String']['output'];
  amount?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  postCode: Scalars['String']['output'];
  productId: Scalars['String']['output'];
};

export type PaymentDto = {
  address: Scalars['String']['input'];
  amount?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  postCode: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};

export type PaymentResponseDto = {
  __typename?: 'PaymentResponseDto';
  GatewayPageURL: Scalars['String']['output'];
  paymentOutput: Payment;
};

export type Query = {
  __typename?: 'Query';
  dataForAdmin: Scalars['String']['output'];
  dataForUser: Scalars['String']['output'];
  getAllNotifications: Array<Notification>;
  getAllQuotes: Array<Quote>;
  getAllUsers: Array<User>;
  getCommentsByQuote: Array<Comment>;
  getSingleQuoteById: Quote;
  getSingleUserById: User;
  getUserProfile: User;
  hello: Scalars['String']['output'];
  login: LoginResponseType;
  securedData: Scalars['String']['output'];
};


export type QueryGetAllQuotesArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCommentsByQuoteArgs = {
  quoteId: Scalars['String']['input'];
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
  dislikes: Array<User>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  likes: Array<User>;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  videos?: Maybe<Array<Scalars['String']['output']>>;
};

export type Reply = {
  __typename?: 'Reply';
  repliedBy: User;
  replyContent: Scalars['String']['output'];
};

export type SendEmailDto = {
  attachments?: InputMaybe<Array<AttachmentDto>>;
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  quotes?: InputMaybe<Array<Scalars['String']['input']>>;
  role?: UserRole;
};

export type Subscription = {
  __typename?: 'Subscription';
  helloUpdated: Scalars['String']['output'];
  notificationCreated: Notification;
  quoteCreated: Quote;
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
  image?: Maybe<Scalars['String']['output']>;
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

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type CreateQuoteMutationVariables = Exact<{
  createQuoteDto: CreateQuoteDto;
}>;


export type CreateQuoteMutation = { __typename?: 'Mutation', createQuote: { __typename?: 'Quote', _id: string, title: string, images?: Array<string> | null, videos?: Array<string> | null } };

export type SignUpUserMutationVariables = Exact<{
  signUpDto: SignUpDto;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, password: string, role?: UserRole | null, image?: string | null } };

export type DeleteQuoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteQuoteMutation = { __typename?: 'Mutation', deleteQuote: { __typename?: 'Quote', _id: string, title: string } };

export type UpdateQuoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateQuoteMutation = { __typename?: 'Mutation', updateQuote: { __typename?: 'Quote', _id: string, title: string } };

export type LikeQuoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LikeQuoteMutation = { __typename?: 'Mutation', likeQuote: { __typename?: 'Quote', _id: string, title: string, likes: Array<{ __typename?: 'User', _id: string }> } };

export type DislikeQuoteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DislikeQuoteMutation = { __typename?: 'Mutation', dislikeQuote: { __typename?: 'Quote', _id: string, title: string, dislikes: Array<{ __typename?: 'User', _id: string }> } };

export type CreateCommentMutationVariables = Exact<{
  createCommentDto: CreateCommentDto;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', _id: string, content: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', _id: string } };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'Comment', _id: string, content: string } };

export type GoogleLoginMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'LoginResponseType', token: string, user: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, image?: string | null, role?: UserRole | null } } };

export type ReplyToCommentMutationVariables = Exact<{
  parentCommentId: Scalars['String']['input'];
  replyContent: Scalars['String']['input'];
}>;


export type ReplyToCommentMutation = { __typename?: 'Mutation', replyToComment: { __typename?: 'Comment', _id: string, content: string } };

export type IncreaseRatingMutationVariables = Exact<{
  id: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
}>;


export type IncreaseRatingMutation = { __typename?: 'Mutation', increaseRating: { __typename?: 'Quote', _id: string, title: string, rating: number } };

export type SendEmailMutationVariables = Exact<{
  sendEmailInput: SendEmailDto;
}>;


export type SendEmailMutation = { __typename?: 'Mutation', sendEmail: boolean };

export type PlaceOrderMutationVariables = Exact<{
  input: PaymentDto;
}>;


export type PlaceOrderMutation = { __typename?: 'Mutation', placeOrder: { __typename?: 'PaymentResponseDto', GatewayPageURL: string, paymentOutput: { __typename?: 'Payment', name: string, amount?: string | null, currency: string, postCode: string, address: string, phone: string, productId: string } } };

export type GetAllNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNotificationsQuery = { __typename?: 'Query', getAllNotifications: Array<{ __typename?: 'Notification', _id: string, title: string, user?: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string } | null }> };

export type GetAllQuotesQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllQuotesQuery = { __typename?: 'Query', getAllQuotes: Array<{ __typename?: 'Quote', _id: string, title: string, images?: Array<string> | null, videos?: Array<string> | null, rating: number, createBy: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, role?: UserRole | null }, likes: Array<{ __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, role?: UserRole | null }>, dislikes: Array<{ __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, role?: UserRole | null }> }> };

export type GetCommentsByQuoteQueryVariables = Exact<{
  quoteId: Scalars['String']['input'];
}>;


export type GetCommentsByQuoteQuery = { __typename?: 'Query', getCommentsByQuote: Array<{ __typename?: 'Comment', _id: string, content: string, commentedBy: Array<{ __typename?: 'User', _id: string, firstName: string, lastName: string }>, replies: Array<{ __typename?: 'Reply', replyContent: string, repliedBy: { __typename?: 'User', _id: string, firstName: string } }> }> };

export type NotificationCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationCreatedSubscription = { __typename?: 'Subscription', notificationCreated: { __typename?: 'Notification', _id: string, title: string, user?: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string } | null } };


export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const CreateQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createQuoteDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuoteDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createQuoteDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createQuoteDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"videos"}}]}}]}}]} as unknown as DocumentNode<CreateQuoteMutation, CreateQuoteMutationVariables>;
export const SignUpUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signUpDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<SignUpUserMutation, SignUpUserMutationVariables>;
export const DeleteQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<DeleteQuoteMutation, DeleteQuoteMutationVariables>;
export const UpdateQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateQuoteMutation, UpdateQuoteMutationVariables>;
export const LikeQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"likeQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<LikeQuoteMutation, LikeQuoteMutationVariables>;
export const DislikeQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"dislikeQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<DislikeQuoteMutation, DislikeQuoteMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCommentDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCommentDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCommentDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const EditCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<EditCommentMutation, EditCommentMutationVariables>;
export const GoogleLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const ReplyToCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReplyToComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentCommentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"replyContent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replyToComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentCommentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentCommentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"replyContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"replyContent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<ReplyToCommentMutation, ReplyToCommentMutationVariables>;
export const IncreaseRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IncreaseRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"increaseRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]} as unknown as DocumentNode<IncreaseRatingMutation, IncreaseRatingMutationVariables>;
export const SendEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendEmailInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendEmailDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendEmailInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendEmailInput"}}}]}]}}]} as unknown as DocumentNode<SendEmailMutation, SendEmailMutationVariables>;
export const PlaceOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"placeOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paymentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GatewayPageURL"}},{"kind":"Field","name":{"kind":"Name","value":"paymentOutput"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"postCode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]}}]} as unknown as DocumentNode<PlaceOrderMutation, PlaceOrderMutationVariables>;
export const GetAllNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>;
export const GetAllQuotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllQuotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllQuotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"videos"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllQuotesQuery, GetAllQuotesQueryVariables>;
export const GetCommentsByQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCommentsByQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quoteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCommentsByQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quoteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quoteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"commentedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repliedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyContent"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsByQuoteQuery, GetCommentsByQuoteQueryVariables>;
export const NotificationCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"notificationCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<NotificationCreatedSubscription, NotificationCreatedSubscriptionVariables>;