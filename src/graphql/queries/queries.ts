import { gql } from "../__generated__";


export const LOGIN_USER  = gql(`
    query($email: String! $password: String!){
      login(email:$email, password:$password)
}`);
    

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

