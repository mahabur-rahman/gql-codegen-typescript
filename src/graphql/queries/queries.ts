import { gql } from "../__generated__";


export const GET_ALL_QUOTES = gql(`
   query getAllQuotes($title:String) {
    getAllQuotes(title: $title) {
        _id
        title
        createBy {
            _id
            firstName
            lastName
            email
            role
        }
        likes{
         _id
      }
     dislikes{
        _id
      }
    }
}
`);
