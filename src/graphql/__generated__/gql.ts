/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateQuote($createQuoteDto: CreateQuoteDto!) {\n    createQuote(createQuoteDto: $createQuoteDto) {\n      _id\n      title\n      images\n      videos\n    }\n  }\n": types.CreateQuoteDocument,
    "\nmutation SignUpUser($signUpDto:SignUpDto!){\n    signUp(signUpDto:$signUpDto){\n        _id\n        firstName\n        lastName\n        email\n        password\n        role\n    }\n}\n    \n": types.SignUpUserDocument,
    "      \n    mutation deleteQuote($id: String!){\n        deleteQuote(id : $id){\n            _id\n            title\n     }\n}\n    \n ": types.DeleteQuoteDocument,
    "\n     mutation updateQuote($id:String!, $title:String!){\n        updateQuote(id:$id, title:$title){\n            _id\n            title\n        }\n}\n    ": types.UpdateQuoteDocument,
    "  \n mutation likeQuote($id:String!){\n    likeQuote(id:$id){\n          _id\n         title\n         likes{\n            _id\n         }\n     }\n}\n        \n ": types.LikeQuoteDocument,
    "\nmutation dislikeQuote($id:String!){\n  dislikeQuote(id:$id){\n    _id\n    title\ndislikes{\n  _id\n}\n  }\n}       \n ": types.DislikeQuoteDocument,
    "\n mutation createComment($createCommentDto: CreateCommentDto!){\n    createComment(createCommentDto: $createCommentDto){\n            _id\n            content\n        }\n}": types.CreateCommentDocument,
    "\n mutation deleteComment($commentId:String!){\n    deleteComment(commentId:$commentId){\n        _id\n    }\n}": types.DeleteCommentDocument,
    "\nmutation editComment($commentId:String!, $content:String!){\n    editComment(commentId:$commentId, content:$content){\n        _id\n        content\n    }\n }\n    \n": types.EditCommentDocument,
    "\n  mutation GoogleLogin($token: String!) {\n    googleLogin(token: $token) {\n      token\n      user {\n        _id\n        firstName\n        lastName\n        email\n        image\n        role\n      }\n    }\n  }\n": types.GoogleLoginDocument,
    "\n  mutation ReplyToComment($parentCommentId: String!, $replyContent: String!) {\n  replyToComment(parentCommentId: $parentCommentId, replyContent: $replyContent) {\n    _id\n    content\n  }\n}\n\n": types.ReplyToCommentDocument,
    "\n   query getAllQuotes($title:String) {\n    getAllQuotes(title: $title) {\n        _id\n        title\n        images\n        videos\n        rating\n        createBy {\n            _id\n            firstName\n            lastName\n            email\n            role\n        }\n      likes{\n        _id\n        firstName\n        lastName\n        email\n        role\n      }\n      dislikes{\n          _id\n        firstName\n        lastName\n        email\n        role\n\n      }\n    }\n}\n": types.GetAllQuotesDocument,
    "\nquery getCommentsByQuote($quoteId:String!){\n  getCommentsByQuote(quoteId:$quoteId){\n    _id\n    content\n    commentedBy{\n    _id\n      firstName\n      lastName\n    }\n    replies{\n      repliedBy{\n        _id\n        firstName\n      }\n      replyContent\n    }\n  }\n}\n  \n": types.GetCommentsByQuoteDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateQuote($createQuoteDto: CreateQuoteDto!) {\n    createQuote(createQuoteDto: $createQuoteDto) {\n      _id\n      title\n      images\n      videos\n    }\n  }\n"): (typeof documents)["\n  mutation CreateQuote($createQuoteDto: CreateQuoteDto!) {\n    createQuote(createQuoteDto: $createQuoteDto) {\n      _id\n      title\n      images\n      videos\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SignUpUser($signUpDto:SignUpDto!){\n    signUp(signUpDto:$signUpDto){\n        _id\n        firstName\n        lastName\n        email\n        password\n        role\n    }\n}\n    \n"): (typeof documents)["\nmutation SignUpUser($signUpDto:SignUpDto!){\n    signUp(signUpDto:$signUpDto){\n        _id\n        firstName\n        lastName\n        email\n        password\n        role\n    }\n}\n    \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "      \n    mutation deleteQuote($id: String!){\n        deleteQuote(id : $id){\n            _id\n            title\n     }\n}\n    \n "): (typeof documents)["      \n    mutation deleteQuote($id: String!){\n        deleteQuote(id : $id){\n            _id\n            title\n     }\n}\n    \n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n     mutation updateQuote($id:String!, $title:String!){\n        updateQuote(id:$id, title:$title){\n            _id\n            title\n        }\n}\n    "): (typeof documents)["\n     mutation updateQuote($id:String!, $title:String!){\n        updateQuote(id:$id, title:$title){\n            _id\n            title\n        }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "  \n mutation likeQuote($id:String!){\n    likeQuote(id:$id){\n          _id\n         title\n         likes{\n            _id\n         }\n     }\n}\n        \n "): (typeof documents)["  \n mutation likeQuote($id:String!){\n    likeQuote(id:$id){\n          _id\n         title\n         likes{\n            _id\n         }\n     }\n}\n        \n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation dislikeQuote($id:String!){\n  dislikeQuote(id:$id){\n    _id\n    title\ndislikes{\n  _id\n}\n  }\n}       \n "): (typeof documents)["\nmutation dislikeQuote($id:String!){\n  dislikeQuote(id:$id){\n    _id\n    title\ndislikes{\n  _id\n}\n  }\n}       \n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation createComment($createCommentDto: CreateCommentDto!){\n    createComment(createCommentDto: $createCommentDto){\n            _id\n            content\n        }\n}"): (typeof documents)["\n mutation createComment($createCommentDto: CreateCommentDto!){\n    createComment(createCommentDto: $createCommentDto){\n            _id\n            content\n        }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n mutation deleteComment($commentId:String!){\n    deleteComment(commentId:$commentId){\n        _id\n    }\n}"): (typeof documents)["\n mutation deleteComment($commentId:String!){\n    deleteComment(commentId:$commentId){\n        _id\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation editComment($commentId:String!, $content:String!){\n    editComment(commentId:$commentId, content:$content){\n        _id\n        content\n    }\n }\n    \n"): (typeof documents)["\nmutation editComment($commentId:String!, $content:String!){\n    editComment(commentId:$commentId, content:$content){\n        _id\n        content\n    }\n }\n    \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation GoogleLogin($token: String!) {\n    googleLogin(token: $token) {\n      token\n      user {\n        _id\n        firstName\n        lastName\n        email\n        image\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation GoogleLogin($token: String!) {\n    googleLogin(token: $token) {\n      token\n      user {\n        _id\n        firstName\n        lastName\n        email\n        image\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ReplyToComment($parentCommentId: String!, $replyContent: String!) {\n  replyToComment(parentCommentId: $parentCommentId, replyContent: $replyContent) {\n    _id\n    content\n  }\n}\n\n"): (typeof documents)["\n  mutation ReplyToComment($parentCommentId: String!, $replyContent: String!) {\n  replyToComment(parentCommentId: $parentCommentId, replyContent: $replyContent) {\n    _id\n    content\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   query getAllQuotes($title:String) {\n    getAllQuotes(title: $title) {\n        _id\n        title\n        images\n        videos\n        rating\n        createBy {\n            _id\n            firstName\n            lastName\n            email\n            role\n        }\n      likes{\n        _id\n        firstName\n        lastName\n        email\n        role\n      }\n      dislikes{\n          _id\n        firstName\n        lastName\n        email\n        role\n\n      }\n    }\n}\n"): (typeof documents)["\n   query getAllQuotes($title:String) {\n    getAllQuotes(title: $title) {\n        _id\n        title\n        images\n        videos\n        rating\n        createBy {\n            _id\n            firstName\n            lastName\n            email\n            role\n        }\n      likes{\n        _id\n        firstName\n        lastName\n        email\n        role\n      }\n      dislikes{\n          _id\n        firstName\n        lastName\n        email\n        role\n\n      }\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getCommentsByQuote($quoteId:String!){\n  getCommentsByQuote(quoteId:$quoteId){\n    _id\n    content\n    commentedBy{\n    _id\n      firstName\n      lastName\n    }\n    replies{\n      repliedBy{\n        _id\n        firstName\n      }\n      replyContent\n    }\n  }\n}\n  \n"): (typeof documents)["\nquery getCommentsByQuote($quoteId:String!){\n  getCommentsByQuote(quoteId:$quoteId){\n    _id\n    content\n    commentedBy{\n    _id\n      firstName\n      lastName\n    }\n    replies{\n      repliedBy{\n        _id\n        firstName\n      }\n      replyContent\n    }\n  }\n}\n  \n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;