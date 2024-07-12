import { gql } from "../__generated__";

export const GET_ALL_QUOTES = gql(`
   query getAllQuotes($title:String) {
    getAllQuotes(title: $title) {
        _id
        title
        images
        videos
        rating
        createBy {
            _id
            firstName
            lastName
            email
            role
        }
      likes{
        _id
        firstName
        lastName
        email
        role
      }
      dislikes{
          _id
        firstName
        lastName
        email
        role

      }
    }
}
`);

export const GET_COMMENT_QUOTE_REF = gql(`
query getCommentsByQuote($quoteId:String!){
  getCommentsByQuote(quoteId:$quoteId){
    _id
    content
    commentedBy{
    _id
      firstName
      lastName
    }
    replies{
      repliedBy{
        _id
        firstName
      }
      replyContent
    }
  }
}
  
`);

// export const GET_ALL_USERS = gql(` 
//   query {
//   getAllUsers{
//     _id
//     firstName
//     email
//   }
// }
  
//   `);
