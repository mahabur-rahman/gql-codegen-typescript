import { gql } from "../__generated__";

export const GET_ALL_QUOTES = gql(`
  query getAllQuotes {
    getAllQuotes {
        _id
        title
        createBy {
            _id
            firstName
            lastName
            email
            role
        }
    }
}
`);